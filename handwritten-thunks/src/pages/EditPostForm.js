import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updatePost } from '../app/slices/postsSlice';

const EditPostForm = () => {
  const { postId } = useParams();

  const post = useSelector(state => state.posts.find(post => post.id === postId));
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postTitle, setPostTitle] = useState(post?.title);
  const [postContent, setPostContent] = useState(post?.content);
  const [postAuthor, setPostAuthor] = useState(post?.user);

  const canSave = [postTitle, postContent, postAuthor].every(Boolean);

  const handleClick = () => {
    dispatch(updatePost({ postId, postTitle, postContent, postAuthor }));
    navigate(`/posts/${postId}`);
  };

  if (!post) {
    return <h2 className='text-2xl'>Post not found!</h2>;
  }

  return (
    <section>
      <h2 className='text-2xl'>Edit post</h2>

      <form className='mt-8 space-y-4'>
        <div className='form-control'>
          <label htmlFor='title'>Post title</label>

          <input
            type='text'
            id='title'
            value={postTitle}
            onChange={e => setPostTitle(e.target.value)}
          />
        </div>

        <div className='form-control'>
          <label htmlFor='content'>Post content</label>

          <textarea
            id='content'
            value={postContent}
            onChange={e => setPostContent(e.target.value)}
          />
        </div>

        <div className='form-control'>
          <label htmlFor='author'>Post author</label>

          <select id='author' value={postAuthor} onChange={e => setPostAuthor(e.target.value)}>
            <option value='' disabled hidden>
              -- Please select an option --
            </option>

            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className='ml-32 btn-action'
          type='button'
          disabled={!canSave}
          onClick={handleClick}
        >
          Save
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
