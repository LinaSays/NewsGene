import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import socketIOClient from "socket.io-client";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


const Body = ({ getData, information, changeValue, modifyData, endpoint, deleteData }) => {
  // state for modal
  const [show, setShow] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const handleClose = () => {setShow(false)};
  const handleShow = (item) => {setCurrentItem(item); setShow(true);};

  useEffect(() => {
    const socket = socketIOClient(endpoint);
    socket.on('changedMessage', message => toast.success(message));
    getData();
    return () => getData();
  }, [getData, endpoint]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    changeValue(name, value);
  };

  // edit info
  const modifyItem = (id) => (event) => {
    event.preventDefault();
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
      setShow(false);
    }
  };

  const deleteItem = (id) => (event) => {
    event.preventDefault();
    deleteData(id);
  };

  return (
    <>
    <Button variant="success" className="add-btn" onClick={handleShow}>Créer une commande</Button>
      <Table className="table-data" striped bordered hover size="sm" >
        <thead>
          <tr>
            <th>Sujet</th>
            <th>Mots-clés</th>
            <th>Date de création</th>
            <th>Rédacteur</th>
            <th>Secrétaire de rédaction</th>
            <th>Client</th>
            <th>Statut</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {information.map(item => {
          return (<tr key={item._id}>
            <td>{item.sujet}</td>
            <td>{item.keywords}</td>
            <td>{item.date_creation}</td>
            <td>{item.redacteur_prenom} {item.redacteur_nom}</td>
            <td>{item.sr_prenom} {item.sr_nom}</td>
            <td>{item.client_nom}</td>
            <td>{item.statut}</td>
            <td className="btns">
              <Button className="edit-btn" onClick={()=> handleShow(item)}><FontAwesomeIcon icon={faEdit} /></Button>
              <Button variant="danger" onClick={deleteItem(item._id)}><FontAwesomeIcon icon={faTrash} /></Button>
            </td>
          </tr>)
        })}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label htmlFor="sujet">Sujet</Form.Label>
              <Form.Control type="text" name="sujet" id="sujet" defaultValue={currentItem.sujet} onChange={handleChange} placeholder="Sujet"/></Form.Group>
            <Form.Group>
              <Form.Label htmlFor="keywords">Mots-clés</Form.Label>
              <Form.Control type="text" name="keywords" id="keywords" defaultValue={currentItem.keywords} onChange={handleChange} placeholder="Mots-clés"/></Form.Group>
            <Form.Group>
              <Form.Label htmlFor="client_nom">Nom du client</Form.Label>
              <Form.Control type="text" name="client_nom" id="client_nom" defaultValue={currentItem.client_nom} onChange={handleChange} placeholder="Nom du client"/>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="redacteur_prenom">Prénom du rédacteur</Form.Label>
              <Form.Control type="text" name="redacteur_prenom" id="redacteur_prenom" defaultValue={currentItem.redacteur_prenom} onChange={handleChange} placeholder="Prénom du rédacteur"/>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="redacteur_nom">Nom du rédacteur</Form.Label>
              <Form.Control type="text" name="redacteur_nom" id="redacteur_nom" defaultValue={currentItem.redacteur_nom} onChange={handleChange} placeholder="Nom du rédacteur"/>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="sr_prenom">Prénom du secrétaire de rédaction</Form.Label>
              <Form.Control type="text" name="sr_prenom" id="sr_prenom" defaultValue={currentItem.sr_prenom} onChange={handleChange} placeholder="Prénom du secrétaire de rédaction"/>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="sr_nom">Nom du secrétaire de rédaction</Form.Label>
              <Form.Control type="text" name="sr_nom" id="sr_nom" defaultValue={currentItem.sr_nom} onChange={handleChange} placeholder="Nom du secrétaire de rédaction"/>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="statut">Statut</Form.Label>
              <Form.Control as="select" name="statut" id="statut" defaultValue={currentItem.statut} onChange={handleChange} placeholder="Statut">
                <option>...</option>
                <option>Non Publié</option>
                <option>Publié</option>
                <option>Envoyé</option>
                <option>En cours</option>
                <option>Relu</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={modifyItem(currentItem._id)}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
);
}

Body.propTypes = {
  getData: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
  modifyData: PropTypes.func.isRequired,
  information: PropTypes.array.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default Body;
