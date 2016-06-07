/* eslint arrow-body-style: 0, react/prop-types: 0, no-return-assign: 0 */
import React, { Component, PropTypes } from 'react';
import getEmoji from 'get-emoji';
import { emojis, categoryOfEmoji } from './emoji';
import emojiButtonImage from './emojiButtonImage';

const selectorStyle = {
  boxShadow: '0 10px 10px 0 rgba(0, 0, 0, 0.20)',
  backgroundColor: '#fff',
  width: '250px',
  height: '220px',
  position: 'relative',
  left: '10px',
  top: '0px',
  overflow: 'scroll',
};

const EmojiImage = ({ name, handleEmoji }) => (
  <img alt={name} src={getEmoji(name)} onClick={() => handleEmoji(name)} />
);

export default class EmojiPicker extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    selector: PropTypes.func.isRequired,
    handleEmoji: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = { text: '', filterEmoji: false, filterEmojiResult: '' };
    this.renderEmojiCategory = this.renderEmojiCategory.bind(this);
    this.renderAllEmoji = this.renderAllEmoji.bind(this);
    this.renderFilterEmoji = this.renderFilterEmoji.bind(this);
    this.filterEmoji = this.filterEmoji.bind(this);
  }

  filterEmoji(e) {
    const emojiName = e.target.value;
    const filterEmojiResult = emojis.filter(name => name.indexOf(emojiName) !== -1);

    return emojiName.length === 0 ?
      this.setState({ filterEmoji: false }) :
      this.setState({ filterEmoji: true, filterEmojiResult });
  }

  renderEmojiCategory(category, handleEmoji) {
    return category.map((emoji) => {
      return (
        <span key={emoji}>
          <EmojiImage name={emoji} handleEmoji={handleEmoji} />
        </span>
      );
    });
  }

  renderAllEmoji(categoryEmojis, handleEmoji) {
    return (
      Object.keys(categoryEmojis).map((category, i) => {
        return (
          <div key={category}>
            <p>{category}</p>
            {this.renderEmojiCategory(
              categoryEmojis[Object.keys(categoryEmojis)[i]],
              handleEmoji
            )}
          </div>
        );
      })
    );
  }

  renderFilterEmoji(emoji, handleEmoji) {
    return emoji.map((e) => {
      return (
        <span key={e}>
          <img
            alt={emoji}
            src={getEmoji(e)}
            onClick={() => {
              handleEmoji(e);
              this.setState({ filterEmoji: false });
              this.myTextInput.value = '';
            }}
          />
        </span>
      );
    });
  }

  render() {
    const { show, selector, handleEmoji } = this.props;
    const filterEmoji = this.state.filterEmoji;
    const filterEmojiResult = this.state.filterEmojiResult;

    return (
      <span>
        <img role="presentation" src={emojiButtonImage} onClick={() => selector()} />
        <div style={show ? selectorStyle : { display: 'none' }}>
          <input
            ref={(ref) => this.myTextInput = ref}
            style={{
              margin: '5px',
              width: '90%',
              borderRadius: '5px',
              border: '1px solid #E8E8E8',
            }}
            type="text"
            placeholder="Search"
            onChange={(e) => this.filterEmoji(e)}
          />
          {filterEmoji ?
            this.renderFilterEmoji(filterEmojiResult, handleEmoji) :
            this.renderAllEmoji(categoryOfEmoji, handleEmoji)
          }
        </div>
      </span>
    );
  }
}
