import './styless.scss';
import { ReactComponent as SearchIcon } from 'core/assets/images/Union.svg';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { makeRequest } from 'core/utils/request';
import { Category } from 'core/types/Product';


type Props ={
    name?: string;
    handleChangeName: (name: string) => void;
    category?: Category;
    handleChangeCategory: (category: Category) => void;
    clearFilter: () => void;
}

const ProductsFilter = ({name, handleChangeName, category, handleChangeCategory, clearFilter}: Props) => {
    const [categories, setCategories] = useState<Category[]>();
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    

    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({ url: '/categories' })
            .then(response => setCategories(response.data.content))
            .finally(() => {
                setIsLoadingCategories(false);
            })
    }, []);

    

    return (
        <div className="card-base products-filter-container">
            <div className="input-search">
                <input
                    type="text"
                    value={name}
                    className="form-control "
                    placeholder="Pesquisar Produto"
                    onChange={event =>handleChangeName(event.target.value)}
                />
                <SearchIcon />
            </div>
            <Select
                name="categories"
                key={`select-${category?.id}`}
                value={category}
                isLoading={isLoadingCategories}
                className="filter-select-conteiner"
                classNamePrefix="products-categories-select"
                options={categories}
                getOptionLabel={(option: Category) => option.name}
                getOptionValue={(option: Category) => String(option.id)}
                placeholder={"categorias"}
                onChange={value => handleChangeCategory(value as Category)}
                isClearable
            />
            <button 
            className="btn btn-outline-secondary border-radius-10"
            onClick={clearFilter}
            >
                <strong>Limpar filtro</strong>
            </button>
        </div>
    )
}
export default ProductsFilter;