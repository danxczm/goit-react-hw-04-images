import axios from 'axios';

export const fetchData = (searchQuery, page) => {
  const API_KEY = '17779447-e69189bbb9578e7ff1877c42f';
  const BASE_URL = 'https://pixabay.com/api/';

  return axios.get(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
