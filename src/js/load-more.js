import { fetchByQuery } from './pixabay-api';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

let page = 1;
let totalHits = 0;
let searchQuery = '';
const lightbox = new SimpleLightbox('.gallery a');

const elements = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  submitBtn: document.querySelector('button[type="submit"]'),
  loadMoreBtn: document.querySelector('.js-loadmore'),
};

elements.form.addEventListener('submit', handleSubmit);
elements.loadMoreBtn.addEventListener('click', handleLodaMore);

async function handleSubmit(event) {
  event.preventDefault();
  searchQuery = elements.input.value.trim();
  page = 1;
  elements.gallery.innerHTML = '';

  if (elements.loadMoreBtn.classList.contains('load-more')) {
    elements.loadMoreBtn.classList.replace('load-more', 'load-more-hidden');
  }

  if (searchQuery === '') {
    Notiflix.Notify.failure('Input query to start search');
    return;
  }

  try {
    const { totalHits } = await fetchByQuery(searchQuery, page);

    if (totalHits === 0) {
      Notiflix.Notify.info(
        'Sorry, nothing was found according your serch query'
      );
      elements.loadMoreBtn.classList.add('load-more-hidden');
    } else {
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
      await fetchAndDisplay();
      if (totalHits > 40) {
        elements.loadMoreBtn.classList.replace('load-more-hidden', 'load-more');
      }
    }
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong. Try reload the page');
    console.error('There was a problem with the fetch operation:', error);
  }
}

async function handleLodaMore() {
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
}

async function fetchAndDisplay() {
  try {
    const { hits, totalHits } = await fetchByQuery(searchQuery, page);
    const markup = createMarkup(hits);
    elements.gallery.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();

    if (page * 40 >= totalHits && totalHits > 0 && page > 1) {
      elements.loadMoreBtn.classList.replace('load-more', 'load-more-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong. Try reload the page');
    console.error('There was a problem with the fetch operation:', error);
  }
}

const scrollToTopButton = document.getElementById('scrollToTopButton');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 200) {
    // показуємо кнопку, якщо прокрутили на 200px
    scrollToTopButton.classList.remove('hidden');
  } else {
    scrollToTopButton.classList.add('hidden');
  }
});

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// function handleSubmit(event) {
//   event.preventDefault();
//   searchQuery = elements.input.value;
//   page = 1;
//   elements.gallery.innerHTML = '';

//   fetchByQuery(searchQuery, page).then(({ totalHits }) => {
//     if (totalHits === 0) {
//       Notiflix.Notify.info(
//         'Sorry, nothing was found according your serch query'
//       );
//       elements.loadMoreBtn.classList.add('load-more-hidden');
//     } else {
//       Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
//       fetchAndDisplay();
//       if (totalHits > 40) {
//         elements.loadMoreBtn.classList.replace('load-more-hidden', 'load-more');
//       }
//     }
//   });
// }

// function handleLodaMore() {
//   page += 1;
//   fetchAndDisplay();
// }

// function fetchAndDisplay() {
//   fetchByQuery(searchQuery, page)
//     .then(({ hits, totalHits }) => {
//       const markup = createMarkup(hits);
//       elements.gallery.insertAdjacentHTML('beforeend', markup);
//       new SimpleLightbox('.gallery a');

//       if (page * 40 >= totalHits && totalHits > 0 && page > 1) {
//         // elements.loadMoreBtn.classList.add('load-more-hidden');
//         elements.loadMoreBtn.classList.replace('load-more', 'load-more-hidden');
//         Notiflix.Notify.info(
//           "We're sorry, but you've reached the end of search results."
//         );
//       }
//     })
//     .catch(error => {
//       Notiflix.Notify.failure('Something went wrong. Try reload the page');
//       console.error('There was a problem with the fetch operation:', error);
//     });
// }

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
