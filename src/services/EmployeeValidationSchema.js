const EmployeeValidationSchema = {
    rules: {
        name: {
            required: true
        },
        surname: {
            required: true
        },
        bDay: {
            required: true
        },
        email: {
            required: true
        },
        salary: {
            required: true
        }
    },
    messages: {
        name: {
            required: 'You must fill this field'
        },
        surname: {
            required: 'You must fill this field'
        },
        bDay: {
            required: 'You must fill this field'
        },
        email: {
            required: 'You must fill this field'
        },
        salary: {
            required: 'You must fill this field'
        }
    }
}

export { EmployeeValidationSchema }