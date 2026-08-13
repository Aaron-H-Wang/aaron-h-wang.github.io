(function () {
  var track = document.getElementById('recent-posts-track');
  var previous = document.querySelector('.recent-posts__button--previous');
  var next = document.querySelector('.recent-posts__button--next');

  if (!track || !previous || !next) return;

  var drag = { active: false, moved: false, startX: 0, startScroll: 0 };

  function pageWidth() {
    return track.clientWidth;
  }

  function updateControls() {
    var end = track.scrollWidth - track.clientWidth;
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= end - 2;
  }

  function move(direction) {
    track.scrollBy({ left: direction * pageWidth(), behavior: 'smooth' });
  }

  previous.addEventListener('click', function () { move(-1); });
  next.addEventListener('click', function () { move(1); });
  track.addEventListener('scroll', updateControls, { passive: true });
  window.addEventListener('resize', updateControls);

  track.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    }
  });

  track.addEventListener('pointerdown', function (event) {
    if (event.pointerType === 'touch') return;
    drag.active = true;
    drag.moved = false;
    drag.startX = event.clientX;
    drag.startScroll = track.scrollLeft;
  });

  track.addEventListener('dragstart', function (event) {
    event.preventDefault();
  });

  track.addEventListener('pointermove', function (event) {
    if (!drag.active) return;
    var distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 5 && !drag.moved) {
      drag.moved = true;
      track.classList.add('is-dragging');
      track.setPointerCapture(event.pointerId);
    }
    if (!drag.moved) return;
    track.scrollLeft = drag.startScroll - distance;
  });

  function stopDragging(event) {
    if (!drag.active) return;
    drag.active = false;
    track.classList.remove('is-dragging');
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
  }

  track.addEventListener('pointerup', stopDragging);
  track.addEventListener('pointercancel', stopDragging);
  track.addEventListener('click', function (event) {
    if (!drag.moved) return;
    event.preventDefault();
    event.stopPropagation();
    drag.moved = false;
  }, true);

  updateControls();
}());
