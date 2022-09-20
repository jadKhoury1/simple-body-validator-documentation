import React,{ createContext, useReducer, useState } from 'react';
import { make } from 'simple-body-validator'; 
import { deepSet } from 'simple-body-validator/lib/utils/object';



const formReducer = (state, action) => {
    switch(action.type) {
        case 'add_address': 
            state.profile.addresses.push(action.payload);
            return { ... state };
        case 'remove_address': 
            state.profile.addresses.pop();
            return { ... state };
        case 'handle_change': 
            const { path, value } = action.payload;
            deepSet(state, path, value);
            return { ...state };
        default:
            return state;
    }   
};

const Context = createContext();

const Provider = ({ children, initialData, rules }) => {
    
    const validator = make(initialData, rules);
    const [ data, dispatch ] = useReducer(formReducer, initialData);
    const [ errors, setErrors] = useState(validator.errors());

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
        dispatch({ type: 'remove_address' });
    };
    
    const handleChange =  ({ target: { name, value }}) => dispatch({ type: 'handle_change', payload: { path: name, value }});

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