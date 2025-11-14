/* Lightbox logic */
function initLightbox(triggerSelector, lightboxId, imgId) {
  const triggers = Array.from(document.querySelectorAll(triggerSelector));
  if (!triggers.length) return;

  const lightbox = document.getElementById(lightboxId);
  const imgElement = document.getElementById(imgId);
  const close = lightbox.querySelector(".close");
  const prev = lightbox.querySelector(".nav-arrow.left");
  const next = lightbox.querySelector(".nav-arrow.right");

  let index = 0;

  function showSlide(i) {
    if (i < 0) i = triggers.length - 1;
    if (i >= triggers.length) i = 0;

    index = i;
    imgElement.src = triggers[i].getAttribute("href");
  }

  triggers.forEach((el, i) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      index = i;
      showSlide(index);
      lightbox.style.display = "block";
    });
  });

  close.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  prev.addEventListener("click", () => {
    showSlide(index - 1);
  });

  next.addEventListener("click", () => {
    showSlide(index + 1);
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}

initLightbox(".lightbox-trigger.masonry", "lightbox-masonry", "lightbox-img-masonry");
initLightbox(".lightbox-trigger.flex", "lightbox-flex", "lightbox-img-flex");
