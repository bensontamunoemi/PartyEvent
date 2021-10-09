import React from 'react';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, Container } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';

export const Header = ({ history }) => {
  const getUser = useSelector((state) => state.getUser);
  const { user } = getUser;

  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <i className='fas fa-glass-cheers fa-3x' />
              <strong
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: '2rem',
                  color: 'Menu',
                }}
              >
                Mass
              </strong>
              <span style={{ color: 'hotpink' }}>Event</span>
            </Navbar.Brand>
          </LinkContainer>
          <Nav className='ml-auto'>
            {user ? (
              <>
                <LinkContainer to='/'>
                  <Nav.Link>
                    <i className='fas fa-user' />
                    {' Welcome, '}
                    {user.username}
                  </Nav.Link>
                </LinkContainer>
                <Button
                  style={{ backgroundColor: 'hotpink', border: 'none' }}
                  onClick={handleLogout}
                >
                  <Nav.Link>
                    <i className='fas fa-sign-out-alt' />
                    Sign Out
                  </Nav.Link>
                </Button>
              </>
            ) : (
              <>
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-sign-in-alt' />
                    Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/register'>
                  <Nav.Link>
                    <i className='fas fa-registered' />
                    Register
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
