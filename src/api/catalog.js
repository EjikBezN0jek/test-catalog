import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nlstar.com/api/catalog3/v1/',
});

export const fetchCityById = async id => {
  try {
    const { data } = await api.get('city/', { params: { id: id } });
    return data.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchCities = async city => {
  try {
    const { data } = await api.get('city/', { params: { term: city, country: 'ru' } });
    return data.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchAllCategories = async id => {
  try {
    const { data } = await api.get('menutags/', { params: { city_id: id } });
    return data.tags;
  } catch (e) {
    console.log(e);
  }
};
