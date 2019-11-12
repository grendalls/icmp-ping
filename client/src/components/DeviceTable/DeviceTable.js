import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import './DeviceTable.css';

export default class DeviceTable extends Component {
  render() {
    return (
      <Row className="mt-5">
        <Col xl={12}>
          <Table className="text-center" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>IP Adress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}
