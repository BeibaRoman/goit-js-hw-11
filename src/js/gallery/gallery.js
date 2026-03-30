import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const lightbox = new SimpleLightbox('.photo-card-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderGallery(container, markup) {
  container.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery(container) {
  container.innerHTML = '';
}
