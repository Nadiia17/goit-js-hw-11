import axios from 'axios';

const KEY = '39127781-8cd971fbdb6972a131015afc7';
const URL = 'https://pixabay.com/api/';

async function fetchByQuery(query, currentPage = '1') {
  try {
    const params = {
      key: KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: currentPage,
    };

    const response = await axios.get(URL, { params });
    const data = response.data;
    return {
      hits: data.hits,
      totalHits: data.totalHits,
    };
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export { fetchByQuery };
