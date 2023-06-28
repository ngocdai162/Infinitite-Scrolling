import React, { useEffect, useState } from 'react'
import { ProductType } from '../Type';
import { Product } from '../component/Product';

const PAGE_SIZE = 20;
export const  Products = () => {
  const [products, setProducts] =  useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  useEffect(()=> {
    fetchByValue();
  },[searchValue])

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    fetchProducts();
  };

  const fetchProducts = async() => {
    setIsLoading(true)
    try {
      const response = await  fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${products.length}`)
      const json = await response.json();
      setProducts([...products,...json.products])
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false);
    }
  }

  const fetchByValue = async () => {
    try {
      const response = await  fetch(`https://dummyjson.com/products/search?q=${searchValue}&limit=${PAGE_SIZE}`)
      const json = await response.json();
      setProducts([...json.products])
    } catch (error) {
      console.log('error', error)
    } 
  }

  return (
    <div className='products'>
        <h1>Products</h1>
        <input 
         className='products__search'
         placeholder='Type here to search' 
         value={searchValue}
         onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className='products__container'>
           {products && products.map((item : ProductType)=> 
           <div style={{width: products.length < 4 ? '260px' : '10%'}}>
             <Product 
               title = {item.title}
               price ={item.price}
               thumbnail = {item.thumbnail}
            />
           </div>
           )}
           {isLoading && <p>Loading...</p>}
        </div>
    </div>
  )
}
