import React, { PropTypes } from 'react';

const EmojiButton = ({ src, selector }) => (
  <img id="emojiButton" role="presentation" src={src} onClick={() => selector()} />
);

EmojiButton.propTypes = {
  src: PropTypes.string.isRequired,
  selector: PropTypes.func.isRequired,
};

export default EmojiButton;
