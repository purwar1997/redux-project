import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditPostForm = () => {
  const { postId } = useParams();

  const post = useSelector(state => state.posts.find(post => post.id === postId));
  const users = useSelector(state => state.users);

  const [postTitle, setPostTitle] = useState(post?.title);
  const [postContent, setPostContent] = useState(post?.content);
  const [postAuthor, setPostAuthor] = useState(post?.user);

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

        <button className='ml-32 btn-action' type='button'>
          Save
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
