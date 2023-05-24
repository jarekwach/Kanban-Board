function formValidation(data, fields) {
    const errors = [];

    fields.forEach((field) => {
        const value = data[field.name];
        const { name, label, required = true, pattern = null } = field;

        if (required) {
            if (value.length < 2) {
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
        }
    });

    return errors;
}

export default formValidation;
