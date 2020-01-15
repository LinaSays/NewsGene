import { toast } from 'react-toastify';

import { modifyData } from '../store/reducer';

export const modifyItem = (id) => {
    if (document.getElementById('sujet').value.length === 0) {
        toast.error('Veuillez écrire le sujet');
    } else if (document.getElementById('client_nom').value.length === 0) {
        toast.error('Veuillez écrire le nom du client');
    } else if (document.getElementById('redacteur_prenom').value.length === 0) {
        toast.error('Veuillez écrire le prénom du rédacteur');
    } else if (document.getElementById('redacteur_nom').value.length === 0) {
        toast.error('Veuillez écrire le nom du rédacteur');
    } else if (document.getElementById('sr_prenom').value.length === 0) {
        toast.error('Veuillez écrire le prénom du secrétaire de rédaction');
    } else if (document.getElementById('sr_nom').value.length === 0) {
        toast.error('Veuillez écrire le nom du secrétaire de rédaction');
    } else if (document.getElementById('statut').value.length === 0) {
        toast.error('Veuillez choisir le statut');
    } else {
        modifyData(id);
    }
};
