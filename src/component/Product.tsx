import React from 'react'
import { ProductType } from '../Type'

export const  Product = ({title, price, thumbnail} : ProductType) => {
  return (
    <div className='product'>
        <div className='product__img'>
          <img className='product__img__detail' src={thumbnail}/>
        </div>
        <div>
          <p className='product__title'>{title}</p>
          <p className='product__price'>Price : {price}</p>
        </div>
    </div>
  )
}
