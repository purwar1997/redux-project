import { createSlice } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'Learning javascript',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam esse magnam ut sunt iste dicta distinctio ipsa iure nostrum nulla facilis autem dolores, quasi soluta numquam eius fugit molestias hic. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, ab distinctio velit praesentium omnis vero, unde, neque porro quae ipsum dolores quasi iusto tempore obcaecati magni necessitatibus illum ipsam. Eius.',
    user: '1',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: '2',
    title: 'Learning rust',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam esse magnam ut sunt iste dicta distinctio ipsa iure nostrum nulla facilis autem dolores, quasi soluta numquam eius fugit molestias hic. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, ab distinctio velit praesentium omnis vero, unde, neque porro quae ipsum dolores quasi iusto tempore obcaecati magni necessitatibus illum ipsam. Eius.',
    user: '2',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: '3',
    title: 'Learning redux',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam esse magnam ut sunt iste dicta distinctio ipsa iure nostrum nulla facilis autem dolores, quasi soluta numquam eius fugit molestias hic. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, ab distinctio velit praesentium omnis vero, unde, neque porro quae ipsum dolores quasi iusto tempore obcaecati magni necessitatibus illum ipsam. Eius.',
    user: '3',
    date: sub(new Date(), { minutes: 15 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: '4',
    title: 'Zustand for state management',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam esse magnam ut sunt iste dicta distinctio ipsa iure nostrum nulla facilis autem dolores, quasi soluta numquam eius fugit molestias hic. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, ab distinctio velit praesentium omnis vero, unde, neque porro quae ipsum dolores quasi iusto tempore obcaecati magni necessitatibus illum ipsam. Eius.',
    user: '1',
    date: sub(new Date(), { minutes: 20 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: '5',
    title: 'Tanstack Query',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam esse magnam ut sunt iste dicta distinctio ipsa iure nostrum nulla facilis autem dolores, quasi soluta numquam eius fugit molestias hic. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, ab distinctio velit praesentium omnis vero, unde, neque porro quae ipsum dolores quasi iusto tempore obcaecati magni necessitatibus illum ipsam. Eius.',
    user: '3',
    date: sub(new Date(), { minutes: 25 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: '6',
    title: 'Web Accesslibility',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam esse magnam ut sunt iste dicta distinctio ipsa iure nostrum nulla facilis autem dolores, quasi soluta numquam eius fugit molestias hic. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, ab distinctio velit praesentium omnis vero, unde, neque porro quae ipsum dolores quasi iusto tempore obcaecati magni necessitatibus illum ipsam. Eius.',
    user: '4',
    date: sub(new Date(), { minutes: 30 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});

export default postsSlice.reducer;
