const ReactionButtons = ({ post }) => {
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
        <button className='border border-gray-400 px-2.5 py-0.5 rounded space-x-2' key={emojiName}>
          <span>{emojiType}</span>
          <span>{post.reactions[emojiName]}</span>
        </button>
      ))}
    </div>
  );
};

export default ReactionButtons;
