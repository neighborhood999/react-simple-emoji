import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import EmojiImage from '../src/emojiImage';

test('EmojiImage should be render', t => {
  const props = {
    name: 'smile',
    handleEmoji: spy(),
  };
  const emojiImage = shallow(<EmojiImage {...props} />);

  t.is(emojiImage.prop('alt'), 'smile');

  emojiImage.find('img').simulate('click');
  t.is(props.handleEmoji.calledOnce, true);
});
