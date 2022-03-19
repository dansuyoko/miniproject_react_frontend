import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, NavbarText } from 'reactstrap';
import FormDashboard from './form';
import '../../components/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import './style.scss';


export default function Dashboard() {
  const [header, setHeader] = useState([]);
  const [data, setData] = useState([]);
  const [action, setAction] = useState(null); // cek form create
  const [modalVisible, setModalVisible] = useState(false); // cek modal muncul
  const [updatedId, setUpdatedId] = useState(null);

  const handleCreate = () => {
    setAction('create');
    setModalVisible(true);
  };

  useEffect(() => {
    const listHeader = ['No', 'Name', 'Stock', 'Price', 'Action'];
    setHeader(listHeader);
    getData();
  }, []);

  const handleEdit = async (id) => {
    await axios
      .put(`http://localhost:8080/armada/${id}`)
      .then(() => {
        setUpdatedId(id);
        setAction('edit');
        setModalVisible(true);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8080/armada/${id}`)
      .then(() => {
        const updateData = data.filter((v) => v.id !== id);
        setData(updateData);
      })
      .catch((err) => console.log(err));
  };

  const getData = async () => {
    await axios
      .get('http://localhost:8080/armada')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem('acces_token');
    window.location = '/'
  }

  return (
    <div className="container">
      <div className="head">
      <Navbar color="info" expand="md" fixed="top" light>
        <NavbarBrand href="/">
          <FontAwesomeIcon icon={'car'} size={'42px'} />
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() {}} />
        <Collapse navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/dashboard">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            <Button color="danger" onClick={() => handleLogout()}>
              <FontAwesomeIcon icon={'sign-out'} />
            </Button>
          </NavbarText>
        </Collapse>
      </Navbar>
      </div>
      <div className='content' style={{ margin: '100px 100px' }}>
        <Button onClick={() => handleCreate()} style={{ margin: '10px 10px 12px 0px' }}>
          <FontAwesomeIcon icon={'square-plus'} />
        </Button>
        <Table className='tabel' light bordered responsive >
          <thead>
            <tr>
              {header.map((v, idx) => (
                <th key={idx}>{v}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((v, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{v.name}</td>
                <td>{v.stock}</td>
                <td>{v.price}</td>
                {/* <td><CardImg top width="100%" src={v.picture} /></td> */}
                <td>
                  <Button onClick={() => handleEdit(v.id)} style={{ margin: '10px 10px 10px 0px' }}>
                    <FontAwesomeIcon icon={'edit'} />
                  </Button>
                  <Button onClick={() => handleDelete(v.id)} style={{ margin: '10px 10px 10px 0px' }}>
                    <FontAwesomeIcon icon={'trash'} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal isOpen={modalVisible} toggle={() => setModalVisible(!modalVisible)}>
          <ModalHeader>{`Form ${action} Data`}</ModalHeader>
          <ModalBody>{<FormDashboard actionForm={action} data={data} setData={setData} setModalVisible={setModalVisible} updatedId={updatedId} />}</ModalBody>
        </Modal>
      </div>
    </div>
  );
}
