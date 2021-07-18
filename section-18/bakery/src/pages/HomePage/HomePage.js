import React, { useEffect, useState } from 'react';
import Banner from './components/Banner';
import FeatureProduct from '../../components/FeatureProduct';
import { get } from '../../services/http';

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect( async() => {
    const productResponse = await get('/products?limit=6');
    setProducts(productResponse.data);
  }, [])

  return (
    <div>
      <Banner />
      <FeatureProduct title='Featured products' products={products}/>
    </div>
  )
  
}