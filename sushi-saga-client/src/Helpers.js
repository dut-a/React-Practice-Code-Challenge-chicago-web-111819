function getRandomIntInclusive(minimum = 0, max = 100) {
  minimum = Math.ceil(minimum);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - minimum + 1)) + minimum; /* The maximum is inclusive and the minimum is inclusive */ 
}

export {getRandomIntInclusive};