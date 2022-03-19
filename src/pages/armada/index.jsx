import React, { useEffect, useState } from 'react';
import { Button, Card, CardImg, CardBody, CardSubtitle, CardTitle } from 'reactstrap';
import NavbarCatalog from './navbar';
import '../../components/fontawesome';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import '../dashboard/style.scss';

export default function Catalog() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get('http://localhost:8080/armada')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <div className="head">
        <NavbarCatalog />
      </div>
      <div className='content'>
        <div className="row">
          {data.map((v, idx) => (
            <div className="col-3">
              <Card key={idx}>
                <CardImg alt="Card image cap" src={v.picture} top width="100%" />
                <CardBody>
                  <CardTitle tag="h5">{v.name}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    RentalCars.id
                  </CardSubtitle>
                  <Button>Detail</Button>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
