import test from 'ava';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import EmojiPicker from '../src/index';
import { defaultSelectorStyle, defaultEmojiSearchInputStyle } from '../src/emojiStyle';

test('EmojiPicker should be render', t => {
  const props = {
    show: false,
    selector: spy(),
    handleEmoji: spy(),
  };
  const emojiPicker = shallow(<EmojiPicker {...props} />);

  t.is(emojiPicker.find('EmojiButton').length, 1);
  t.is(emojiPicker.find('input').length, 1);
  t.is(emojiPicker.find('#allEmoji').length, 1);

  emojiPicker.setProps({ show: true });
  t.is(emojiPicker.find('SelectorBox').length, 1);
});

test('EmojiPicker initial state', t => {
  const props = {
    show: false,
    selector: spy(),
    handleEmoji: spy(),
  };
  const emojiPicker = shallow(<EmojiPicker {...props} />);
  const expectedState = { text: '', filterEmoji: false, filterEmojiResult: [] };

  t.is(emojiPicker.state('text'), expectedState.text);
  t.is(emojiPicker.state('filterEmoji'), expectedState.filterEmoji);
  t.is(emojiPicker.state('filterEmojiResult').length, expectedState.filterEmojiResult.length);
});

test('EmojiPicker search input should be change', t => {
  const props = {
    show: false,
    selector: spy(),
    handleEmoji: spy(),
  };
  const mockInput = { target: { value: ':smile:' } };
  const mockEmpty = { target: { value: '' } };
  const emojiPicker = shallow(<EmojiPicker {...props} />);
  const emojiInputSearch = emojiPicker.find('input');

  t.is(emojiInputSearch.at(0).nodes[0].ref('smile'), 'smile');

  emojiInputSearch.prop('onChange')(mockInput);
  t.is(emojiPicker.state('filterEmoji'), true);

  emojiInputSearch.prop('onChange')(mockEmpty);
  t.is(emojiPicker.state('filterEmoji'), false);
});

test('EmojiPicker should render all emoji', t => {
  const props = {
    show: false,
    selector: spy(),
    handleEmoji: spy(),
  };
  const emojiPicker = shallow(<EmojiPicker {...props} />);

  emojiPicker.setState({ filterEmoji: false });
  t.is(emojiPicker.find('#allEmoji').length, 1);
});


test('EmojiPicker should render filter emoji and click emoji should change state', t => {
  const props = {
    show: false,
    selector: spy(),
    handleEmoji: spy(),
  };
  const filterEmojiResult = ['smile', 'laughing', 'joy'];
  const emojiPicker = mount(<EmojiPicker {...props} />);

  emojiPicker.setState({ filterEmoji: true, filterEmojiResult });
  t.is(emojiPicker.find('#filterEmoji').length, 1);

  const smileEmoji = emojiPicker.find('#smile');
  smileEmoji.simulate('click');

  t.is(props.handleEmoji.calledOnce, true);
  t.is(emojiPicker.state('filterEmoji'), false);
});

test('EmojiPicker custom input search and emoji selector style should be render', t => {
  const props = {
    show: false,
    selector: spy(),
    handleEmoji: spy(),
    emojiSearchInputStyle: { height: '20px' },
    selectorStyle: { width: '250px', height: '220px' },
  };
  const emojiPicker = mount(<EmojiPicker {...props} />);
  const searchInputStyle = emojiPicker.find('input').at(0).prop('style');

  t.is(searchInputStyle, props.emojiSearchInputStyle);

  emojiPicker.setProps({ show: true });
  const selectorStyle = emojiPicker.find('#showing').at(0).prop('style');

  t.is(selectorStyle, props.selectorStyle);
});

test('EmojiPicker input search and emoji selector use default style should be render', t => {
  const props = {
    show: false,
    selector: spy(),
    handleEmoji: spy(),
  };
  const emojiPicker = mount(<EmojiPicker {...props} />);
  const searchInputStyle = emojiPicker.find('input').at(0).prop('style');

  t.is(searchInputStyle, defaultEmojiSearchInputStyle);

  emojiPicker.setProps({ show: true });
  const selectorStyle = emojiPicker.find('#showing').at(0).prop('style');

  t.is(selectorStyle, defaultSelectorStyle);
});
