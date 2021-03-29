import { Role } from 'core/types/Product';
import history from 'core/utils/history';
import { makePrivateRequest} from 'core/utils/request';
import BaseForm from 'pages/Admin/components/baseForm';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router';
import Select from 'react-select';
import { toast } from 'react-toastify';
import './styless.scss';

type formState = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: Role[];
}
type ParamsType = {
    usersId: string;
}

const options = [
    {id: '1', label: 'OPERATOR'},
    {id: '2', label: 'ADMIN'}
]

const Form = () => {
    const { register, handleSubmit, errors, setValue, control} = useForm<formState>();
    const { usersId } = useParams<ParamsType>();
    const isEditing = usersId !== 'create';

    const onSubmit = (data: formState) => {
        makePrivateRequest({
                url: isEditing ? `/users/${usersId}` : '/users',
                method: isEditing ? 'PUT' : 'POST',
                data
            }).then(() => {
                toast.info('Usuário cadastrado com sucesso!');
                history.push('/admin/users');
            }).catch(() => {
                toast.error('Erro ao salvar Usuário!');
            })
        }
    useEffect(() => {
        if (isEditing) {
            makePrivateRequest({ url: `/users/${usersId}` })
                .then(response => {
                    setValue('firstName', response.data.firstName);
                    setValue('lastName', response.data.lastName);
                    setValue('email', response.data.email);
                });
        }
    }, [usersId, isEditing, setValue])   

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={isEditing ? 'ATUALIZAR UM USUÁRIO' : 'CADASTRAR UM NOVO USUÁRIO'}>
                <div className="user-forms-containear">
                    <div className="user-forms-names">
                        <input
                            ref={register({
                                required: "Campo obrigatório.",
                                maxLength: { value: 60, message: "O campo deve ter no máximo 60 caracteres." }
                            })}
                            name="firstName"
                            type="text"
                            className="form-control input-base"
                            placeholder="Nome"
                        />
                        {errors.firstName && (
                                <div className="invalid-feedback d-block">
                                    {errors.firstName.message}
                                </div>
                        )}
                        <input
                            ref={register({
                                required: "Campo obrigatório.",
                                maxLength: { value: 60, message: "O campo deve ter no máximo 60 caracteres." }
                            })}
                            name="lastName"
                            type="text"
                            className="form-control input-base ml-5"
                            placeholder="Sobrenome"
                        />
                         {errors.lastName && (
                                <div className="invalid-feedback d-block">
                                    {errors.lastName.message}
                                </div>
                        )}
                    </div>
                    <input
                       ref={register({
                        required: "Campo obrigatório.",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Email inválido"
                          }
                        })}
                        name="email"
                        type="text"
                        className="form-control input-base mt-4"
                        placeholder="Email"
                    />
                    {errors.email && (
                            <div className="invalid-feedback d-block">
                                {errors.email.message}
                            </div>
                    )}
                    <div className="user-forms-password">
                        <input
                            ref={register({
                                required: "Campo obrigatório.",
                                maxLength: { value: 60, message: "O campo deve ter no máximo 60 caracteres." }
                            })}
                            name='password'
                            type="password"
                            className="form-control input-base "
                            placeholder= {isEditing ? "Nova senha" : "Senha"}
                        />
                        {errors.password && (
                            <div className="invalid-feedback d-block">
                                {errors.password.message}
                            </div>
                        )}
                    </div>
                    <div className="user-forms-password">
                        <Controller
                        as={Select}
                        control={control}
                        rules={{required: "Campo obrigatorio"}} 
                        name="roles"
                        options={options}
                        isMulti
                        getva
                        />
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}
export default Form;