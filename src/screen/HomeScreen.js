import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { LinkContainer } from 'react-router-bootstrap';
import CreateEventForm from '../components/CreateEventForm';
import { getUserEvents } from '../action/eventAction';

const HomeScreen = ({ history }) => {
  const [lgShow, setLgShow] = useState(false);

  const dispatch = useDispatch();

  const createEvent = useSelector((state) => state.createEvent);
  const { events } = createEvent;

  const getUser = useSelector((state) => state.getUser);
  const { user } = getUser;

  const getEvents = useSelector((state) => state.getEvents);
  const { event } = getEvents;

  useEffect(() => {
    if (!user) {
      history.push('/login');
    } else {
      // let filterUserEvent = events.filter((event) => event.user === user._id);
      dispatch(getUserEvents());
    }
  }, [history, user, dispatch, events]);

  const handleDelete = (id) => {
    let newArray = [...events];
    for (let index = 0; index < newArray.length; index++) {
      const eventToDelete = newArray[index]._id === id;
      if (eventToDelete === true) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this again!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it',
        }).then((result) => {
          if (result.isConfirmed) {
            newArray.splice(index);
            localStorage.removeItem('events');
            localStorage.setItem('events', JSON.stringify(newArray));

            Swal.fire('Deleted!', 'The event has been deleted.', 'success');
            window.location.reload();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'The delete request has been cancelled :)',
              'error'
            );
          }
        });
      }
    }
  };

  return (
    <div className='pt-5'>
      <Button onClick={() => setLgShow(true)}>Create Event</Button>
      <br />
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#ID</th>
            <th> Name</th>
            <th>Date</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        {event &&
          event.map((item) => (
            <tbody key={item._id}>
              <tr>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.date.substring(0, 10)}</td>
                <td>{item.description}</td>
                <td>
                  <LinkContainer to={`/edit/${item._id}`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit fa-2x' />
                    </Button>
                  </LinkContainer>

                  <Button
                    variant='light'
                    className='btn-sm'
                    onClick={() => handleDelete(item._id)}
                  >
                    <i
                      className='fas fa-trash-alt fa-2x'
                      style={{ color: 'hotpink' }}
                    />
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
      </Table>
      <CreateEventForm lgShow={lgShow} setLgShow={setLgShow} />
    </div>
  );
};

export default HomeScreen;
