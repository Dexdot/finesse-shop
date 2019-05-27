import Hero from '@/components/hero';
import Catalog from '@/components/catalog';
import Product from '@/components/product';

let current;

const hero = new Hero();
const catalog = new Catalog();

const products = [];

$.each('.product', el => {
  products.push(new Product(el));
});

const init = () => {
  hero.show(() => {
    current = hero;
  });

  $.listen('.js-hero', 'click', () => {
    if (!current.animating) {
      current.hide(() => {
        hero.show();
        current = hero;
      });
    }
  });

  $.each('.js-product', (el, i) => {
    el.addEventListener('click', () => {
      if (!current.animating) {
        current.hide(() => {
          products[i].show();
          current = products[i];
        });
      }
    });
  });

  $.listen('.js-catalog', 'click', () => {
    if (!current.animating) {
      current.hide(() => {
        catalog.show();
        current = catalog;
      });
    }
  });
};

window.addEventListener('load', init);
