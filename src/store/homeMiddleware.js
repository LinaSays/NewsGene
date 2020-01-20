import axios from 'axios';
import socketIOClient from "socket.io-client";
import { toast } from 'react-toastify';

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
      const { statut, sujet, redacteur_nom, redacteur_prenom, client_nom, sr_nom, sr_prenom, keywords } = state;
      const id = action.id;
      const socket = socketIOClient('http://127.0.0.1:3001');
      axios.post(`${API_URI}/update`, {id, statut, sujet, redacteur_nom, redacteur_prenom, client_nom, sr_nom, sr_prenom, keywords })
        .then((response) => {
          if (id) {
            var msg = 'Une commande a été mise à jour';
          } else {
            msg = 'Une commande a été créée';
          }
            socket.emit('changes', msg);
          const save = showData(response.data);
          store.dispatch(save);
        })
        .catch((error) => {
          console.error(error);
        }).finally(() => {
          socket.on('message', (msg) => {
            toast.success(msg);
          })
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
      axios.get(`http://localhost/newsgene/backend/figaro.php`)
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