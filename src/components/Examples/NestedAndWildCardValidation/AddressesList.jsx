import React, { useContext } from 'react';
import { Context } from './FormContext'; 
import styles from './styles.module.css';

import Address from './Address';

const AddressesList = ({ addresses }) => {
    const { addAddress, removeAddress } = useContext(Context);

    const list = addresses.map((address, index) =>(
        <div key={index}>
            <h5>Address {index + 1}</h5>
            <Address { ...address } index={index}/>
        </div>
    ));

    return (
        <div className={styles.mb20}>
            <h3>Addresses</h3>
            {list}
            <button className={styles.mr10} onClick={addAddress}>Add Address</button>
            { addresses.length > 1 && <button onClick={removeAddress}>Remove Address</button>}
        </div>
    );
};

export default AddressesList;