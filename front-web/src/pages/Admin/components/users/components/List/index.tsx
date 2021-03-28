import Pagination from "core/components/Pagination";
import { UserResponse } from "core/types/Product";
import history from "core/utils/history";
import { makePrivateRequest } from "core/utils/request";
import CategorieFilter from "pages/Admin/components/categories/components/CategorieFilter";
import CardLoader from "pages/Admin/components/Loader/ProductCardLoader";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Card from "../Card";
import './styless.scss';

const List = () => {
    const [name, setName] = useState('');
    const [orderByDirection, setOrderByDirection] = useState('ASC');
    const [activePage, setActivePage] = useState(0);
    const [userResponse, setUserResponse] = useState<UserResponse>();
    const [isLoading, setIsLoading] = useState(false);

    const getUsers = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 6,
            orderBy: 'id',
            direction: orderByDirection,
        }
        setIsLoading(true);
        makePrivateRequest({url: '/users', params})
        .then(response => setUserResponse(response.data))
        .finally(() => {setIsLoading(false)})
        

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
     const remove = (id: number) => {
        const confirm = window.confirm('Deseja realmente excluir esse produto?');
        if(confirm){
            makePrivateRequest({url: `/users/${id}`, method: 'DELETE' })
            .then(() => {
                toast.info('Usuário excluido com sucesso!');
                getUsers();
            }).catch(() => {
                toast.error('Erro ao excluir usuário!');
            })
        }
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
            {isLoading ? <CardLoader/> : userResponse?.content.map(user => 
                    (
                        <Card user={user} onRemove={remove}/>
                    )
                    )}
            <Pagination totalPages={userResponse?.totalPages as number}
            activePage={activePage}
            onChange={page => setActivePage(page)}/>
        </div>
    )
}
export default List;