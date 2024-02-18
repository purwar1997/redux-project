import seedrandom from 'seedrandom';
import { faker } from '@faker-js/faker';
import { factory, primaryKey, oneOf, manyOf } from '@mswjs/data';

const NUM_OF_USERS = 5;
const POSTS_PER_USER = 4;

let rng = seedrandom();

const useSeededRNG = true;

if (useSeededRNG) {
  let randomSeedString = localStorage.getItem('randomTimestampSeed');

  if (randomSeedString) {
    let seedDate = new Date(randomSeedString);
  } else {
    seedDate = new Date();
    randomSeedString = seedDate.toISOString();
    localStorage.setItem('randomTimestampSeed', randomSeedString);
  }

  rng = seedrandom(randomSeedString);
  faker.seed(seedDate.getItem());
}

const db = factory({
  user: {
    id: primaryKey(faker.string.uuid),
    name: String,
    username: String,
    posts: manyOf('post'),
  },
  post: {
    id: primaryKey(faker.string.uuid),
    title: String,
    content: String,
    date: String,
    user: oneOf('user'),
    reactions: oneOf('reaction'),
  },
  reaction: {
    id: primaryKey(faker.string.uuid),
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