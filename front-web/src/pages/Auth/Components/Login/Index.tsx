import ButtonIcon from 'core/components/ButtonIcon';
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthCard from '../Card';
import './styles.scss';

type FormData = {
    email : string;
    password : string;
}

const Login = () => {
    const { register, handleSubmit } = useForm<FormData>(); 

    const onSubmit = (data : FormData) => {
        console.log(data);
    }

    return (
        <AuthCard title="Login">
            <form className="login-form " onSubmit={handleSubmit(onSubmit)}>
                <input 
                type="email"
                className="form-control input-base margin-botton-30"
                placeholder="email"
                name="email" 
                ref={register}/>
                <input 
                type="password"
                className="form-control input-base"
                placeholder="senha"
                name="password"
                ref={register}/>
                <Link to="/admin/auth/recover" className="login-recover-link">
                    Esqueci a senha?
                </Link>
                <div className="login-submit">
                    <ButtonIcon text="Logar"/>
                </div>
                <div className="text-center">
                    <span className="not-registered">
                        Não tem Cadastro?
                    </span>
                    <Link to="/admin/auth/register" className="login-register-link">
                        CADASTRAR
                    </Link>
                </div>
            </form>
        </AuthCard>
    )
}

export default Login;