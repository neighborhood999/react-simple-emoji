import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import EmojiButton from '../src/emojiButton';

test('EmojiButton click should be calledOnce', t => {
  const mockImageSrc = 'test';
  const mockSelector = spy();
  const emojiButton = shallow(
    <EmojiButton src={mockImageSrc} selector={mockSelector} />
  );

  emojiButton.simulate('click');

  t.is(emojiButton.prop('src'), 'test');
  t.is(mockSelector.calledOnce, true);
});
