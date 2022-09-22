import React, { useContext } from 'react';
import { Context } from './FormContext';
import styles from './styles.module.css';


const SocialPlatforms = ({ socialPlatforms }) => {
    const { handleChange, errors } = useContext(Context);

    return (
        <div className={styles.mb20}>
            <h5>Social Platforms:</h5>
            <div>
                {['Facebook', 'Instagram', 'Twitter', 'Linkedin'].map(socialPlatform => (
                    <span key={socialPlatform}>
                        <input 
                            type="checkbox"
                            id={socialPlatform}
                            name="platform"
                            value={socialPlatform}
                            className={styles.mr10}
                            onChange={handleChange}
                            checked={socialPlatforms.indexOf(socialPlatform) === -1 ? false : true}
                        />
                        <label key={socialPlatform} htmlFor={socialPlatform} className={styles.mr10}>{socialPlatform}</label>
                    </span>
                ))}
                
            </div>
            { errors.has('profile.socialPlatforms') && <p className={styles.clRed}>{ errors.first('profile.socialPlatforms') }</p> }
        </div>
    );
};

export default SocialPlatforms;