import { makePrivateRequest } from 'core/utils/request';
import React from 'react';
import {  useForm } from 'react-hook-form';
import BaseForm from '../../baseForm';
import './styles.scss';

type formState = {
    name: string;
    price: string;
    description: string;
    imgUrl: string;
}


const Form = () => {
    const {register, handleSubmit, errors} = useForm<formState>();
    

    

    const onSubmit = (data: formState) => {
        console.log(data);
        
       
       // makePrivateRequest({url: '/products' , method: 'POST', data})
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="CADASTRAR UM PRODUTO">
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