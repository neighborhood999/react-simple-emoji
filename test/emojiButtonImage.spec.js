import test from 'ava';
import emojiButtonImage from '../src/emojiButtonImage';

test('emojiButtonImage export should be string', t => {
  const expectedBase64 = typeof(emojiButtonImage);

  t.is('string', expectedBase64);
});
