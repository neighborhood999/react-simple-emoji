import test from 'ava';
import { emojis, categoryOfEmoji } from '../src/emoji';

test('emojis list should be Object', t => {
  t.is(typeof(emojis), 'object');
  t.is(emojis.length, 855, 'Object keys lenght have 855.');
});

test('categoryOfEmoji should be Object', t => {
  const expectedCategoryOfEmojiKeysLength = Object.keys(categoryOfEmoji).length;

  t.is(typeof(categoryOfEmoji), 'object');
  t.is(expectedCategoryOfEmojiKeysLength, 9, 'Object keys have nine');
});
