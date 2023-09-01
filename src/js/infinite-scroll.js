import { fetchByQuery } from './pixabay-api';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

let page = 1;
let totalHits = 0;
let searchQuery = '';
let isLoading = false;

const elements = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  submitBtn: document.querySelector('button[type="submit"]'),
};

elements.form.addEventListener('submit', handleSubmit);
window.addEventListener('scroll', handleScroll);

async function handleSubmit(event) {
  event.preventDefault();
  searchQuery = elements.input.value;
  page = 1;
  elements.gallery.innerHTML = '';

  try {
    const { totalHits } = await fetchByQuery(searchQuery, page);

    if (totalHits === 0) {
      Notiflix.Notify.info(
        'Sorry, nothing was found according your serch query'
      );
      //   elements.loadMoreBtn.classList.add('load-more-hidden');
    } else {
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
      await fetchAndDisplay();
      //   if (totalHits > 40) {
      //     elements.loadMoreBtn.classList.replace('load-more-hidden', 'load-more');
      //   }
    }
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong. Try reload the page');
    console.error('There was a problem with the fetch operation:', error);
  }
}

async function handleLodaMore() {
  isLoading = true;
  page += 1;
  await fetchAndDisplay();
  //  плавне прокручування
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
  isLoading = false;
}

function handleScroll() {
  if (isLoading) return;

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    handleLodaMore();
  }
}

async function fetchAndDisplay() {
  try {
    isLoading = true;
    const { hits, totalHits } = await fetchByQuery(searchQuery, page);
    const markup = createMarkup(hits);
    elements.gallery.insertAdjacentHTML('beforeend', markup);

    new SimpleLightbox('.gallery a');

    if (page * 40 >= totalHits && totalHits > 0 && page > 1) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      window.removeEventListener('scroll', handleScroll);
    }

    isLoading = false;
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong. Try reload the page');
    console.error('There was a problem with the fetch operation:', error);
    isLoading = false;
  }
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
  </a>
  <div class="info">
  <div class="info-item">
    <i class="fas fa-heart"></i> <!-- іконка для Likes -->
    <span>${likes}</span>
  </div>
  <div class="info-item">
    <i class="fas fa-eye"></i> <!-- іконка для Views -->
    <span>${views}</span>
  </div>
  <div class="info-item">
    <i class="fas fa-comments"></i> <!-- іконка для Comments -->
    <span>${comments}</span>
  </div>
  <div class="info-item">
    <i class="fas fa-download"></i> <!-- іконка для Downloads -->
    <span>${downloads}</span>
  </div>
</div>
</div>`
    )
    .join('');
}
