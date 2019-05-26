const set = () => {
  // Viewport height
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // Header height
  const headerHeight = $.qs('.header').offsetHeight;
  document.documentElement.style.setProperty('--header-h', `${headerHeight}px`);
};

window.addEventListener('DOMContentLoaded', set);
window.addEventListener('resize', set);
