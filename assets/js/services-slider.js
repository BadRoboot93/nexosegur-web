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
  let totalPositions = 0;

  let startX = 0;
  let currentX = 0;
  let baseOffset = 0;
  let isDragging = false;
  let hasDragged = false;

  const dragThreshold = 50;

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

  function getCardStep() {
    const cardWidth = cards[0]?.getBoundingClientRect().width ?? 0;

    return cardWidth + gap;
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - visibleCards);
  }

  function getOffset(index = currentIndex) {
    return index * getCardStep();
  }

  function updateTrack(animate = true) {
    track.classList.toggle("is-dragging", !animate);

    const offset = getOffset();

    track.style.transform = `translateX(-${offset}px)`;
  }

  function updateActiveDot() {
    if (!pagination) {
      return;
    }

    const dots = pagination.querySelectorAll(".services-slider__dot");

    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;

      dot.classList.toggle("is-active", isActive);

      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }

  function goToIndex(index) {
    currentIndex = Math.max(0, Math.min(index, getMaxIndex()));

    updateTrack();
    updateActiveDot();
  }

  function createPagination() {
    if (!pagination) {
      return;
    }

    pagination.innerHTML = "";

    for (let index = 0; index < totalPositions; index += 1) {
      const dot = document.createElement("button");

      dot.className = "services-slider__dot";
      dot.type = "button";
      dot.setAttribute(
        "aria-label",
        `Ir a la posición ${index + 1} de ${totalPositions}`,
      );

      dot.addEventListener("click", () => {
        goToIndex(index);
      });

      pagination.appendChild(dot);
    }

    updateActiveDot();
  }

  function updateSlider() {
    visibleCards = getVisibleCards();
    gap = getGap();

    const newTotalPositions = getMaxIndex() + 1;

    currentIndex = Math.min(currentIndex, getMaxIndex());

    updateTrack();

    if (newTotalPositions !== totalPositions) {
      totalPositions = newTotalPositions;
      createPagination();
    } else {
      updateActiveDot();
    }
  }

  function handlePointerDown(event) {
    if (event.button !== 0) {
      return;
    }

    isDragging = true;
    hasDragged = false;

    startX = event.clientX;
    currentX = event.clientX;
    baseOffset = getOffset();

    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add("is-dragging");
    track.classList.add("is-dragging");
  }

  function handlePointerMove(event) {
    if (!isDragging) {
      return;
    }

    currentX = event.clientX;

    const distance = currentX - startX;

    if (Math.abs(distance) > 5) {
      hasDragged = true;
    }

    const maxOffset = getOffset(getMaxIndex());
    let nextOffset = baseOffset - distance;

    // Resistencia suave en los extremos.
    if (nextOffset < 0) {
      nextOffset *= 0.25;
    }

    if (nextOffset > maxOffset) {
      nextOffset = maxOffset + (nextOffset - maxOffset) * 0.25;
    }

    track.style.transform = `translateX(-${nextOffset}px)`;
  }

  function handlePointerEnd(event) {
    if (!isDragging) {
      return;
    }

    isDragging = false;

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    viewport.classList.remove("is-dragging");
    track.classList.remove("is-dragging");

    const distance = currentX - startX;

    if (Math.abs(distance) >= dragThreshold) {
      if (distance < 0) {
        goToIndex(currentIndex + 1);
      } else {
        goToIndex(currentIndex - 1);
      }
    } else {
      updateTrack();
    }
  }

  viewport.addEventListener("pointerdown", handlePointerDown);
  viewport.addEventListener("pointermove", handlePointerMove);
  viewport.addEventListener("pointerup", handlePointerEnd);
  viewport.addEventListener("pointercancel", handlePointerEnd);

  viewport.addEventListener(
    "click",
    (event) => {
      if (!hasDragged) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      hasDragged = false;
    },
    true,
  );

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(() => {
      updateSlider();
    });

    resizeObserver.observe(viewport);
  } else {
    let resizeTimer;

    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);

      resizeTimer = window.setTimeout(() => {
        updateSlider();
      }, 150);
    });
  }

  updateSlider();
}
