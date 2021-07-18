import { useState, useEffect } from 'react';
import { get } from '../services/http';

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      async function fetchData() {
        const categoryResponse = await get('/categories');
        setCategories(categoryResponse.data);
      }

      fetchData();
    } catch (err) {
      //
    }
  }, []);

  return categories;
}