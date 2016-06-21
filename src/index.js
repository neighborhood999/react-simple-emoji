/* eslint arrow-body-style: 0, react/prop-types: 0, no-return-assign: 0 */
import React, { Component, PropTypes } from 'react';
import getEmoji from 'get-emoji';
import { emojis, categoryOfEmoji } from './emoji';
import SelectorBox from './selectorBox';
import EmojiButton from './emojiButton';
import EmojiImage from './emojiImage';
import EmojiButtonImage from './emojiButtonImage';
import { defaultSelectorStyle, defaultEmojiSearchInputStyle } from './emojiStyle';

export default class EmojiPicker extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    selector: PropTypes.func.isRequired,
    handleEmoji: PropTypes.func.isRequired,
    selectorStyle: PropTypes.object,
    emojiSearchInputStyle: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = { text: '', filterEmoji: false, filterEmojiResult: '' };
    this.renderEmojiCategory = this.renderEmojiCategory.bind(this);
    this.renderAllEmoji = this.renderAllEmoji.bind(this);
    this.renderFilterEmoji = this.renderFilterEmoji.bind(this);
    this.filterEmoji = this.filterEmoji.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show ||
      nextState.filterEmojiResult !== this.state.filterEmojiResult;
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
                role="presentation"
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
    let { emojiSearchInputStyle, selectorStyle } = this.props;
    const filterEmoji = this.state.filterEmoji;
    const filterEmojiResult = this.state.filterEmojiResult;

    if (emojiSearchInputStyle === undefined) {
      emojiSearchInputStyle = defaultEmojiSearchInputStyle;
    }
    if (selectorStyle === undefined) {
      selectorStyle = defaultSelectorStyle;
    }

    return (
      <span>
        <EmojiButton src={EmojiButtonImage} selector={selector} />
        <SelectorBox show={show} style={selectorStyle}>
          <input
            ref={(ref) => this.myTextInput = ref}
            style={emojiSearchInputStyle}
            type="text"
            placeholder="Search"
            onChange={this.filterEmoji}
          />
          {filterEmoji ?
            this.renderFilterEmoji(filterEmojiResult, handleEmoji) :
            this.renderAllEmoji(categoryOfEmoji, handleEmoji)
          }
        </SelectorBox>
      </span>
    );
  }
}
