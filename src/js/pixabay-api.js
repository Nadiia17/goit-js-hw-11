const KEY = '39127781-8cd971fbdb6972a131015afc7';
const URL = 'https://pixabay.com/api/';

function fetchByQuery(query) {
  const params = new URLSearchParams({
    key: KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`${URL}?${params}`)
    .then(response => response.json())
    .then(data => data.hits);
}

export { fetchByQuery };
