export const bookingReducer = (state = null, action) => {
    switch(action.type) {
        case 'SETTER':
            return action.payload
        default:
            return state
    }
}