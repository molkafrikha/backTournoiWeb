import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { loginUser } from '../actions/userAction';
import Loader from './loader';
import Logo from './Logo';

const Login = ({ history }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, success, userInfo } = userLogin;

  useEffect(() => {
    if (success && userInfo) {
      if (userInfo.role === 'admin') {
        history.push('/Admin'); // Rediriger vers la page admin si l'utilisateur est un admin
      } else {
        history.push('/dash'); // Rediriger vers le tableau de bord pour les autres utilisateurs
      }
    }
  }, [success, userInfo, history]);
  const loginHandler = () => {
    dispatch(loginUser(email, password));
  };
  
  return (
    <div id="login-container">
    <Container>
      <Row className="mt-5 justify-content-center">
        <Col md={4} className="m-3 p-3" style={{ backgroundColor: '#141f2d', border: '1px solid #ddd' }}>
          <Logo />
          <Form >
            <h1 className="font-bold mb-2 text-4xl text-white">Login &#x1F590;</h1>
            <input onChange={e => setEmail(e.target.value)} value={email} className="input bg-gray-200 text-white" type="email" placeholder="Email" />
            <input onChange={e => setPassword(e.target.value)} value={password} type="password" className="input bg-gray-200 text-white" placeholder="Password" />
            <Button onClick={loginHandler} className="bg-green-600 shadow-xl p-2 hover:bg-green-700 transition-colors font-semibold w-full">
              Login
            </Button>
          </Form>
          <LinkContainer className="mt-3" to="/forgot-password">
            <Button className="bg-green-600 shadow-xl p-2 hover:bg-green-700 transition-colors font-semibold w-full" variant="outline-secondary">
              Forgot Password?
            </Button>
          </LinkContainer>
          <LinkContainer className="mt-3" to="/register">
            <Button className="justify-end hover:text-green-600 transition duration-300" variant="outline-secondary">
              Don't have an account? Register now!
            </Button>
          </LinkContainer>
          <Row className="mt-3">
            <Col>
              {loading && <Loader />}
              {error && (
                <Alert variant="danger">
                  <i className="fas fa-exclamation-triangle"></i>
                  {` `+error}
                </Alert>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Login;
