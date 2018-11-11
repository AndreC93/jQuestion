document.addEventListener("DOMContentLoaded", () => {
  textSpeed = new TextSpeed();
  textSpeed.makePage();
});

class TextSpeed {
  constructor() {
    this.quotes = [
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
    this.pastIndex;
    this.quote = this.pickAQuote();
    this.startTime;
    this.done = false;
    this.interval;
    this.defaultBodyStyling = 'background: white; margin: 100px auto; text-align: center; width: 700px; padding: 20px;';
    this.celebrationGifs = ['./type_speed/images/clapping.gif',
      './type_speed/images/emma_watson.gif',
      './type_speed/images/hats_off.gif',
      './type_speed/images/snape.gif'
    ];
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  generateRandomIndex() {
    return Math.floor(Math.random() * this.quotes.length);
  }

  pickAQuote() {
    if (this.pastIndex === undefined) {
      this.pastIndex = this.generateRandomIndex();
    } else {
      let newIndex = this.generateRandomIndex();
      while (newIndex === this.pastIndex) {
        newIndex = this.generateRandomIndex();
      }
      this.pastIndex = newIndex;
    }
    return this.quotes[this.pastIndex];
  }

  makePage() {
    $j('html').attr('style', "background: url('https://www.textrazor.com/img/letters_inverse.png')");
    $j('body').attr('style', this.defaultBodyStyling);
    $j('.main').append('<div><h1>Welcome to Text Speed Test</h1><span></span><h2></h2><section/></div>');
    $j('span').html('Type out the quote below and see how fast you can do it without typos.')
    $j('span').attr('style', 'font-style: italic;')
    this.makeQuote();
    $j('section').append('<br>').append("<textarea rows='6' cols='60' >");
    $j('.main').append(`<p>${this.generateTimeScore(this.startTime)}</p>`).append(`<h3 style='color: red' ></h3>`);
    $j('.main').append('<button>Reset Text</button>');
    $j('textarea').on('change', ((e) => this.handleChange(e)));
    $j('textarea').on('keydown', ((e) => this.handleChange(e)));
    $j('textarea').attr('style', 'font-size: 20px;');
    $j('textarea').on("cut copy paste", e => e.preventDefault());
    $j('button').on('click', () => this.handleClick())
    $j('button').attr('style', 'padding: 6px 10px; color: brown; background: azure; font-weight: bolder;');
  }

  makeQuote() {
    for (let i = 0; i < this.quote.length; i++) {
      const letter = `<figcaption class='q${i}' style='display: inline-block; white-space: pre;'>${this.quote[i]}</figcaption>`
      $j('h2').append(letter);
    }
  }

  handleChange(e) {
    if (this.done) {
      e.preventDefault();
    } else {
      if (this.startTime === undefined) {
        this.startTime = new Date;
        this.interval = setInterval(() => $j('p').html(`${this.generateTimeScore(this.startTime)}`, 1000));
      } else if ((e.target.value === this.quote || e.target.value + e.key === this.quote) && this.done === false) {
        this.handleSuccess(e);
      } else if (e.key === 'Backspace'){
        const deleteIdx = e.target.value.length -1;
        $j(`.q${deleteIdx}`).attr('style', 'color: black; display: inline-block; white-space: pre;');
      } else {
        const inputStr = e.target.value;
        for(let i = 0; i <= inputStr.length; i++) {
          const quoteLetter = $j(`.q${i}`);
          if (quoteLetter.html() === inputStr[i] || (i === inputStr.length && e.key === quoteLetter.html())) {
            $j(`.q${i}`).attr('style','color: green; display: inline-block; white-space: pre;');
          } else if(e.key) {
            $j(`.q${i}`).attr('style', 'color: red; display: inline-block; white-space: pre;')
          }
        }
      }
    }
  }

  handleSuccess(e) {
    this.done = true;
    clearInterval(this.interval);
    setTimeout(() => $j('p').attr('style', 'color: green; font-size: 24px;'), 50);
    $j('h3').attr('style', 'color: green');
    $j('h3').html('You Finished!!!');
    $j('html').attr('style', `background: url(${this.celebrationGifs[Math.floor(Math.random() * this.celebrationGifs.length)]}) no-repeat center center fixed; background-size: cover;`);
    $j('body').attr('style', this.defaultBodyStyling + ' margin-top: 85vh; transition: margin-top 1s ease-in;');
    $j('button').each( button => button.focus());
  }

  handleClick() {
    this.quote = this.pickAQuote();
    $j('h2').html('');
    this.makeQuote();
    this.startTime = undefined;
    $j('p').html(`${this.generateTimeScore(this.startTime)}`);
    clearInterval(this.interval)
    this.done = false;
    $j('textarea').val('');
    $j('p').attr('style', 'color: black');
    $j('h3').html('');
    $j('html').attr('style', "background: url('https://www.textrazor.com/img/letters_inverse.png')");
    $j('body').attr('style', this.defaultBodyStyling + ' margin-top: 100px; transition: margin-top 1s ease-in;');
  }

  generateTimeScore(start, end = (new Date)) {
    if (start === undefined) return 'Time will start when you start typing.';
    const diff = (end - start) / 1000;
    return `${diff} seconds`;
  }
}