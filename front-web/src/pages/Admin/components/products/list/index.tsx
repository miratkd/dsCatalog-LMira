import Pagination from 'core/components/Pagination';
import { Category, ProductsResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../card';
import CardLoader from '../../Loader/ProductCardLoader';
import ProductsFilter from 'core/components/ProductsFilters';
import './styless.scss';


const List = () => {
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Category>();
    
    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            orderBy: 'id',
            direction: 'DESC',
            name,
            categoryId: category?.id
        }
        setIsLoading(true);
        
        makeRequest({url: '/products', params})
        .then(response => setProductsResponse(response.data))
        .then(() => {
            setIsLoading(false);
        })
    },[activePage, name, category]);

    useEffect(() => {
       getProducts();
        
    }, [getProducts]);

    
    const handleCreate = () => {
        history.push('/admin/products/create');
    }
    const handleChangeName = (name: string) => {
        setName(name);
        setActivePage(0);
    }
    const handleChangeCategory = (category: Category) => {
        setCategory(category);
        setActivePage(0);
    }
    const clearFilter = () => {
        setName('');
        setCategory(undefined);
        setActivePage(0);
    }

    const onRemove = (productId: number) => {
        const confirm = window.confirm('Deseja realmente excluir esse produto?');
        if(confirm){
            makePrivateRequest({url: `/products/${productId}`, method: 'DELETE' })
        .then(() => {
            toast.info('Produto excluido com sucesso!');
            getProducts();
        }).catch(() => {
            toast.error('Erro ao excluir produto!');
        })
        }
    }

    return(
        <div className="admin-products-list">
            <div className="admin-list-uper">
                <button className="btn btn-primary btn-lg admin-list-filter-button" onClick={handleCreate}>
                    ADICIONAR
                </button>
                
                    <ProductsFilter 
                        name={name}
                        category={category}
                        handleChangeName={handleChangeName}
                        handleChangeCategory={handleChangeCategory}
                        clearFilter={clearFilter}
                        
                    />
                
            </div>
            <div className="admin-list-container">
                {isLoading ?  <CardLoader/> : (
                    productsResponse?.content.map(product => (
                    <Card product={product} key={product.id} onRemove={onRemove}/>
                )))}
                {productsResponse && (
                    <Pagination 
                    totalPages={productsResponse.totalPages}
                    activePage = {activePage}
                    onChange={page  => setActivePage(page)}
                    />
                )}
            </div>
        </div>
    );
}

export default List;