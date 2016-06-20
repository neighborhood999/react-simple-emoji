/* eslint arrow-body-style: 0, react/prop-types: 0, no-return-assign: 0 */
import React, { Component, PropTypes } from 'react';
import getEmoji from 'get-emoji';
import { emojis, categoryOfEmoji } from './emoji';
import emojiButtonImage from './emojiButtonImage';
import EmojiButton from './emojiButton';
import EmojiImage from './emojiImage';
import { defaultSelectorStyle, defaultEmojiInputSearchStyle } from './emojiStyle';

export default class EmojiPicker extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    selector: PropTypes.func.isRequired,
    handleEmoji: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
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
      <div id="allEmoji">
        {Object.keys(categoryEmojis).map((category, i) => {
          return (
            <div key={category}>
              <p>{category}</p>
              {this.renderEmojiCategory(
                categoryEmojis[Object.keys(categoryEmojis)[i]],
                handleEmoji
              )}
            </div>
          );
        })}
      </div>
    );
  }

  renderFilterEmoji(emoji, handleEmoji) {
    return (
      <div id="filterEmoji">
        {emoji.map((e) => {
          return (
            <span key={e}>
              <img
                id={e}
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
        })}
      </div>
    );
  }

  render() {
    const { show, selector, handleEmoji } = this.props;
    let { emojiInputSearchStyle, selectorStyle } = this.props;
    const filterEmoji = this.state.filterEmoji;
    const filterEmojiResult = this.state.filterEmojiResult;

    if (emojiInputSearchStyle === undefined) {
      emojiInputSearchStyle = defaultEmojiInputSearchStyle;
    }
    if (selectorStyle === undefined) {
      selectorStyle = defaultSelectorStyle;
    }

    return (
      <span>
        <EmojiButton src={emojiButtonImage} selector={selector} />
        <div id="showing" style={show ? selectorStyle : { display: 'none' }}>
          <input
            ref={(ref) => this.myTextInput = ref}
            style={emojiInputSearchStyle}
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
