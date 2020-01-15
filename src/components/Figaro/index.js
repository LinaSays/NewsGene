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
        {information.slice(0, 20).map(item => {
          return (<tr key={item["news"]["keywords"]}>
            <td>{item["news"]["title"] === undefined
                ? '-'
                : item["news"]["title"]}</td>
            <td>{item["news"]["keywords"] === undefined
                ? '-'
                : item["news"]["keywords"]}</td>
            <td>{item["news"]["publication_date"] === undefined
                ? '-'
                : item["news"]["publication_date"]}</td>
            <td></td>
            <td></td>
            <td>{item["news"]["publication"]["name"] === undefined
                ? '-'
                : item["news"]["publication"]["name"]}</td>
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
