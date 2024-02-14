import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { compareDesc } from 'date-fns';
import PostExerpt from '../components/PostExcerpt';

const PostsList = () => {
  const posts = useSelector(state => state.posts);

  const orderedPosts = useMemo(
    () => posts.toSorted((postA, postB) => compareDesc(postA.date, postB.date)),
    [posts]
  );

  return (
    <section>
      <h2 className='text-2xl'>All posts</h2>

      <div className='mt-6 space-y-3'>
        {orderedPosts.map(post => (
          <PostExerpt key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default PostsList;
