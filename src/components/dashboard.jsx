import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/userAction';

import Loader from './loader';


const Dashboard = ({ history }) => {
  const dispatch = useDispatch();

  

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  
  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      history.push('/Admin');
    }

    
  }, [
    dispatch,
    userInfo,
    history,
    
    completeSuccess,
    incompleteSuccess,
    deleteSuccess,
    editSuccess,
  ]);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

 

  return (
    <Container>
      <Row className="p-3" style={{ backgroundColor: 'rgb(230 230 230)' }}>
        <Col md={11}>
          <h2>WelCome BacK! {userInfo && userInfo.email}</h2>
        </Col>
        <Col md={1}>
          <Button variant="outline-danger" onClick={logoutHandler}>
            Logout
          </Button>
        </Col>
      </Row>


     
    </Container>
  );
};

export default Dashboard;
