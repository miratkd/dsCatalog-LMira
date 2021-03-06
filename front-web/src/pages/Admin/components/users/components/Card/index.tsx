import { User } from 'core/types/Product';
import { Link } from 'react-router-dom';
import './styless.scss';

type Props = {
    user: User;
    onRemove: (id: number) => void;
}

const Card = ({user, onRemove}:Props) => {
    return(
        <div className="card-base user-card-containear">
            <div className="user-card-text">
                <div className="user-card-title">
                    {user.firstName}
                </div>
                <div className="user-card-email">
                    {user.email}
                </div>
            </div>
            <div className="buttons-users-containear">
                    <Link to={`/admin/users/${user?.id}`}
                        type="button" 
                        className="btn btn-outline-secondary border-radius-10 btn-users"
                    >
                        EDITAR
                    </Link>
                    <button 
                        type="button" 
                        className="btn btn-outline-danger border-radius-10 btn-users"
                        onClick={() => onRemove(user.id)}
                    >
                        EXCLUIR
                    </button>
                </div>
        </div>
    )
}
export default Card;