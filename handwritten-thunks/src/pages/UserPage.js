import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector(state => state.users.find(user => user.id === userId));

  const getPostsByUser = createSelector(
    [state => state.posts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.user === userId)
  );

  const postsByUser = useSelector(state => getPostsByUser(state, userId));

  return (
    <section>
      <h2 className='text-2xl'>{user.name}</h2>

      <ul className='mt-6 space-y-3'>
        {postsByUser.map(post => (
          <li className='text-purple-600' key={post.id}>
            <Link className='underline-offset-2 hover:underline' to={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserPage;
