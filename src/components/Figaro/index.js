import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';


const Figaro = ({ getFigaro, information }) => {
    useEffect(() => {
    getFigaro();
    return () => getFigaro();
    }, [getFigaro]);

  return (
    <>
      <Table className="table-data mt-3" striped bordered hover size="sm" >
        <thead>
          <tr>
            <th>Sujet</th>
            <th>Mots-clés</th>
            <th>Date de création</th>
            <th>Rédacteur</th>
            <th>Secrétaire de rédaction</th>
            <th>Client</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
        {information.map(item => {
          return (<tr key={item["news:news"]["news:title"]}>
            <td>{item["news:news"]["news:title"] === undefined
                ? '-'
                : item["news:news"]["news:title"]._text}</td>
            <td>{item["news:news"]["news:keywords"] === undefined
                ? '-'
                : item["news:news"]["news:keywords"]._text}</td>
            <td>{item["news:news"]["news:publication_date"] === undefined
                ? '-'
                : item["news:news"]["news:publication_date"]._text}</td>
            <td></td>
            <td></td>
            <td>{item["news:news"]["news:publication"]["news:name"] === undefined
                ? '-'
                : item["news:news"]["news:publication"]["news:name"]._text}</td>
            <td></td>
          </tr>)
        })}
        </tbody>
      </Table>
    </>
);
}

Figaro.propTypes = {
  getFigaro: PropTypes.func.isRequired,
  information: PropTypes.array.isRequired,
};

export default Figaro;
