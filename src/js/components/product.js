import anime from 'animejs';

export default class Product {
  constructor(el) {
    this.el = el;
    this.nav = $.qs('.product__nav', this.el);
    this.content = $.qs('.product__content', this.el);
    this.slider = $.qs('.product__slider', this.el);
    this.cover = $.qs('.product__cover', this.el);

    this.animating = false;
  }

  show(done) {
    if (this.animating) return false;

    const tl = anime.timeline({
      // easing: 'cubicBezier(.165,.84,.44,1)',
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
      targets: this.cover,
      scale: [0, 1],
      duration: 800
    })
      .add(
        {
          targets: this.nav,
          scale: [0, 1],
          duration: 600
        },
        '-=800'
      )
      .add(
        {
          targets: [this.slider, this.content],
          duration: 800,
          translateY: ['64px', '0px'],
          opacity: [0, 1],
          delay: anime.stagger(100)
        },
        '-=750'
      );
  }

  hide(done) {
    if (this.animating) return false;

    const tl = anime.timeline({
      // easing: 'cubicBezier(.165,.84,.44,1)',
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
      targets: this.cover,
      scale: [1, 0],
      duration: 400
    })
      .add(
        {
          targets: this.nav,
          scale: [1, 0],
          duration: 250
        },
        '-=400'
      )
      .add(
        {
          targets: [this.slider, this.content],
          duration: 400,
          translateY: ['0px', '-64px'],
          opacity: [1, 0],
          delay: anime.stagger(100)
        },
        '-=400'
      );
  }
}
