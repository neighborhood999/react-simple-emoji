import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import SelectorBox from '../src/selectorBox';
import { defaultSelectorStyle } from '../src/emojiStyle';

test('SelectorBox should be render children', t => {
  const show = true;
  const selectorBox = shallow(
    <SelectorBox show={show} style={defaultSelectorStyle}>
      <p>test</p>
      <p>emoji</p>
    </SelectorBox>
  );

  t.is(selectorBox.contains([
    <p>test</p>,
    <p>emoji</p>,
  ]), true);
});
