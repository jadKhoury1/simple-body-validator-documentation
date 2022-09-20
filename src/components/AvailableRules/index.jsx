import React from 'react';
import rules from './rules';
import styles from './AvailableRules.module.css';

function AvailableRules() {
    return (
        <div className={styles.rulesList}>
            {rules.map(({ key, name }) => (
                <a key={key} className={styles.ruleslistLink} href={`available-validation-rules#${key}`}>
                    {name}
                </a>
            ))}
        </div>
    );
};

export default AvailableRules;

