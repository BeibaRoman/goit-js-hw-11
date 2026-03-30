import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '36833134-be534b8a8a704feb8c4d9a967';

export class FetchPhotosApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fetchPhotos() {
    const url = `${BASE_URL}?key=${KEY_API}&q=${encodeURIComponent(
      this.searchQuery
    )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${
      this.perPage
    }&page=${this.page}`;

    const response = await axios.get(url);

    return response.data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery.trim();
  }
}
