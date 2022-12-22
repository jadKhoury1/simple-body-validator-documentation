import React,{ createContext, useReducer, useState } from 'react';
import { make, ErrorBag} from 'simple-body-validator'; 
import clonedeep from 'lodash.clonedeep';
import set from 'lodash.set';



const formReducer = (state, action) => {
    let updatedState = clonedeep(state);
    switch(action.type) {
        case 'add_platform':
            updatedState.profile.socialPlatforms.push(action.payload);
            return updatedState;
        case 'remove_platform':
            updatedState.profile.socialPlatforms.splice(updatedState.profile.socialPlatforms.indexOf(action.payload));
            return updatedState;
        case 'add_address': 
            updatedState.profile.addresses.push(action.payload);
            return updatedState;
        case 'remove_address': 
            updatedState.profile.addresses.pop();
            return updatedState;
        case 'handle_change': 
            const { path, value } = action.payload;
            set(updatedState, path, value);
            return updatedState;
        default:
            return state;
    }   
};

const Context = createContext();

const Provider = ({ children, initialData, rules, customMessages = {} }) => {
    
    const validator = make(initialData, rules, customMessages);
    const [ data, dispatch ] = useReducer(formReducer, initialData);
    const [ errors, setErrors] = useState(new ErrorBag());

    const addAddress = event => {
        event.preventDefault();
        dispatch({ type: 'add_address', payload: {
            street: '',
            city: '',
            zipCode: '',
        }});
    };
    
    const removeAddress =  event => {
        event.preventDefault();
        // Remove the errors related to the address fields
        errors.forgetAll(`profile.addresses.${data.profile.addresses.length - 1}`);
        dispatch({ type: 'remove_address' });
    };
    
    const handleChange =  ({ target: { name, value, type, checked }}) => {
    
        if (type === 'checkbox') {
            checked ? dispatch({ type: `add_${name}`, payload: value }) :
                      dispatch({ type: `remove_${name}`, payload: value });
            return;
        }

        dispatch({ type: 'handle_change', payload: { path: name, value }});
    }

    const runValidation = () => {
        if (! validator.setData(data).validate()) {
            setErrors(validator.errors());
            return false;
        };
        setErrors(validator.errors());
        return true;
    };

    return (
        <Context.Provider value={{ data, errors, addAddress, removeAddress, handleChange, runValidation, validator }}>
            { children }
        </Context.Provider>
    );
};

export { Context, Provider };