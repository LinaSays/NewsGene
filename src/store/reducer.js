// - initialState
const initialState = {
    information: [],
    endpoint: 'http://127.0.0.1:3001',
  };
  
  // - Actions Types
export const GET_DATA = 'GET_DATA';
const SHOW_DATA = 'SHOW_DATA';
const CHANGE_INPUT = 'CHANGE_INPUT';
export const MODIFY_DATA = 'MODIFY_DATA';

  // - Reducer
  const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case CHANGE_INPUT:
        return {
          ...state,
          [action.name]: action.value,
        };
      case SHOW_DATA:
        return {
          ...state,
          information: action.information,
        };
      default:
        return state;
    }
  };
  
  // - Actions Creators
  export const changeInput = (name, value) => ({
    type: CHANGE_INPUT,
    name,
    value,
  });

  export const showData = (information) => ({
    type: SHOW_DATA,
    information
  });
  
  export const getData = () => ({
    type: GET_DATA,
  });

  export const modifyData = (id) => ({
    type: MODIFY_DATA,
    id
  });
  
  // - Export
  export default reducer;