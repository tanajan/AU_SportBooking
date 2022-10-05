export const chartReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET':
            return action.payload
        default:
            return state
    }
}