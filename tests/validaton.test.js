const validation = require('../validation');

test('a tweet is of valid length', () => {
  let tweet = 'hola';
  expect(validation.isValidLength(tweet, 10)).toBe(true);
})

test('a tweet is of invalid length', () => {
  let longTweet = 'holaholaholaholaholaholaholahola'
  expect(validation.isValidLength(longTweet, 10)).toBe(false);
})
