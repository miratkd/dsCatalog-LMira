import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect } from 'react';
import {  useForm } from 'react-hook-form';
import BaseForm from '../../baseForm';
import { toast } from 'react-toastify';
import './styles.scss';
import { useHistory, useParams } from 'react-router';

type formState = {
    name: string;
    price: string;
    description: string;
    imgUrl: string;
}
type ParamsType = {
    productsId: string;
}

const Form = () => {
    const {register, handleSubmit, errors, setValue} = useForm<formState>();
    const history = useHistory();
    const { productsId } = useParams<ParamsType>();
    const isEditing = productsId !== 'create';
    useEffect(() => {
        if(isEditing){
                makeRequest({ url: `/products/${productsId}` })
            .then(response => {
                setValue('name', response.data.name);
                setValue('price', response.data.price);
                setValue('description', response.data.description);
                setValue('imgUrl', response.data.imgUrl);
            });
        }
    }, [productsId, isEditing, setValue])

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
                            <input
                                ref={register({required: "Campo obrigatório."})}
                                type="number"
                                className="form-control input-base"
                                name="price"
                                placeholder="Preço"
                            />
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