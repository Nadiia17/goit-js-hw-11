// import axios from 'axios';

// const API_KEY =
//   'live_zh0WpO6FOOvie5Gdzq7CY7JEt54XDfBr1sP2gRHbFWYN4AUnzT7HpTDH5XZmz8Yq';
// axios.defaults.headers.common['x-api-key'] = API_KEY;

const KEY = '39127781-8cd971fbdb6972a131015afc7';
const URL = 'https://pixabay.com/api/';

function fetchByQuery(query, currentPage = '1') {
  const params = new URLSearchParams({
    key: KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: currentPage,
  });

  return fetch(`${URL}?${params}`)
    .then(response => response.json())
    .then(data => ({
      hits: data.hits,
      totalHits: data.totalHits,
    }));
}

export { fetchByQuery };
