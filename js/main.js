/* LcinoEditor landing — progressive enhancement only.
   Every piece of content renders without this file; it adds
   scroll-reveal motion, hero pointer-parallax and nothing else. */
(function () {
  'use strict';

  // Gate reveal animations behind a class so crawlers and no-JS
  // visitors always see the full static content.
  document.documentElement.classList.add('js');

  var revealables = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealables.forEach(function (el) { io.observe(el); });

  // Nav shadow once the page scrolls (purely cosmetic).
  var nav = document.querySelector('.nav');
  var onScroll = function () {
    nav.style.boxShadow = window.scrollY > 8
      ? '0 14px 34px rgba(0,0,0,.5)' : 'none';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hero pointer-parallax: the 3D mock tilts toward the cursor.
  var stage = document.getElementById('stage');
  var mock = document.getElementById('mock');
  if (stage && mock && window.matchMedia('(pointer:fine)').matches) {
    var raf = null;
    stage.addEventListener('pointermove', function (e) {
      var r = stage.getBoundingClientRect();
      var mx = Math.max(-1, Math.min(1, (e.clientX - r.left) / r.width * 2 - 1));
      var my = Math.max(-1, Math.min(1, (e.clientY - r.top) / r.height * 2 - 1));
      if (raf) return;
      raf = requestAnimationFrame(function () {
        mock.style.setProperty('--mx', mx.toFixed(3));
        mock.style.setProperty('--my', my.toFixed(3));
        raf = null;
      });
    });
    stage.addEventListener('pointerleave', function () {
      mock.style.setProperty('--mx', '0');
      mock.style.setProperty('--my', '0');
    });
  }
})();
