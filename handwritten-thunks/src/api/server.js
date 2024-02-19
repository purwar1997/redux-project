import seedrandom from 'seedrandom';
import { faker } from '@faker-js/faker';
import { factory, primaryKey, oneOf, manyOf } from '@mswjs/data';
import { http, delay, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { nanoid } from '@reduxjs/toolkit';
import { parseISO, sub } from 'date-fns'; 

const NUM_OF_USERS = 5;
const POSTS_PER_USER = 4;
const RESPONSE_DELAY_MS = 2000;

let rng = seedrandom();

const useSeededRNG = true;

if (useSeededRNG) {
  let randomSeedString = localStorage.getItem('randomTimestampSeed');
  let seedDate;

  if (randomSeedString) {
    seedDate = new Date(randomSeedString);
  } else {
    seedDate = new Date();
    randomSeedString = seedDate.toISOString();
    localStorage.setItem('randomTimestampSeed', randomSeedString);
  }

  rng = seedrandom(randomSeedString);
  faker.seed(seedDate.getTime());
}

const db = factory({
  user: {
    id: primaryKey(nanoid),
    name: String,
    username: String,
    posts: manyOf('post'),
  },
  post: {
    id: primaryKey(nanoid),
    title: String,
    content: String,
    date: String,
    user: oneOf('user'),
    reactions: oneOf('reaction'),
  },
  reaction: {
    id: primaryKey(nanoid),
    thumbsUp: Number,
    wow: Number,
    heart: Number,
    rocket: Number,
    coffee: Number,
    post: oneOf('post'),
  },
});

const createUserData = () => {
  return {
    name: faker.person.fullName(),
    username: faker.internet.userName(),
  };
};

const createPostData = user => {
  return {
    title: faker.lorem.words({ min: 3, max: 5 }),
    content: faker.lorem.paragraph({ min: 5, max: 8 }),
    date: faker.date.recent({ days: 30 }),
    user,
    reactions: db.reaction.create(),
  };
};

for (let i = 0; i < NUM_OF_USERS; i++) {
  const user = db.user.create(createUserData());

  for (let j = 0; j < POSTS_PER_USER; j++) {
    const newPost = createPostData(user);
    db.post.create(newPost);
  }
}

const serializePost = post => ({
  ...post,
  user: post.user.id,
});

const handlers = [
  http.get('/api/posts', async () => {
    const posts = db.post.getAll().map(serializePost);

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(posts, {
      status: 200,
      statusText: 'Posts successfully fetched',
    });
  }),

  http.post('/api/posts', async ({ request }) => {
    const data = await request.json();

    data.date = new Date().toISOString();
    data.user = db.user.findFirst({ where: { id: { equals: data.user } } });
    data.reactions = db.reaction.create();

    const newPost = db.post.create(data);

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(serializePost(newPost), {
      status: 201,
      statusText: 'Post successfully created',
    });
  }),

  http.get('/api/posts/:postId', async ({ params }) => {
    const { postId } = params;

    const post = db.post.findFirst({ where: { id: { equals: postId } } });

    if (!post) {
      throw new HttpResponse(null, {
        status: 404,
        statusText: 'Post not found',
      });
    }

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(post, {
      status: 200,
      statusText: 'Post successfully fetched',
    });
  }),

  http.put('/api/posts/:postId', async ({ request, params }) => {
    const data = await request.json();

    const { postId } = params;

    const post = db.post.findFirst({ where: { id: { equals: postId } } });

    if (!post) {
      throw new HttpResponse(null, {
        status: 404,
        statusText: 'Post not found',
      });
    }

    data.date = new Date().toISOString();
    data.user = db.user.findFirst({ where: { id: { equals: data.user } } });

    const updatedPost = db.post.update({ where: { id: { equals: postId } }, data });

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(updatedPost, {
      status: 200,
      statusText: 'Post successfully updated',
    });
  }),

  http.delete('/api/posts/:postId', async ({ params }) => {
    const { postId } = params;

    const post = db.post.findFirst({ where: { id: { equals: postId } } });

    if (!post) {
      throw new HttpResponse(null, {
        status: 404,
        statusText: 'Post not found',
      });
    }

    const deletedPost = db.post.delete({ where: { id: { equals: postId } } });

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(deletedPost, {
      status: 200,
      statusText: 'Post successfully deleted',
    });
  }),

  http.put('/api/posts/:postId', async ({ request, params }) => {
    const { reaction } = await request.json();
    const { postId } = params;

    const post = db.post.findFirst({ where: { id: { equals: postId } } });

    if (!post) {
      throw new HttpResponse(null, {
        status: 404,
        statusText: 'Post not found',
      });
    }

    const updatedPost = db.post.update({
      where: {
        id: { equals: postId },
      },
      data: {
        reactions: (prevReactions, post) =>
          db.reaction.update({
            where: {
              id: { equals: post.reactions.id },
            },
            data: {
              [reaction]: prevReactions[reaction] + 1,
            },
          }),
      },
    });

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(updatedPost, {
      status: 200,
      statusText: 'Reaction successfully added to post',
    });
  }),

  http.get('/api/users', async () => {
    const users = db.user.getAll();

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(users, {
      status: 200,
      statusText: 'Users successfully fetched',
    });
  }),

  http.get('/api/notifications', async ({ request }) => {
    const url = new URL(request.url);
    const since = url.searchParams.get('since');

    const notifications = generateRandomNotifications(since);

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(notifications, {
      status: 200,
      statusText: 'Notifications successfully fetched',
    });
  }),
];

const notificationTemplates = [
  'liked your post',
  'commented on your post',
  'poked you',
  'sent you a gift',
  "is glad we're friends",
  'says hi!',
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(rng() * (max - min + 1) + min);
}

function getRandomValueFromArray(array) {
  const randomIndex = getRandomInt(0, array.length - 1);
  return array[randomIndex];
}

function generateRandomNotifications (since)  {
  const now = new Date();
  let pastDate;

  if (since) {
     pastDate = parseISO(since);
  } else {
    pastDate = sub(now, {minutes: 60});
  }

  const numOfNotifications = getRandomInt(1, 5);

  const notifications = [...new Array(numOfNotifications)].map(() => {
    return {
      id: nanoid(),
      message: getRandomValueFromArray(notificationTemplates),
      user: getRandomValueFromArray(db.user.getAll()).id,
      date: faker.date.between({ from: pastDate, to: now }).toISOString(),
      isRead: false,
    };
  });

  return notifications;
};

export const worker = setupWorker(...handlers);