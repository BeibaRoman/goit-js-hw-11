import { Notify } from 'notiflix';
import { refs } from './utils/refs';
import { FetchPhotosApi } from './api/pixabay-api';
import { createMarkup } from './gallery/createMarkup';
import { renderGallery, clearGallery } from './gallery/gallery';
import { smoothScroll } from './gallery/smoothScroll';

let isLoading = false;
let hasMore = true;

const photosApi = new FetchPhotosApi();

refs.searchForm.addEventListener('submit', onSearchForm);
window.addEventListener('scroll', handleScroll);

async function onSearchForm(e) {
  e.preventDefault();

  const form = e.target;
  const query = form.elements.searchQuery.value.trim();

  if (!query) {
    Notify.failure('Please enter a search query.');
    return;
  }

  photosApi.query = query;
  photosApi.resetPage();

  hasMore = true;
  isLoading = false;

  clearGallery(refs.cardsContainer);

  try {
    const data = await fetchPhotosRequest();

    if (data && data.totalHits > 0) {
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
  } finally {
    form.reset();
  }
}

async function fetchPhotosRequest() {
  if (isLoading || !hasMore) return null;

  isLoading = true;

  try {
    const currentPage = photosApi.page;
    const data = await photosApi.fetchPhotos();

    if (!data.hits.length) {
      hasMore = false;
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return null;
    }

    const markup = createMarkup(data.hits);
    renderGallery(refs.cardsContainer, markup);

    const totalPages = Math.ceil(data.totalHits / photosApi.perPage);

    if (currentPage >= totalPages) {
      hasMore = false;
      Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
      photosApi.incrementPage();
    }

    return data;
  } catch (error) {
    Notify.failure(error.message || 'Something went wrong. Please try again.');
    return null;
  } finally {
    isLoading = false;
  }
}

async function handleScroll() {
  if (isLoading || !hasMore) return;

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 300) {
    const data = await fetchPhotosRequest();

    if (data) {
      smoothScroll(refs.cardsContainer);
    }
  }
}
