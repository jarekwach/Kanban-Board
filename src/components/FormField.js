/* eslint-disable react/prop-types */
import React from 'react';

const FormField = function (props) {
    const { name, label, error } = props;

    return (
        <div className="form__field">
            <input className="form__input" name={name} placeholder={label} />
            <p className="form__error">{error}</p>
        </div>
    );
};

export default FormField;
