window.addEventListener('scroll', function() {
  const scrollPosition = window.pageYOffset;
  const ribbonText = document.querySelector('.ribbontext');
  // Modify the translation based on scroll, making the text movement more apparent.
  ribbonText.style.transform = `translateX(${-scrollPosition * 0.2}px)`;
});