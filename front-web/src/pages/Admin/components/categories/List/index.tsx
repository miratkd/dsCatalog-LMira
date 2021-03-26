import { useCallback, useEffect, useState } from "react";
import {makePrivateRequest, makeRequest} from 'core/utils/request';
import CategorieFilter from "../components/CategorieFilter";
import { CategoriesResponse } from "core/types/Product";
import Card from "../components/Card";
import Pagination from "core/components/Pagination";
import history from "core/utils/history";
import { toast } from "react-toastify";

const List = () => {
    const [activePage, setActivePage] = useState(0);
    const [productsResponse, setProductsResponse] = useState<CategoriesResponse>();
    const [name, setName] = useState('');
    const [orderByDirection, setOrderByDirection] = useState('ASC');

    const getCategories = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 8,
            orderBy: 'id',
            direction: orderByDirection,
        }
        makeRequest({url: '/categories', params})
        .then(response => setProductsResponse(response.data))
        

    },[activePage, orderByDirection]
    );

    useEffect(() => {
        getCategories();
         
     }, [getCategories]);

     const handleChangeName = (name: string) => {
        setName(name);
     }
     const cleanFilter = () => {
         setName('');
         setOrderByDirection('ASC');
     }
     const changeOrder = (order: string) => {
         setOrderByDirection(order);
     }
     const handleCreate= () => {
        history.push('/admin/categories/create');
    }
    const remove = (id: number) => {
        const confirm = window.confirm('Deseja realmente excluir esse produto?');
        if(confirm){
            makePrivateRequest({url: `/categories/${id}`, method: 'DELETE' })
            .then(() => {
                toast.info('Produto excluido com sucesso!');
                getCategories();
            }).catch(() => {
                toast.error('Erro ao excluir produto!');
            })
        }
    }

    return (
        <div className="categories-list-containear">
            <div className="admin-list-uper">
                <button className="btn btn-primary btn-lg admin-list-filter-button" onClick={handleCreate}>
                    ADICIONAR
                </button>
                    <CategorieFilter
                        name={name}
                        handleChangeName={handleChangeName}
                        cleanFielter={cleanFilter}
                        changeOrder={changeOrder}
                    />
            </div>
            <div>
                {productsResponse?.content.map(category => 
                    (
                        <Card categorie={category} onRemove={remove}/>
                    )
                    )}
            </div>
            <Pagination totalPages={productsResponse?.totalPages as number}
            activePage={activePage}
            onChange={page => setActivePage(page)}/>
        </div>
    )
}
export default List;