import { useSelector } from 'react-redux';

const PostAuthor = ({ authorId }) => {
  const user = useSelector(state => state.users.find(user => user.id === authorId));

  const author = user ? user.name : 'Unknown author';

  return <span>{author}</span>;
};

export default PostAuthor;
