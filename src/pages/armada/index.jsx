import React, { useEffect, useState } from 'react';
import { Button, Card, CardImg, CardBody, Modal, ModalHeader, ModalBody, CardSubtitle, CardTitle } from 'reactstrap';
import NavbarCatalog from './navbar';
import axios from 'axios';
import './style.scss';
import FormDetail from './detail';


export default function Catalog() {
  const [data, setData] = useState([]);
  const [action, setAction] = useState(null); // cek form create
  const [modalVisible, setModalVisible] = useState(false); // cek modal muncul
  const [detailId, setdetailId] = useState(null);

  useEffect(() => {

    getData();
  }, []);

  const handleDetail = async (id) => {
    await axios
      .get(`http://localhost:8080/armada/${id}`)
      .then(() => {
        setdetailId(id);
        setAction('detail');
        setModalVisible(true);
      })
      .catch((err) => console.error(err));
  };

  const getData = async () => {
    await axios
      .get('http://localhost:8080/armada')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="head">
        <NavbarCatalog />
      </div>
      <div className='content'>
        <div className="row">
          {data.map((o, idx) => (
            <div className="col-3">
              <Card key={idx}>
                <CardImg alt="Card image cap" src={o.picture} top width="100%" />
                <CardBody>
                  <CardTitle tag="h5">{o.name}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    RentalCars.id
                  </CardSubtitle>
                  <Button onClick={() => handleDetail(o.id)}>Detail</Button>
                </CardBody>
              </Card>
              <Modal isOpen={modalVisible} toggle={() => setModalVisible(!modalVisible)} >
                <ModalHeader>
                  {`Armada`}
                </ModalHeader>
                <ModalBody>
                  <FormDetail
                  actionForm={action} data={data} setData={setData} setModalVisible={setModalVisible} detailId={detailId}
                  />
                </ModalBody>
              </Modal>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
