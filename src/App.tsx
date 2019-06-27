import React from 'react';
// router
import { BrowserRouter as Router, Route } from "react-router-dom";
// pages
import { FormPage } from './pages/FormPage';
import { SuccessPage } from './pages/SuccessPage';


const App = () => {
    const formSuccessUrl = '/success';
    const formSchema: any = {
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
                label: "weight",
                type: "number"
            },
            {
                label: "age",
                type: "date"
            }
        ]
    };

    return <Router>
        <Route
            path='/'
            component={() => <FormPage formSchema={formSchema} successUrl={formSuccessUrl} />}
            exact
        />
        <Route
            path={formSuccessUrl}
            component={SuccessPage}
        />
    </Router>;
}

export default App;
