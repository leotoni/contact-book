export const contacts = (state = [], action) => {
  switch (action.type) {
    case 'ON_LOAD_CONTACTS':
      return action.payload;
    case 'ON_ADD_CONTACT':
      return [...state, action.payload];
    case 'ON_EDIT_CONTACT':
      return [...state.filter(e => e.id !== action.payload.id), action.payload];
    case 'ON_DELETE_CONTACT':
      return [...state.filter(e => e.id !== action.payload)];
    default:
      return state;
  }
};
