const preference = matchMedia("(prefers-reduced-motion: reduce)");
document.querySelectorAll("[data-album]").forEach((album) => {
  const slides = [...album.querySelectorAll("[data-album-slide]")];
  const thumbs = [...album.querySelectorAll("[data-album-thumb]")];
  const thumbRail = album.querySelector(".pf-album-thumbs");
  const stage = album.querySelector(".pf-album-stage");
  const expand = album.querySelector("[data-album-expand]");
  const dialog = album.parentElement.querySelector("[data-gallery-dialog]");
  let current = 0,
    animation,
    touch;
  const select = (index) => {
    const next = (index + slides.length) % slides.length;
    if (next === current) return;
    const direction = index > current ? 1 : -1;
    animation?.cancel();
    slides[current].hidden = true;
    current = next;
    const slide = slides[current];
    slide.hidden = false;
    thumbs.forEach((thumb, i) =>
      thumb.setAttribute("aria-pressed", String(i === current)),
    );
    if (thumbRail.scrollWidth > thumbRail.clientWidth) {
      thumbs[current].scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: preference.matches ? "instant" : "smooth",
      });
    }
    album.querySelector("[data-album-title]").textContent =
      slide.dataset.caption;
    album.querySelector("[data-album-count]").textContent =
      `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    expand.disabled = !slide.dataset.src;
    if (!preference.matches)
      animation = slide.animate(
        [
          {
            opacity: 0,
            transform: `translateX(${direction * 32}px) scale(.985)`,
          },
          { opacity: 1, transform: "translateX(0) scale(1)" },
        ],
        { duration: 440, easing: "cubic-bezier(.2,.7,.2,1)" },
      );
  };
  thumbs.forEach((thumb, i) =>
    thumb.addEventListener("click", () => select(i)),
  );
  album
    .querySelector("[data-album-prev]")
    .addEventListener("click", () => select(current - 1));
  album
    .querySelector("[data-album-next]")
    .addEventListener("click", () => select(current + 1));
  album.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      select(current + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
  stage.addEventListener(
    "touchstart",
    (event) => {
      touch = event.changedTouches[0];
    },
    { passive: true },
  );
  stage.addEventListener(
    "touchend",
    (event) => {
      if (!touch) return;
      const end = event.changedTouches[0],
        dx = end.clientX - touch.clientX,
        dy = end.clientY - touch.clientY;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4)
        select(current + (dx < 0 ? 1 : -1));
      touch = null;
    },
    { passive: true },
  );
  stage.addEventListener("touchcancel", () => {
    touch = null;
  });
  preference.addEventListener("change", () => {
    if (preference.matches) animation?.cancel();
  });
  expand.addEventListener("click", () => {
    const slide = slides[current];
    if (!slide.dataset.src) return;
    const image = dialog.querySelector("[data-gallery-image]");
    image.src = slide.dataset.src;
    image.alt = slide.dataset.alt;
    dialog.querySelector("[data-gallery-caption]").textContent =
      slide.dataset.caption;
    dialog.showModal();
  });
  dialog
    .querySelector("[data-gallery-close]")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  });
  dialog.addEventListener("close", () => expand.focus({ preventScroll: true }));
});
