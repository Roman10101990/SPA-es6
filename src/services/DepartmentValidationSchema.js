const DepartmentValidationSchema = {
    rules: {
        name: {
            required: true
        },
        description: {
            required: true
        }
    },
    messages: {
        name: {
            required: 'You must fill this field'
        },
        description: {
            required: 'You must fill this field'
        }
    }
}
export { DepartmentValidationSchema }