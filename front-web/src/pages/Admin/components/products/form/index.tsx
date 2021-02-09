import { makeRequest } from 'core/utils/request';
import React, { useState } from 'react';
import BaseForm from '../../baseForm';
import './styles.scss';

type formState = {
    name: string;
    price: string;
    category: number;
    description: string
}

type FormEvent = React.ChangeEvent<HTMLInputElement |HTMLSelectElement |HTMLTextAreaElement>;


const Form = () => {

    const [formData, setFormData] = useState<formState>({
        name:'',
        price:'',
        category: 1,
        description:''
    });

    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({ ...data, [name]: value}));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://www.techinn.com/f/13777/137776929/microsoft-xbox-series-x-1tb.jpg',
            categories: [{id: formData.category}]
        }
       
        makeRequest({url: '/products' , method: 'POST', data: payload})
    }

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="CADASTRAR UM PRODUTO">
                <div className="row">
                    <div className="col-6">
                        <input
                            name="name"
                            value={formData.name}
                            type="text"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            placeholder="Nome do produto"
                        />
                        <input
                            type="text"
                            value={formData.price}
                            className="form-control"
                            name="price"
                            onChange={handleOnChange}
                            placeholder="Preço"
                        />
                        <select  
                        className="form-control mt-5"
                        name="category" 
                        value={formData.category}
                        onChange={handleOnChange}>
                            <option value="1">Livros</option>
                            <option value="3">Computadores</option>
                            <option value="2">Eletronicos</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <textarea 
                        name="description" 
                        value={formData.description}
                        className="form-control"
                        cols={30} 
                        rows={10}
                        onChange={handleOnChange}
                         />
                    </div>
                </div>

            </BaseForm>
        </form>
    );
}

export default Form;