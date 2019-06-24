import React from 'react';
import { Form } from './components/Form';

class App extends React.Component {
    render() {
        return <div>
            <Form
                formSchema={
                    {
                        inputsDefinition: [
                            {
                                label: "username",
                                type: "text"
                            },
                            {
                                label: "lastname",
                                type: "text"
                            },
                            {
                                label: "email",
                                type: "email"
                            },
                            {
                                label: "phone",
                                type: "number"
                            },
                            {
                                label: "age",
                                type: "date"
                            }
                        ]
                    }
                }
                />
    </div>;
    }
}

export default App;
