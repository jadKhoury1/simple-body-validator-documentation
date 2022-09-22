import React, { useContext } from 'react';
import { Context } from './FormContext';
import styles from './styles.module.css';

const Address = ({ index, street, city, zipCode }) => {
    const { errors, handleChange } = useContext(Context);

    return (
        <div>
            <div className={styles.mb20}>
                <label className={styles.mr10} htmlFor={`street.${index}`}>Street</label>
                <input
                    id={`street.${index}`}
                    type="text"
                    name={`profile.addresses.${index}.street`}
                    value={street}
                    onChange={handleChange}
                />
                { 
                    errors.has(`profile.addresses.${index}.street`) && 
                    <p className={styles.clRed}>{errors.first(`profile.addresses.${index}.street`)}</p>
                }
            </div>

            <div className={styles.mb20}>
                <label  className={styles.mr10} htmlFor={`city.${index}}`}>City</label>
                <input 
                    id={`city.${index}`}
                    type="text"
                    name={`profile.addresses.${index}.city`}
                    value={city}
                    onChange={handleChange}
                />
                {
                    errors.has(`profile.addresses.${index}.city`) &&
                    <p className={styles.clRed}>{errors.first(`profile.addresses.${index}.city`)}</p>
                }
            </div>

            <div className={styles.mb20}>
                <label className={styles.mr10} htmlFor={`zipCode.${index}}`}>Zip Code</label>
                <input 
                    id={`zipCode.${index}`}
                    type="text"
                    name={`profile.addresses.${index}.zipCode`}
                    value={zipCode  }
                    onChange={handleChange}
                />
                {
                    errors.has(`profile.addresses.${index}.zipCode`) &&
                    <p className={styles.clRed}>{errors.first(`profile.addresses.${index}.zipCode`)}</p>
                }
            </div>
        </div>
    );

};

export default Address;