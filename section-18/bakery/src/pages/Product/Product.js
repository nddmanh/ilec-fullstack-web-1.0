import React, { useEffect, useState } from 'react';
import FeatureProduct from '../../components/FeatureProduct';
import { get } from '../../services/http';

export default function Product(props) {
  const [products, setProducts] = useState([]);

  useEffect( async () => {
    try {
      const params = new URLSearchParams(props.location.search);
      const categoryQuery = params.get('category');

      const categoryResponse = await get(`/categories?title=${encodeURIComponent(categoryQuery)}`);

      if (categoryResponse && categoryResponse.data && categoryResponse.data[0]) {
        const category = categoryResponse.data[0];

        const productResponse = await get(`/products?category=${category._id}&limit=6`);
        setProducts( productResponse.data );
      }
    } catch (err) {
      //
    }
  }, [props.location.search])

  return (
    <div>
      <FeatureProduct title='Products' products={products}/>
    </div>
  )
  
}