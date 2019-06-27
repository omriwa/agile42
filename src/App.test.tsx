import React from 'react'
import {
    render,
    cleanup,
    fireEvent
} from '@testing-library/react';
import 'jest-dom/extend-expect';
import ReactDOM from 'react-dom';
// component
import App from './App';
import { Form } from './components/Form';

afterEach(cleanup)

it('app renders without crashing', () => {
    render(<App />);
});

it('render inputs and labels and validate it', () => {
    const formSchema: any = {
        inputsDefinition: [
            {
                label: "username",
                type: "text"
            }
        ]
    };
    const FormComponent = render(<Form formSchema={formSchema} successUrl='/' />);
    // rendering inputs and labels
    const input = document.getElementsByTagName('input')[0];
    expect(FormComponent.getByText(formSchema.inputsDefinition[0].label));
    expect(input.getAttribute('type')).toBe(formSchema.inputsDefinition[0].type);
    // validating
    fireEvent.change(input, { target: { value: '123456789123456789123' } });
    fireEvent.click(document.getElementsByTagName('button')[0]);
    expect(FormComponent.container.getElementsByTagName('div')[0]).toBeTruthy();
    fireEvent.change(input, { target: { value: 'aaaaa' } });
    fireEvent.click(document.getElementsByTagName('button')[0]);
    expect(FormComponent.container.getElementsByTagName('div')[0]).toBeFalsy();
});
