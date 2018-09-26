const quotes = [
  "I solemnly swear that I am up to no good.",
  "Fear of a name increases fear of the thing itself.",
  "Time will not slow down when something unpleasant lies ahead.",
  "Just because you have the emotional range of a teaspoon doesn't mean we all have.",
  "It does not do to dwell on dreams and forget to live.",
  "Don't let the muggles get you down.",
  "What's comin' will come, and we'll meet it when it does.",
  "Once again, you show all the sensitivity of a blunt axe.",
  "It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.",
  "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals."
];

generateRandomIndex = () => Math.floor(Math.random() * quotes.length);

const quote = quotes[generateRandomIndex()];

let startTime;
let endTime;
let errorMessage = '';

document.addEventListener("DOMContentLoaded", () => {
  $j('.main').append('<div><h1>Welcome to Text Speed Test</h1><h2></h2></div>')
  $j('.main').find('h2').html(quote).append('<br>').append("<textarea rows='6' cols='80' class='text-box' >");
  $j('.text-box').on('keypress', (e) => handleKeypress(e));
  $j('.main').append(`<p>${generateTimeScore(startTime)}</p>`)

});

handleKeypress = (e) => {
  if (startTime === undefined) {
    startTime = new Date;
    setInterval(() => $j('p').html(`${generateTimeScore(startTime)}`, 1000));
  } else if (e.target.value === quote && endTime === undefined) {
    endTime = new Date;
    generateTimeScore(startTime, endTime);
  } else if (e.target.value.length >= quote.length) {
    errorMessage = 'Incorrect Quote';
  } else if (e.target.value.length === quote.length) {
    errorMessage = '';
  }
};

generateTimeScore = (start, end = (new Date)) => {
  if (start === undefined) return 'Time will start when you start typing.';
  const diff = (end - start)/1000;
  const seconds = Math.round(diff);
  return `${seconds} seconds`;
};