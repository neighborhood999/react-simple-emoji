import test from 'ava';
import EmojiButtonImage from '../src/emojiButtonImage';

test('emojiButtonImage export should be string', t => {
  const expectedBase64 = typeof(EmojiButtonImage);

  t.is('string', expectedBase64);
});
