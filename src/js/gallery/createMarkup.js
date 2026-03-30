export function createMarkup(images) {
  const placeholderImg = 'https://placehold.co/400x300?text=No+Image';

  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <article class="photo-card">
          <a class="photo-card-link" href="${largeImageURL || placeholderImg}">
            <img
              class="photo-card-image"
              src="${webformatURL || placeholderImg}"
              alt="${tags || 'No description'}"
              loading="lazy"
            />
          </a>

          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <span>${likes ?? 0}</span>
            </p>
            <p class="info-item">
              <b>Views</b>
              <span>${views ?? 0}</span>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <span>${comments ?? 0}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <span>${downloads ?? 0}</span>
            </p>
          </div>
        </article>
      `
    )
    .join('');
}
