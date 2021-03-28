import Pagination from "core/components/Pagination";
import { UserResponse } from "core/types/Product";
import history from "core/utils/history";
import { makePrivateRequest } from "core/utils/request";
import CategorieFilter from "pages/Admin/components/categories/components/CategorieFilter";
import { useCallback, useEffect, useState } from "react";
import Card from "../Card";
import './styless.scss';

const List = () => {
    const [name, setName] = useState('');
    const [orderByDirection, setOrderByDirection] = useState('ASC');
    const [activePage, setActivePage] = useState(0);
    const [userResponse, setUserResponse] = useState<UserResponse>();

    const getUsers = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 6,
            orderBy: 'id',
            direction: orderByDirection,
        }
        //setIsLoading(true);
        makePrivateRequest({url: '/users', params})
        .then(response => setUserResponse(response.data))
        //.finally(() => {setIsLoading(false)})
        

    },[activePage, orderByDirection]
    );
    useEffect(() => {
        getUsers();
         
     }, [getUsers]);

    const handleCreate= () => {
        history.push('/admin/users/create');
    }
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
        <div className="admin-users-containear">
            <div className="admin-user-upper">
                <button className="btn btn-primary btn-lg admin-list-filter-button" onClick={handleCreate}>
                    ADICIONAR
                </button>
                <CategorieFilter 
                name={name} 
                handleChangeName={handleChangeName} 
                changeOrder={changeOrder} 
                cleanFielter={cleanFilter} />
            </div>
            {userResponse?.content.map(
                user => (
                    <Card user={user}/>
                )
            )}
            <Pagination totalPages={userResponse?.totalPages as number}
            activePage={activePage}
            onChange={page => setActivePage(page)}/>
        </div>
    )
}
export default List;