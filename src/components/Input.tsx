import React, { memo } from 'react';
// component
import { HOCInput } from './HOCInput';
// interface
import { IHOCInputProps } from './HOCInput';

interface IInputProps extends IHOCInputProps {
    label: string;
    submited: boolean;
}

export const Input = memo((props: IInputProps & IHOCInputProps) => {

    return <div>
        <label>
            {
                props.label
            }
        </label>

        <HOCInput
            type={props.type}
            value={props.value}
            updateState={props.updateState}
            />
    </div>
});

