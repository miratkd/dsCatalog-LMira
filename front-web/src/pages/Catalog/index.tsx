import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {  Category, ProductsResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import ProductCard from './components/productCard';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import './styles.scss';
import Pagination from 'core/components/Pagination';
import ProductsFilter from 'core/components/ProductsFilters';

const Catalog = () => {

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name, setName] = useState(''); 
    const [category, setCategory] = useState<Category>();   
    

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 12,
            name,
            categoryId: category?.id
        }

        setIsLoading(true);
        makeRequest({url: '/products', params})
        .then(response => setProductsResponse(response.data))
        .finally(() => {
            setIsLoading(false);
        })
    }, [activePage, name, category]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleChangeName = (name: string) =>{
        setName(name);
        setActivePage(0);
    }
    const handleChangeCategory = (category: Category) =>{
        setCategory(category);
        setActivePage(0);
    }
    const clearFilter = () => {
        setCategory(undefined);
        setName('');
        setActivePage(0);
    }

    return (
        <div className="catalog-container">
           <div className="filter-container">
                <h1 className="catalog-title">
                    catálogos de produtos
                </h1>
                <ProductsFilter 
                name={name}
                category={category}
                handleChangeCategory={handleChangeCategory}
                handleChangeName={handleChangeName}
                clearFilter={clearFilter}
                />
           </div>
           <div className="catalog-products">
               {isLoading ? 
               <ProductCardLoader/> 
               :
                (productsResponse?.content.map(product => (
                   <Link to={`/products/${product.id}`} key={product.id}>
                       <ProductCard product={product} />
                    </Link>
               )))}
           </div>
           {productsResponse && (
           <Pagination 
           totalPages={productsResponse.totalPages}
           activePage = {activePage}
           onChange={page  => setActivePage(page)}
           />
           )}
        </div>
   )
};

export default Catalog;