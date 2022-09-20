import React from 'react';
import { Provider } from './FormContext';
import Form from './Form';
import { Password } from 'simple-body-validator';


export default () => {

    const data = {
        email: '',
        password: '',
        profile: {
            firstName: '',
            lastName: '',
            addresses: [
                {
                    street: '',
                    city: '',
                    zipCode: '',
                }
            ]
        }
    };

    const rules = {
        email: 'required|email',
        password: [ 'required', Password.default() ],
        profile: {
            firstName: 'required|string|min:3|max:30',
            lastName: 'required|string|min:3|max:30',
            addresses: 'required|array|min:1',
            'addresses.*': 'object',
            'addresses.*.street': 'required|string|min:5|max:255',
            'addresses.*.city': [
                'required_without:profile.addresses.*.zipCode',
                'string', 'min:5', 'max:255'
            ],
            'addresses.*.zipCode': [
                'required_without:profile.addresses.*.city', 'digits:5'
            ],
        }
    };

    return (
        <div>
            <Provider initialData={data} rules={rules}>
                <Form />
            </Provider>
        </div>
    );
};
    