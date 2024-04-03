import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { registerUser } from '../actions/userAction';
import Loader from './loader';
import Logo from './Logo';

const Register = () => {
  const dispatch = useDispatch();
  const [fullname , setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [role, setRole] = useState('player');

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success, message } = userRegister;

  useEffect(() => {}, [success]);

  const registerHandler = () => {
    dispatch(registerUser(fullname ,email, password, image, role));
  };

  const handleIdCard = (event) => {
    const file = event.target.files[0];
    setImage(file);
    console.log(file); // Assurez-vous que l'image est correctement définie
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-center">
      <Col md={4} className="m-3 p-3" style={{ backgroundColor: '#141f2d', border: '1px solid #ddd' }}>
      <Logo />
          <Form enctype="multipart/form-data">
          <h1 className="font-bold mb-2 text-4xl text-white">register &#x1F590;</h1>
          <input onChange={e => setFullname(e.target.value)} value={fullname} className="input bg-gray-200 text-white" type="text" placeholder="Full Name" />
          <input onChange={e => setEmail(e.target.value)} value={email} className="input bg-gray-200 text-white" type="email" placeholder="Email" />
          <input onChange={e => setPassword(e.target.value)} value={password} type="password" className="input bg-gray-200 text-white" placeholder="Password" />

            <Form.Group>
              {/* Champ pour sélectionner l'image */}
              <Form.Label className="text-white" >Image</Form.Label>
              <Form.Control
                type="file"
                name="file" className="input bg-gray-200 text-white"
                onChange={handleIdCard} // Utilisation de la fonction handleIdCard pour mettre à jour l'état de l'image
              />
            </Form.Group>

            <Form.Group>
              {/* Menu déroulant pour sélectionner le rôle */}
              <Form.Label className="text-white" >Role</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}>
                <option value="player">Player</option>
                <option value="organizer">Organizer</option>
                <option value="coach">Coach</option>
              </Form.Control>
            </Form.Group>
            <br/>
            <Button onClick={registerHandler} className="bg-green-600 shadow-xl p-2 hover:bg-green-700 transition-colors font-semibold ">
              Register
            </Button>
          </Form>
          <LinkContainer className="mt-3" to="/login">
            <Button
              type="button"
              className="btn-block"
              variant="outline-secondary"
            >
              Login
            </Button>
          </LinkContainer>
          <Row className="mt-3">
            <Col>
              {loading && <Loader />}
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{message}</Alert>}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
