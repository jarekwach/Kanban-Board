import React from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';

const Form = function (props) {
    const { fields, onSubmit, formErrors } = props;

    const fieldList = fields.map((field) => {
        const { name, label } = field;
        return <FormField key={name} name={name} label={label} />;
    });

    return (
        <form onSubmit={onSubmit}>
            {fieldList}
            <ul>
                {formErrors.map((error) => (
                    <li key={error.name}>{error.message}</li>
                ))}
            </ul>
            <input type="submit" />
        </form>
    );
};

Form.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
    onSubmit: PropTypes.func.isRequired,
    formErrors: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default Form;
