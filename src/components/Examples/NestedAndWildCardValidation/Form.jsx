import React, { useContext } from 'react';
import { Context } from './FormContext';
import styles from './styles.module.css';
import Profile from './Profile';

const Form = () => {
    const { data, handleChange, errors, runValidation } =  useContext(Context);

    const handleSubmit = event => {
        event.preventDefault();

        if (! runValidation()) {
            return;
        }
        console.log('Data submitted successfully');
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>Account</h2>
                    <div className={styles.mb20}>
                        <label className={styles.mr10} htmlFor="email">Email</label>
                        <input 
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                        />

                        { errors.has('email') && <p className={styles.clRed}>{errors.first('email')}</p> }
                    </div>

                    <div className={styles.mb20}>
                        <label className={styles.mr10} htmlFor="password">Password</label>
                        <input 
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                        />

                        { errors.has('password') && <p className={styles.clRed}>{errors.first('password')}</p>}
                    </div>
                    <Profile profile={data.profile} />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Form;