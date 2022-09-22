import React, { useContext } from 'react';
import AddressesList from './AddressesList';
import SocialPlatforms from './SocialPlatforms';
import Gender from './Gender';
import { Context }  from './FormContext';
import styles from './styles.module.css'


const Profile = ({ profile }) => {
    const { handleChange, errors } = useContext(Context);

    return (
        <div>
            <h2>Profile</h2>
            <div>
                <div className={`${styles.mb20} ${styles.mr20} ${styles.inline}`}>
                    <label className={styles.mr10} htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        name="profile.firstName"
                        value={profile.firstName}
                        onChange={handleChange}
                    />
                    { errors.has('profile.firstName') && <p className={styles.clRed}>{errors.first('profile.firstName')}</p>}
                </div>
                <div className={`${styles.mb20} ${styles.inline}`}>
                    <label className={styles.mr10} htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        name="profile.lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                    />
                    { errors.has('profile.lastName') && <p className={styles.clRed}>{errors.first('profile.lastName')}</p>}
                </div>

                <Gender selectedGender={profile.gender} />
                <SocialPlatforms socialPlatforms={profile.socialPlatforms}/>
                <AddressesList addresses={profile.addresses}/>
            </div>
        </div>
    );
};

export default Profile;