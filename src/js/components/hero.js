import anime from 'animejs';
import '@/libs/split-text';

const { SplitText } = window;

export default class Hero {
  constructor() {
    this.el = $.qs('.hero');
    this.title = $.qs('.hero__title');
    this.text = $.qs('.hero__text');
    this.img = $.qs('.hero__img');
    this.imgI = $.qs('.hero__img img');
    this.btn = $.qs('.hero .btn');

    this.animating = false;

    this.setup();
  }

  setup() {
    this.split();

    window.showHero = this.show.bind(this);
    window.hideHero = this.hide.bind(this);
  }

  split() {
    const chars = new SplitText(this.title, {
      type: 'words,chars',
      charsClass: `hero-char`
    });

    const lines = new SplitText(this.text, {
      type: 'words',
      wordsClass: `hero-word`
    });

    this.chars = $.qsa('.hero-char');
    this.words = $.qsa('.hero-word');
  }

  show(done) {
    if (this.animating) return false;

    const tl = anime.timeline({
      easing: 'cubicBezier(.31,0,0,1.01)',
      begin: () => {
        this.el.classList.remove('hidden');
        this.animating = true;
      },
      complete: () => {
        this.animating = false;
        if (done) done();
      }
    });

    tl.add({
      easing: 'easeInOutSine',
      targets: this.imgI,
      duration: 1000,
      scale: [1.3, 1]
    })
      .add(
        {
          easing: 'cubicBezier(.49,.09,.53,.98)',
          targets: this.img,
          duration: 1000,
          opacity: [0, 1]
        },
        '-=1000'
      )
      .add(
        {
          targets: this.chars,
          opacity: [0, 1],
          translateY: ['30%', '0%'],
          duration: 800,
          delay: anime.stagger(25)
        },
        '-=1000'
      )
      .add(
        {
          targets: this.words,
          opacity: [0, 1],
          duration: 1000,
          delay: anime.stagger(25)
        },
        '-=900'
      )
      .add(
        {
          targets: this.btn,
          opacity: [0, 1],
          translateY: ['30%', '0%'],
          duration: 600
        },
        '-=1100'
      );
  }

  hide(done) {
    if (this.animating) return false;

    const tl = anime.timeline({
      easing: 'cubicBezier(.31,0,0,1.01)',
      begin: () => {
        this.animating = true;
      },
      complete: () => {
        this.animating = false;
        this.el.classList.add('hidden');
        if (done) done();
      }
    });

    tl.add({
      easing: 'easeInOutSine',
      targets: this.img,
      duration: 400,
      opacity: [1, 0]
    })
      .add(
        {
          targets: this.chars,
          opacity: [1, 0],
          duration: 400,
          delay: anime.stagger(15)
        },
        '-=400'
      )
      .add(
        {
          targets: this.words,
          opacity: [1, 0],
          duration: 400,
          delay: anime.stagger(15)
        },
        '-=600'
      )
      .add(
        {
          targets: this.btn,
          opacity: [1, 0],
          translateY: ['0%', '-30%'],
          duration: 400
        },
        '-=800'
      );
  }
}
