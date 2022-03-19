import { React, useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import Signin from './login';
import Signup from './register';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import Nav from '../armada/navbar';

const AuthPages = () => {
  const navigate = useNavigate();
  const [currentContainer, setCurrentContainer] = useState(false);

  useEffect(() => {
    let isAuth = localStorage.getItem('access_token');
    if (isAuth) {
      navigate({ pathname: './dashboard' });
    }
  }, [navigate]);

  return (
    <div className="container">
      <Nav />
      <div className={`auth-pages`}>
        <Row>
          <Col>
            <div className="card-auth-page">
              <div className={`card-inner`}>
                {currentContainer ? (
                  <div className={`card-register `}>
                    <h3>Sign up</h3>
                    <Signup setCurrentContainer={setCurrentContainer} />
                    <button onClick={() => setCurrentContainer(false)}> Sudah punya Akun?</button>
                  </div>
                ) : (
                  <div className={`card-login`}>
                    <h3>Login</h3>
                    <Signin />
                    <button onClick={() => setCurrentContainer(true)}>Daftar</button>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AuthPages;
