import seedrandom from 'seedrandom';
import { faker } from '@faker-js/faker';
import { factory, primaryKey, oneOf, manyOf } from '@mswjs/data';

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
    id: primaryKey(faker.datatype.uuid),
    name: String,
    username: String,
    posts: manyOf('post'),
  },
  post: {
    id: primaryKey(faker.datatype.uuid),
    title: String,
    content: String,
    date: String,
    user: oneOf('user'),
    reactions: oneOf('reaction'),
  },
  reaction: {
    id: primaryKey(faker.datatype.uuid),
    thumbsUp: Number,
    wow: Number,
    heart: Number,
    rocket: Number,
    coffee: Number,
    post: oneOf('post'),
  },
});