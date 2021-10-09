import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';

const LoginScreen = ({ history, location }) => {
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getUser = useSelector((state) => state.getUser);
  const { user } = getUser;

  useEffect(() => {
    if (user && user._id) {
      history.push('/');
    }
  }, [history, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const usersFromStorage =
      localStorage.getItem('users') &&
      JSON.parse(localStorage.getItem('users'));

    const authUser =
      usersFromStorage &&
      usersFromStorage.find(
        (user) => user.email === email && user.password === password
      );
    if (authUser) {
      localStorage.setItem('user', JSON.stringify(authUser));
      window.location.href = '/';
    } else {
      toast.error('User not found');
    }
  };

  return (
    <FormContainer>
      <h1 style={{ color: 'hotpink' }} className='pt-5'>
        Sign in
      </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email'>
          <Form.Label className='pt-3'>Email Address</Form.Label>
          <Form.Control
            required
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label className='pt-3'>Password</Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button type='submit' variant='primary'>
          Submit
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Dont have an accout?{' '}
          <Link to={redirect ? `register?redirect=${redirect}` : '/resgister'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
