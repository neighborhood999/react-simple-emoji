# react-simple-emoji

[![Build Status](https://travis-ci.org/neighborhood999/react-simple-emoji.svg?branch=test)](https://travis-ci.org/neighborhood999/react-simple-emoji)
[![Coverage Status](https://coveralls.io/repos/github/neighborhood999/react-simple-emoji/badge.svg?branch=master)](https://coveralls.io/github/neighborhood999/react-simple-emoji?branch=master)
[![Dependency Status](https://david-dm.org/neighborhood999/react-simple-emoji.svg)](https://david-dm.org/neighborhood999/react-simple-emoji)

A simple emoji picker component. :wink:

## Install

```sh
$ npm install react-simple-emoji
```

## How to Use

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
		this.handleKeyDown = this.handleKeyDown.bind(this);
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
					onChange={this.handleInputChange}
					onKeyDown={this.handleKeyDown}
				/>
				<EmojiPicker
					show={this.state.showSelector}
					selector={this.selectEmoji}
					handleEmoji={this.handleEmoji}
				/>
      </div>
    );
  }
}
```

## API

#### props

##### show

_Required Type:_ `boolean`  

Showing emoji picker state.

##### selector

_Required Type:_ `function`  

Change emoji picker showing state.

##### handleEmoji

_Required Type:_ `function`  

Handle input text and emoji.

##### emojiSearchInputStyle

_Type:_ `object`

Custom your emoji search input style.

##### selectorStyle

_Type:_ `object`

Custom your selector box style.

## Test

```sh
$ npm test
```

## Lint

```sh
$ npm run lint
```

## LICENSE

![MIT](https://camo2.githubusercontent.com/890acbdcb87868b382af9a4b1fac507b9659d9bf/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d626c75652e737667) © [Peng Jie](https://github.com/neighborhood999)
