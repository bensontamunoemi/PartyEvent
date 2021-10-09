import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { register } from '../action/userAction';

const RegisterScreen = ({ history, location }) => {
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const getUser = useSelector((state) => state.getUser);
  const { user } = getUser;

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [history, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const usersFromStorage =
      localStorage.getItem('users') &&
      JSON.parse(localStorage.getItem('users'));
    const existingUser =
      usersFromStorage &&
      usersFromStorage.find(
        (user) => user.email === email || user.username === username
      );
    console.log('existingUser', existingUser);
    if (existingUser) {
      toast.error('User alredey exist');
      return;
    } else {
      dispatch(
        register({
          _id: uuidv4(),
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          password: password,
        })
      );
      window.location.href = '/';
    }
  };
  return (
    <FormContainer>
      <h1 style={{ color: 'hotpink' }} className='pt-5'>
        Sign Up
      </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='firstname'>
          <Form.Label className='pt-3'>Firstname</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your firstname'
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='lastname'>
          <Form.Label className='pt-3'>Lastname</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your lastname'
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='username'>
          <Form.Label className='pt-3'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label className='pt-3'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label className='pt-3'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your Password'
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
          Already have an accout?{' '}
          <Link to={redirect ? `login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
