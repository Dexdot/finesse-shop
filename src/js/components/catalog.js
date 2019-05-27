import anime from 'animejs';
import Raf from 'raf-engine';
import VirtualScroll from 'virtual-scroll';
import inobounce from 'inobounce';

const loop = new Raf();

const roundDec = n => Math.round(n * 100) / 100;
const lerp = (a, b, n) => (1 - n) * a + n * b;

const easing = 'cubicBezier(.165,.84,.44,1)';

export default class Catalog {
  constructor() {
    this.el = $.qs('.catalog');

    this.animating = false;
    this.scrollY = 0;
    this.translate = 0;

    this.setup();
  }

  setup() {
    this.initScroll();

    window.showCatalog = this.show.bind(this);
    window.hideCatalog = this.hide.bind(this);
  }

  show(done) {
    if (this.animating) return false;

    const tl = anime.timeline({
      easing,
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
      targets: '.catalog li',
      opacity: [0, 1],
      translateY: ['64px', '0px'],
      duration: 600,
      delay: anime.stagger(25)
    });
  }

  hide(done) {
    if (this.animating) return false;

    const tl = anime.timeline({
      easing,
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
      targets: '.catalog li',
      opacity: [1, 0],
      translateY: ['0px', '-64px'],
      duration: 600,
      delay: anime.stagger(25)
    });
  }

  initScroll() {
    loop.start();

    this.vs = new VirtualScroll({
      mouseMultiplier: 0.8,
      firefoxMultiplier: 24,
      touchMultiplier: 4,
      passive: true
    });

    this.vs.on(e => {
      if (this.el.classList.contains('hidden')) return false;

      const scroll = this.scrollY + -1 * e.deltaY;

      this.scrollY = Math.min(
        Math.max(scroll, 0),
        this.el.getBoundingClientRect().height -
          window.innerHeight +
          $.qs('.header').offsetHeight +
          64
      );
    });

    loop.add(this.checkSmooth.bind(this), 'checkSmooth');

    inobounce.enable();
  }

  checkSmooth() {
    if (Math.round(this.scrollY) !== Math.round(this.translate)) {
      this.translate = roundDec(lerp(this.translate, this.scrollY, 0.04));
      this.el.style.transform = `translate3d(0, -${this.translate}px, 0)`;
    }
  }
}
