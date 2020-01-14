import axios from 'axios';

import { GET_DATA, showData, MODIFY_DATA, GET_FIGARO, DELETE_DATA } from './reducer';

const API_URI = 'http://localhost:3001';

const homeMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_DATA: {
      axios.get(API_URI)
        .then((response) => {
          const save = showData(response.data);
          store.dispatch(save);
        })
        .catch((error) => {
          console.error(error);
        });
      break;
    }
    case MODIFY_DATA: {
      const state = store.getState();
      const { statut, sujet, redacteur_nom, redacteur_prenom, client_nom, sr_nom, sr_prenom } = state;
      const id = action.id;
      axios.post(`${API_URI}/update`, {id, statut, sujet, redacteur_nom, redacteur_prenom, client_nom, sr_nom, sr_prenom })
        .then((response) => {
          const save = showData(response.data);
          store.dispatch(save);
        })
        .catch((error) => {
          console.error(error);
        });
      break;
    }
    case DELETE_DATA: {
      const id = action.id;
      axios.post(`${API_URI}/delete`, {id})
        .then((response) => {
          const save = showData(response.data);
          store.dispatch(save);
        })
        .catch((error) => {
          console.error(error);
        });
      break;
    }
    case GET_FIGARO: {
      axios.get(`${API_URI}/figaro`)
        .then((response) => {
          console.log(response);
          const save = showData(response.data);
          store.dispatch(save);
        })
        .catch((error) => {
          console.error(error);
        });
      break;
    }
    default:
      next(action);
  }
};

export default homeMiddleware;