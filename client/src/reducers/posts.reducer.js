export default (posts = [], action) => {
    switch (action.type) {
        case 'GET_POSTS':
            return action.payload;
        case 'CREATE_POST':
            return [...posts, action.payload];
        default:
            return posts;
    }
}