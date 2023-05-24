import React from 'react';
import PropTypes from 'prop-types';

const FormField = function (props) {
    const { name, label } = props;

    return (
        <div className="form__field">
            <input className="form__input" name={name} placeholder={label} />
        </div>
    );
};

FormField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default FormField;
