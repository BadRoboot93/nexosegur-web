"use strict";

const slider = document.querySelector(".services-slider");

if (slider) {
  const viewport = slider.querySelector(".services-slider__viewport");
  const track = slider.querySelector(".services-slider__track");
  const cards = Array.from(slider.querySelectorAll(".service-card"));
  const pagination = slider.querySelector(".services-slider__pagination");

  let currentIndex = 0;
  let visibleCards = 1;
  let gap = 0;

  function getVisibleCards() {
    const viewportWidth = viewport.clientWidth;

    if (viewportWidth > 960) {
      return 3;
    }

    if (viewportWidth > 640) {
      return 2;
    }

    return 1;
  }

  function getGap() {
    const trackStyles = window.getComputedStyle(track);
    const gapValue = parseFloat(trackStyles.columnGap || trackStyles.gap);

    return Number.isNaN(gapValue) ? 0 : gapValue;
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - visibleCards);
  }

  function updateTrack() {
    const cardWidth = cards[0]?.getBoundingClientRect().width ?? 0;
    const offset = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;
  }

  function updatePagination() {
    if (!pagination) {
      return;
    }

    const totalPositions = getMaxIndex() + 1;

    pagination.innerHTML = "";

    for (let index = 0; index < totalPositions; index += 1) {
      const dot = document.createElement("button");

      dot.className = "services-slider__dot";
      dot.type = "button";
      dot.setAttribute(
        "aria-label",
        `Ir a la posición ${index + 1} de ${totalPositions}`,
      );

      if (index === currentIndex) {
        dot.classList.add("is-active");
        dot.setAttribute("aria-current", "true");
      }

      dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
      });

      pagination.appendChild(dot);
    }
  }

  function updateSlider() {
    visibleCards = getVisibleCards();
    gap = getGap();

    currentIndex = Math.min(currentIndex, getMaxIndex());

    updateTrack();
    updatePagination();
  }

  let resizeTimer;

  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);

    resizeTimer = window.setTimeout(() => {
      updateSlider();
    }, 150);
  });

  updateSlider();
}
