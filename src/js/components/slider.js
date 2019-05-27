import anime from 'animejs';
import WheelIndicator from 'wheel-indicator';

const show = el => el.classList.add('visible');
const hide = el => el.classList.remove('visible');

const easing = 'cubicBezier(.7,.35,.38,.95)';
const duration = 800;

export default class Slider {
  constructor(el) {
    this.DOM = { el };
    this.DOM.images = $.qs('.product__images', this.DOM.el);

    this.index = 0;
    this.animating = false;

    this.setup();
  }

  setup() {
    this.clone();
    show($.qs('.product__images li:nth-child(1) img', this.DOM.el));
    show($.qs('.product__images li:nth-child(2) img', this.DOM.el));

    this.initEvents();
  }

  initEvents() {
    $.qs('.js-prev', this.DOM.el).addEventListener('click', () => {
      if (!this.DOM.el.classList.contains('hidden')) this.prev();
    });
    $.qs('.js-next', this.DOM.el).addEventListener('click', () => {
      if (!this.DOM.el.classList.contains('hidden')) this.next();
    });

    const indicator = new WheelIndicator({
      elem: $.qs('body'),
      callback: ({ direction }) => {
        if (this.DOM.el.classList.contains('hidden')) return false;

        if (direction === 'down') this.next();
        if (direction === 'up') this.prev();
      }
    });
  }

  clone() {
    this.DOM.images.innerHTML += this.DOM.images.innerHTML;
  }

  prev() {
    if (this.animating) return false;
    this.animating = true;

    const current = $.qs(
      `.product__images li:nth-child(${this.index + 1}) img`,
      this.DOM.el
    );

    const prev = this.getSibling(current, false);
    const next = this.getSibling(current, true);

    anime({
      targets: current,
      translateY: ['-50%', '35%'],
      duration,
      easing
    });

    anime({
      targets: next,
      translateY: ['35%', '50%'],
      duration: duration / 4,
      easing,
      complete: () => {
        hide(next);
      }
    });

    hide(prev);
    anime.set(prev, { translateY: '-150%' });
    show(prev);
    anime({
      targets: prev,
      translateY: ['-150%', '-50%'],
      duration,
      easing,
      complete: () => {
        this.animating = false;
        if (this.index <= 0) {
          this.index = this.DOM.images.children.length - 1;
        } else {
          this.index = this.index - 1;
        }
      }
    });
  }

  next() {
    if (this.animating) return false;
    this.animating = true;

    const current = $.qs(
      `.product__images li:nth-child(${this.index + 1}) img`,
      this.DOM.el
    );

    const next = this.getSibling(current);

    anime({
      targets: current,
      translateY: ['-50%', '-150%'],
      duration,
      easing,
      complete: () => {
        // Прячем ушедший слайд
        hide(current);
        anime.set(current, { translateY: '50%' });
      }
    });

    anime({
      targets: next,
      translateY: ['35%', '-50%'],
      duration,
      easing,
      complete: () => {
        // "Немного" показываем следующий слайд
        const sibling = this.getSibling(next);
        hide(sibling);
        anime.set(sibling, { translateY: '50%' });
        show(sibling);

        anime({
          targets: sibling,
          translateY: ['50%', '35%'],
          duration: duration / 2,
          easing: 'easeOutSine',
          complete: () => {
            this.animating = false;

            if (this.index === this.DOM.images.children.length - 1) {
              this.index = 0;
            } else {
              this.index += 1;
            }
          }
        });
      }
    });
  }

  getSibling = (el, next = true) => {
    let sibling;

    if (next) {
      sibling = el.parentElement.nextElementSibling
        ? $.qs('img', el.parentElement.nextElementSibling)
        : $.qs('.product__images li:nth-child(1) img', this.DOM.el);
    } else {
      sibling = el.parentElement.previousElementSibling
        ? $.qs('img', el.parentElement.previousElementSibling)
        : $.qs('.product__images li:last-child img', this.DOM.el);
    }
    return sibling;
  };
}
