const init = {
    id: '',
    name: ''
}

export default (data = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...data,
                id: action.payload.id,
                name: action.payload.name
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...data, id: '', name: ''
            }
                
        default:
            return data
    }
}