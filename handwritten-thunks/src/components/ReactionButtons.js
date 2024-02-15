import { useDispatch } from 'react-redux';
import { addReaction } from '../app/slices/postsSlice';

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const handleClick = (event, reaction) => {
    event.preventDefault();
    dispatch(addReaction({ postId: post.id, reaction }));
  };

  const reactionEmojis = {
    thumbsUp: '👍',
    wow: '😲',
    heart: '❤',
    rocket: '🚀',
    coffee: '☕',
  };

  return (
    <div className='space-x-3'>
      {Object.entries(reactionEmojis).map(([emojiName, emojiType]) => (
        <button
          className='border border-gray-400 px-2.5 py-0.5 rounded space-x-2'
          key={emojiName}
          onClick={event => handleClick(event, emojiName)}
        >
          <span>{emojiType}</span>
          <span>{post.reactions[emojiName]}</span>
        </button>
      ))}
    </div>
  );
};

export default ReactionButtons;
