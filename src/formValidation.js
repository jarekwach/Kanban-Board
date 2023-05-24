function formValidation(data, fields) {
    const errors = [];

    fields.forEach((field) => {
        const value = data[field.name];
        const { name, label, required = true, pattern = null, type } = field;

        if (required) {
            if (value.length < 1) {
                errors.push({
                    name,
                    message: `'${label}' is required.`,
                });
            } else if (pattern) {
                const reg = new RegExp(pattern);
                if (!reg.test(value)) {
                    errors.push({
                        name,
                        message: `Invalid format in '${label}' `,
                    });
                }
            }

            if (type === 'number') {
                if (Number.isNaN(Number(value))) {
                    errors.push({
                        name,
                        message: `'${label}' must be a number.`,
                    });
                }
            }
        }
    });

    return errors;
}

export default formValidation;
