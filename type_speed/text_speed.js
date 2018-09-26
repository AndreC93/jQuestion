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

const generateRandomIndex = () => Math.floor(Math.random() * quotes.length);
let pastIndex;

const pickAQuote = () => {
  if (pastIndex === undefined) {
    pastIndex = generateRandomIndex();
  } else {
    let newIndex = generateRandomIndex();
    while (newIndex === pastIndex) {
      newIndex = generateRandomIndex();
    }
    pastIndex = newIndex;
  }
  return quotes[pastIndex];
};

let quote = pickAQuote();



let startTime;
let done = false;
let interval;

document.addEventListener("DOMContentLoaded", () => {
  $j('html').attr('style', "background: url('https://www.textrazor.com/img/letters_inverse.png')");
  $j('body').attr('style', 
    "background: white; margin: 100px auto; text-align: center; width: 700px; padding: 20px;");
  $j('.main').append('<div><h1>Welcome to Text Speed Test</h1><span></span><h2></h2><section/></div>');
  $j('span').html('Type out the quote below and see how fast you can do it without typos.')
  $j('span').attr('style', 'font-style: italic;')
  $j('h2').html(quote);
  $j('section').append('<br>').append("<textarea rows='6' cols='80' >");
  $j('.main').append(`<p>${generateTimeScore(startTime)}</p>`).append(`<h3 style='color: red' ></h3>`);
  $j('.main').append('<button>Reset Text</button>');
  $j('textarea').on('keypress', ((e) => handleKeypress(e)));
  $j('textarea').on('keydown', ((e) => handleKeypress(e)));
  $j('button').on('click', () => handleClick())
  $j('button').attr('style', 'padding: 6px 10px; color: brown; background: azure; font-weight: bolder;');
});

const handleKeypress = (e) => {
  if (startTime === undefined) {
    startTime = new Date;
    interval = setInterval(() => $j('p').html(`${generateTimeScore(startTime)}`, 1000));
  } else if (e.target.value + e.key === quote && done === false) {
    clearInterval(interval);
    done = true;
    $j('p').attr('style', 'color: green');
  } else if (e.target.value.length >= quote.length) {
    $j('p').attr('style', 'color: red');
    $j('h3').html('Invalid Text!!!');
  } else if (e.target.value.length <= quote.length) {
    $j('p').attr('style', 'color: black');
    $j('h3').html('');
  }
};

const handleClick = () => {
  quote = pickAQuote();
  $j('h2').html(quote);
  startTime = undefined;
  done = false;
  setTimeout(() => clearInterval(interval), 1000);
};

const generateTimeScore = (start, end = (new Date)) => {
  if (start === undefined) return 'Time will start when you start typing.';
  const diff = (end - start)/1000;
  const seconds = Math.round(diff);
  return `${seconds} seconds`;
};