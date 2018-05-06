const initialState = {
    posts: [],
    post: {},
    loading: false
};

export default function (state = initialState, action) {
    switch(action.type) {
        case 'ADD_POST':
            ...state,

        default:
            return state;
    }
}
