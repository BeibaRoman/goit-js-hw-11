export function smoothScroll(container) {
  if (!container || !container.firstElementChild) return;

  const { height: cardHeight } =
    container.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
