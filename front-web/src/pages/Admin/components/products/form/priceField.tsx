import { Control, Controller } from "react-hook-form";
import CurrencyInput from 'react-currency-input-field';
import {formState} from './';

type Props = {
    control: Control<formState>
}

const PriceField = ({control}: Props) => (
    <Controller
        control={control}
        defaultValue=""
        rules={{required: "Campo obrigatório."}}
        name="price"
        render={({value, onChange}) => (
            <CurrencyInput
                placeholder="Preço"
                className="form-control input-base"
                value={value}
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                onValueChange={onChange}
            />
        )}
    />
);

export default PriceField;