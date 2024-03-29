import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../app/slices/postsSlice';
import PostAuthor from '../components/PostAuthor';
import TimeAgo from '../components/TimeAgo';
import ReactionButtons from '../components/ReactionButtons';

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector(state => state.posts.find(post => post.id === postId));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(deletePost(postId));
    navigate('/', { replace: true });
  };

  if (!post) {
    return <h2 className='text-2xl'>Post not found!</h2>;
  }

  return (
    <section>
      <article className='border border-gray-500 rounded-xl p-5 space-y-3'>
        <h2 className='text-2xl'>{post.title}</h2>
        <p>{post.content}</p>
        <p>
          - <PostAuthor authorId={post.user} />, <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>

      <div className='mt-4 space-x-3'>
        <button className='btn-action' onClick={() => navigate('edit')}>
          Edit
        </button>

        <button className='btn-action' onClick={handleClick}>
          Delete
        </button>
      </div>
    </section>
  );
};

export default SinglePostPage;
