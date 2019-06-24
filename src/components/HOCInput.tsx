import React from 'react';

export interface IHOCInputProps {
    type: 'text' | 'email' | 'number' | 'date';
    value: any;
    updateState: (value: any, valid: boolean) => void;
}

export const HOCInput = (props: IHOCInputProps) => {
    const textValidation: (value: string) => boolean = (value) => {
        return value.length >= 20;
    }

    const emailValidation: (value: string) => boolean = (value) => {
        const atIndex = value.indexOf('@');

        if (atIndex === -1) {
            return false;
        }
        else {
            return value.substr(0, atIndex).length <= 10 && value.substr(atIndex, value.length) === '@gmail.com';
        }
    }

    const numberValidation: (value: string) => boolean = (value) => {
        const parsedValue = parseInt(value);

        return 18 <= parsedValue && parsedValue <= 60;
    }

    const DateValidation: (value: string) => boolean = (value) => {
        const inputYear = new Date(value).getUTCFullYear();

        return inputYear.toString().length === 0 ? false : Math.abs(inputYear - new Date().getUTCFullYear()) >= 18;
    }

    const onChangeHandler: (e: any) => void = (e) => {
        let validationFunction: (value: string) => boolean;
        let value = e.target.value;

        switch (props.type) {
            case 'text':
                validationFunction = textValidation;
                break;
            case 'email':
                validationFunction = emailValidation;
                break;
            case 'number':
                validationFunction = numberValidation;
                break;
            case 'date':
                validationFunction = DateValidation;
                break;
        }

        props.updateState(value, validationFunction(value));
    }


    return <input
        required
        type={props.type}
        value={props.value}
        onChange={onChangeHandler}
    />
} 