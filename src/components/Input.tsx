import React, { memo, ChangeEvent } from 'react';
// style
import { Label, InputStyledComponent } from './FormStyle';

export interface IInputData {
    type: 'text' | 'email' | 'number' | 'date';
    value: any;
}

interface IInputFunctions {
    updateValue: (value: any) => void;
}

interface IInputProps extends IInputData, IInputFunctions {
    label: string;
    show: boolean;
}

export const Input = memo((props: IInputProps) => {
    const onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => props.updateValue(e.target.value);

    return props.show
        ?
        < div >
            <Label
            >
                {
                    props.label
                }
            </Label>

            <InputStyledComponent
                type={props.type}
                value={props.value}
                onChange={onChange}
            />
        </div>
        :
        null;
});

