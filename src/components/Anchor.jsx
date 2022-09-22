import React from 'react';

function Anchor({ id, children }) {
    return (
        <h4 id={id} style={{ fontSize: '1.25rem' }}>
            { children }
        </h4>
    );
};

export default Anchor;