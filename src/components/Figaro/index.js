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
          return (<tr key={item["title"]}>
            <td>{item["title"] === undefined ? '-' : item["title"]}</td>
            <td>{item["verb_title"] === item["verb_url"] ? item["verb_title"]
            : item["verb_title"] === undefined ? '-' : item["verb_title"]
            && item["verb_url"] === undefined ? '-' : item["verb_url"]}
            </td>
            <td>{item["publication_date"] === undefined ? '-' : item["publication_date"]}</td>
            <td></td>
            <td></td>
            <td>{item["name"] === undefined ? '-' : item["name"]}</td>
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
