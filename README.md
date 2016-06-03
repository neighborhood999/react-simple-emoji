# react-simple-emoji

A simple emoji picker component. :wink:

## How To Use

```sh
$ npm install react-simple-emoji
```

If you have main component, and you want to add emoji picker:

```js
import React, { Component } from 'react';
import EmojiPicker from 'react-simple-emoji';

export default class App extends Component {
  constructor() {
    super();
    this.state = { text: '', showSelector: false };
    this.handleEmoji = this.handleEmoji.bind(this);
    this.selectEmoji = this.selectEmoji.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  selectEmoji() {
    this.setState({ showSelector: !this.state.showSelector });
  }

  handleInputChange(e) {
    const text = e.target.value;
    this.setState({ text });
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) return this.setState({ text: '' });
  }

  handleEmoji(emojiText) {
    const inpuText = this.state.text;
    this.setState({ text: `${inpuText}:${emojiText}:` });
  }

  render() {
    return (
      <div>
        <input
          value={this.state.text}
          type="text"
          onChange={(e) => this.handleInputChange(e)}
          onKeyDown={(e) => this.handleKeyDown(e)}
        />
        <EmojiPicker
          show={this.state.showSelector}
          selector={() => this.selectEmoji()}
          handleEmoji={(e) => this.handleEmoji(e)}
        />
      </div>
    );
  }
}
```

## API

#### props

##### show

_Required Type:_ boolean  

Showing emoji picker state.

##### selector

_Required Type:_ function  

Change emoji picker showing state.

##### handleEmoji

_Required Type:_ function  

Handle input text and emoji.

## Test

_TODO_

## Lint

```sh
$ npm run lint
```

## LICENSE

MIT © [Peng Jie](https://github.com/neighborhood999)
