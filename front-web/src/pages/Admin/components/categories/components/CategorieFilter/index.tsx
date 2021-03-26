import './styless.scss';
import { ReactComponent as Image } from 'core/assets/images/Union.svg';
import Select from 'react-select';

type Props = {
    name: string;
    handleChangeName: (name: string) => void;
    cleanFielter: () => void;
    changeOrder: (order: string) => void;
}
const options = [
    { value: 'ASC', label: 'Filtrar por antigo'},
    { value: 'DESC', label: 'Filtrar por recente'}
  ]
const CategorieFilter = ({name, handleChangeName, changeOrder, cleanFielter}:Props) => {
    return(
        <div className="card-base categorie-filter-containear">
            <div className="categorie-filter-input-name">
                <input 
                    type="text"
                    value={name}
                    className="form-control"
                    placeholder="Pesquisar Categoria"
                    onChange={event => handleChangeName(event.target.value)}
                />
                <Image/>
            </div>
            <div className="categorie-filter-orderby">
                <Select
                    options={options}
                    className='react-select-container'
                    classNamePrefix="react-select"
                    placeholder='ordenar resultado'
                    onChange={event => changeOrder(event?.value as string)}
                />
            </div>
            <button className=" categorie-filter-button" onClick={cleanFielter}>
                Limpar Filtro
            </button>
        </div>
    )
}

export default CategorieFilter;