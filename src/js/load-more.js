import { fetchByQuery } from './pixabay-api';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let page = 1;
let totalHits = 0;
let searchQuery = '';

const elements = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  submitBtn: document.querySelector('button[type="submit"]'),
  loadMoreBtn: document.querySelector('.js-loadmore'),
};

elements.form.addEventListener('submit', handleSubmit);
elements.loadMoreBtn.addEventListener('click', handleLodaMore);

function handleSubmit(event) {
  event.preventDefault();
  searchQuery = elements.input.value;
  page = 1;
  elements.gallery.innerHTML = '';

  fetchAndDisplay();

  elements.loadMoreBtn.classList.replace('load-more-hidden', 'load-more');
}

function handleLodaMore() {
  page += 1;
  fetchAndDisplay();
}

function fetchAndDisplay() {
  fetchByQuery(searchQuery, page)
    .then(({ hits, totalHits }) => {
      const markup = createMarkup(hits);
      elements.gallery.insertAdjacentHTML('beforeend', markup);
      new SimpleLightbox('.gallery a');

      if (page * 40 >= totalHits) {
        elements.loadMoreBtn.classList.add('load-more-hidden');
        alert("We're sorry, but you've reached the end of search results.");
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />

  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
  </a>
</div>`
    )
    .join('');
}
