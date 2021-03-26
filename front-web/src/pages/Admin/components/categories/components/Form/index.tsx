import history from 'core/utils/history';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import BaseForm from 'pages/Admin/components/baseForm';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import './styless.scss';

type ParamsType = {
    productsId: string;
}
export type formState = {
    name: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue, control } = useForm<formState>();
    const { productsId } = useParams<ParamsType>();
    const isEditing = productsId !== 'create';
    const onSubmit = (data: formState) => {
    makePrivateRequest({
            url: isEditing ? `/categories/${productsId}` : '/categories',
            method: isEditing ? 'PUT' : 'POST',
            data
        }).then(() => {
            toast.info('Produto cadastrado com sucesso!');
            history.push('/admin/categories');
        }).catch(() => {
            toast.error('Erro ao salvar produto!');
        })
    }
    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/categories/${productsId}` })
                .then(response => {
                    setValue('name', response.data.name);
                });
        }
    }, [productsId, isEditing, setValue])

    return(
        
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={isEditing ? 'editar uma categoria' : 'criar uma categoria'}>
            
                <input 
                className="form-control categories-form-input"
                placeholder="Nome"
                name="name"
                type="text"
                ref={register({
                    required: "Campo obrigatório."
                })}
                /> 
                {errors.name && (
                    <div className="invalid-feedback d-block">
                        {errors.name.message}
                    </div>
                )}         
           
            </BaseForm>
        </form>
      
    )
}
export default Form;