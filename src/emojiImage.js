import React, { PropTypes } from 'react';
import getEmoji from 'get-emoji';

const EmojiImage = ({ name, handleEmoji }) => (
  <img alt={name} src={getEmoji(name)} onClick={() => handleEmoji(name)} />
);

EmojiImage.propTypes = {
  name: PropTypes.string.isRequired,
  handleEmoji: PropTypes.func.isRequired,
};

export default EmojiImage;
