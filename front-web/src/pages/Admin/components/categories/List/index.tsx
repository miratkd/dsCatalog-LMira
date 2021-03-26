import { useCallback, useEffect, useState } from "react";
import {makeRequest} from 'core/utils/request';
import CategorieFilter from "../components/CategorieFilter";
import { CategoriesResponse } from "core/types/Product";
import Card from "../components/Card";
import Pagination from "core/components/Pagination";

const List = () => {
    const [activePage, setActivePage] = useState(0);
    const [productsResponse, setProductsResponse] = useState<CategoriesResponse>();
    const [name, setName] = useState('');
    const [orderByDirection, setOrderByDirection] = useState('ASC');

    const handleCreate= () => {

    }

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
                        <Card categorie={category}/>
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