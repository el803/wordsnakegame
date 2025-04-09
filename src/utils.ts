export function getRandomWord(dictionary: string[], minLength = 3, maxLength = 8): string {
  // Filter words by length
  const filteredWords = dictionary.filter(
    word => word.length >= minLength && word.length <= maxLength
  );
  
  // Pick a random word
  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}
