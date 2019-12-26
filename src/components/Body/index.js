import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import socketIOClient from "socket.io-client";
import { toast } from 'react-toastify';


const Body = ({ getData, information, changeValue, modifyData, endpoint }) => {
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
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    changeValue(name, value);
  };

  // modify info
  const modifyItem = (id) => (event) => {
    event.preventDefault();
    modifyData(id);
    setShow(false);
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
            <td></td>
            <td>{item.date_creation}</td>
            <td>{item.redacteur_prenom} {item.redacteur_nom}</td>
            <td>{item.sr_prenom} {item.sr_nom}</td>
            <td>{item.client_nom}</td>
            <td>{item.statut}</td>
            <td><Button onClick={()=> handleShow(item)}>Modifier</Button></td>
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
              <Form.Label for="sujet">Sujet</Form.Label>
              <Form.Control type="text" name="sujet" defaultValue={currentItem.sujet} onChange={handleChange} placeholder="Sujet"/></Form.Group>
            <Form.Group>
              <Form.Label for="client_nom">Nom du client</Form.Label>
              <Form.Control type="text" name="client_nom" defaultValue={currentItem.client_nom} onChange={handleChange} placeholder="Nom du client"/>
            </Form.Group>
            <Form.Group>
              <Form.Label for="redacteur_prenom">Prénom du rédacteur</Form.Label>
              <Form.Control type="text" name="redacteur_prenom" defaultValue={currentItem.redacteur_prenom} onChange={handleChange} placeholder="Prénom du rédacteur"/>
            </Form.Group>
            <Form.Group>
              <Form.Label for="redacteur_nom">Nom du rédacteur</Form.Label>
              <Form.Control type="text" name="redacteur_nom" defaultValue={currentItem.redacteur_nom} onChange={handleChange} placeholder="Nom du rédacteur"/>
            </Form.Group>
            <Form.Group>
              <Form.Label for="sr_prenom">Prénom du secrétaire de rédaction</Form.Label>
              <Form.Control type="text" name="sr_prenom" defaultValue={currentItem.sr_prenom} onChange={handleChange} placeholder="Prénom du secrétaire de rédaction"/>
            </Form.Group>
            <Form.Group>
              <Form.Label for="sr_nom">Nom du secrétaire de rédaction</Form.Label>
              <Form.Control type="text" name="sr_nom" defaultValue={currentItem.sr_nom} onChange={handleChange} placeholder="Nom du secrétaire de rédaction"/>
            </Form.Group>
            <Form.Group>
              <Form.Label for="statut">Statut</Form.Label>
              <Form.Control type="text" name="statut" defaultValue={currentItem.statut} onChange={handleChange} placeholder="Statut"/>
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

export default Body;
