import axios from 'axios';

const ACCESS_KEY = '327ERrtbPeDWNlodkdWlZZwmmQhHdfT2ZcRwwRNsY88';

const fetchImages = async (searchQuery, page = 1) => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    params: {
      query: searchQuery,
      page: page,
      per_page: 12,
      client_id: ACCESS_KEY,
    },
  });

  return response.data;
};

export default fetchImages;
