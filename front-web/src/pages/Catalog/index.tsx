import React from 'react';
import ProductCard from './components/productCard';
import './styles.scss';

const Catalog = () => (
     <div className="catalog-container">
        <h1 className="catalog-title">
            catálogos de produtos
        </h1>
        <div className="catalog-products">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </div>
        
     </div>
);

export default Catalog;