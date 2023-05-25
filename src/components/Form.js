import React from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';

const Form = function (props) {
    const { formName, fields, onSubmit, formErrors, display, closeForm } = props;

    const fieldList = fields.map((field) => {
        const { name, label } = field;

        const fieldError = formErrors.map((error) => {
            if (name === error.name) {
                return error.message;
            }
            return null;
        });

        return <FormField key={name} name={name} label={label} error={fieldError} />;
    });

    return (
        <form className='form__item' style={{ display }} onSubmit={onSubmit}>
            <h2 className='form__title'>{formName}</h2>
            {fieldList}
            <div className='form__buttons'>
                <input className='form__btn form__btn--submit' type="submit" value={formName} />
                <button className='form__btn' type="button" onClick={closeForm}>
                    close
                </button>
            </div>
        </form>
    );
};

Form.propTypes = {
    formName: PropTypes.string.isRequired,
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
    display: PropTypes.string.isRequired,
    closeForm: PropTypes.func.isRequired,
};

export default Form;
