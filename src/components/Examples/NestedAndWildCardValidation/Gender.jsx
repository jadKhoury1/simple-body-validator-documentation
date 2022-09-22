import React, { useContext } from 'react';
import { Context } from './FormContext';
import styles from './styles.module.css';

const Gender = ({ selectedGender }) =>{
    const { handleChange, errors } = useContext(Context);

    return (
        <div className={styles.mb20}>
            <label className={styles.mr10}>Gender:</label>
            {['Female', 'Male', 'Other'].map(gender => (
                <span key={gender}>
                    <input
                        type="radio"
                        id={gender}
                        name="profile.gender"
                        value={gender}
                        onChange={handleChange}
                        checked={selectedGender === gender}
                    />
                    <label className={styles.mr10} htmlFor={gender}>{gender}</label>
                </span>
            ))}
            { errors.has('profile.gender') && <p className={styles.clRed}>{errors.first('profile.gender')}</p> }
        </div>
    );
};

export default Gender;