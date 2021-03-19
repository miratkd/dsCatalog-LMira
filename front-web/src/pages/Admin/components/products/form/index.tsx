import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { useEffect, useState } from 'react';
import {  useForm, Controller} from 'react-hook-form';
import BaseForm from '../../baseForm';
import { toast } from 'react-toastify';
import './styles.scss';
import { useHistory, useParams } from 'react-router';
import Select from 'react-select';
import { Category } from 'core/types/Product';
import PriceField from './priceField';


export type formState = {
    name: string;
    price: string;
    description: string;
    imgUrl: string;
    categories: Category[];
}
type ParamsType = {
    productsId: string;
}


const Form = () => {
    const {register, handleSubmit, errors, setValue, control} = useForm<formState>();
    const history = useHistory();
    const { productsId } = useParams<ParamsType>();
    const isEditing = productsId !== 'create';
    const [categories, setCategories] = useState<Category[]>();
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    useEffect(() => {
        if(isEditing){
                makeRequest({ url: `/products/${productsId}` })
            .then(response => {
                setValue('name', response.data.name);
                setValue('price', response.data.price);
                setValue('description', response.data.description);
                setValue('imgUrl', response.data.imgUrl);
                setValue('categories', response.data.categories)
            });
        }
    }, [productsId, isEditing, setValue])

    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({ url: '/categories'})
        .then(response => setCategories(response.data.content))
        .finally(() => {
            setIsLoadingCategories(false);
        })
    }, []);

    const onSubmit = (data: formState) => {
       makePrivateRequest({
           url: isEditing ? `/products/${productsId}` : '/products', 
           method: isEditing ? 'PUT' : 'POST',
           data
        })
       .then(() => {
           toast.info('Produto cadastrado com sucesso!');
           history.push('/admin/products');
       }).catch(() => {
           toast.error('Erro ao salvar produto!');
       })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={isEditing ? 'ATUALIZAR UM PRODUTO' : 'CADASTRAR UM PRODUTO'}>
                <div className="row">
                    <div className="col-6">
                        <div className="margin-botton-30">
                            <input
                                ref={register({
                                    required: "Campo obrigatório.",
                                    minLength: {value: 5, message: "O campo deve ter no mínimo 5 caracteres."},
                                    maxLength: {value: 60, message:"O campo deve ter no máximo 60 caracteres."}
                                })}
                                name="name"
                                type="text"
                                className="form-control  input-base"
                                placeholder="Nome do produto"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-botton-30">
                            <Controller
                                name="categories"
                                rules={{required: true}}
                                control={control}
                                as={Select} 
                                defaultValue=""
                                isLoading={isLoadingCategories}
                                classNamePrefix="categories-select"
                                options={categories}
                                getOptionLabel={(option: Category) => option.name}
                                getOptionValue={(option: Category) => String(option.id)} 
                                isMulti
                                placeholder={"categorias"} 
                            />
                            {errors.categories && (
                                <div className="invalid-feedback d-block">
                                    Campo obrigatório.
                                </div>
                            )}
                        </div>
                        <div className="margin-botton-30">
                            <PriceField control={control}/>
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>
                        <div>
                            <input
                                ref={register({required: "Campo obrigatório."})}
                                name="imgUrl"
                                type="text"
                                className="form-control  input-base"
                                placeholder="image"
                            />
                            {errors.imgUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-6">
                        <textarea 
                        ref={register({required: "Campo obrigatório."})}
                        name="description" 
                        placeholder="Descição"
                        className="form-control input-base"
                        cols={30} 
                        rows={10}
                         />
                         {errors.description && (
                                <div className="invalid-feedback d-block">
                                    {errors.description.message}
                                </div>
                            )}
                    </div>
                </div>

            </BaseForm>
        </form>
    );
}

export default Form;