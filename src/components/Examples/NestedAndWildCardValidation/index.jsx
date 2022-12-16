import React from 'react';
import { Provider } from './FormContext';
import Form from './Form';
import { Password, ruleIn } from 'simple-body-validator';


export default () => {

    const data = {
        email: '',
        password: '',
        profile: {
            firstName: '',
            lastName: '',
            gender: '',
            socialPlatforms: [],
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
            gender: [
                'required', ruleIn(['Female', 'Male', 'Other'])
            ],
            socialPlatforms: 'bail|array|min:2|max:4',
            'socialPlatforms.*': ruleIn(['Facebook', 'Instagram', 'Linkedin', 'Twitter']),
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

    const customMessages = {
        socialPlatforms: {
            min: 'You must at least select :min platforms.'
        }
    };

    return (
        <div>
            <Provider initialData={data} rules={rules} customMessages={customMessages}>
                <Form />
            </Provider>
        </div>
    );
};
    