import { Link } from 'react-router-dom';
import {Category} from  'core/types/Product';
import './styless.scss';

type Props = {
    categorie: Category;
    onRemove: (id: number) => void;
}

const Card = ({categorie, onRemove}: Props) => {
    return(
        <div className="card-base categorie-card-containear">
            <div className="categorie-card-title">
                {categorie?.name}
            </div>
            <div className="buttons-categories-containear">
                    <Link to={`/admin/categories/${categorie?.id}`}
                        type="button" 
                        className="btn btn-outline-secondary border-radius-10 btn-product"
                    >
                        EDITAR
                    </Link>
                    <button 
                        type="button" 
                        className="btn btn-outline-danger border-radius-10 btn-product"
                        onClick={() => onRemove(categorie.id)}
                    >
                        EXCLUIR
                    </button>
                </div>
        </div>
    )
}
export default Card;