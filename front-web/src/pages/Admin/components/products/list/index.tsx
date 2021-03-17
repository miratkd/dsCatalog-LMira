import Pagination from 'core/components/Pagination';
import { ProductsResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';

import React, { useEffect, useState, useCallback } from 'react';
import { useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../card';


const List = () => {
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    console.log(productsResponse);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            orderBy: 'id',
            direction: 'DESC'
        }

        
        makeRequest({url: '/products', params})
        .then(response => setProductsResponse(response.data))
    },[activePage]);

    useEffect(() => {
       getProducts();
        
    }, [getProducts]);

    
    const handleCreate = () => {
        history.push('/admin/products/create');
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
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>
            <div className="admin-list-container">
                {productsResponse?.content.map(product => (
                    <Card product={product} key={product.id} onRemove={onRemove}/>
                ))}
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