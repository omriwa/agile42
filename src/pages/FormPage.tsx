import React, { memo } from 'react';
// component
import { Form, IFormProps } from '../components/Form';

export const FormPage = memo((props: IFormProps) => {
    return <div>
        <Form
            {...props}
        />
    </div>;
});