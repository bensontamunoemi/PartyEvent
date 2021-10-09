import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import FormContainer from '../components/FormContainer';
import { singleEventAction } from '../action/eventAction';

const EventEditScreen = ({ match }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [eventArray, setEventArray] = useState(
    localStorage.getItem('events') && JSON.parse(localStorage.getItem('events'))
  );

  const eventId = match.params.id;

  const dispatch = useDispatch();

  const createEvent = useSelector((state) => state.createEvent);
  const { events } = createEvent;

  const getSingleEvent = useSelector((state) => state.getSingleEvent);
  const { singleEvent } = getSingleEvent;

  //   const eventsFromStorage =
  //     localStorage.getItem('events') &&
  //     JSON.parse(localStorage.getItem('events'));

  useEffect(() => {
    if (events) {
      let singleEvent = events.find((item) => item._id === eventId);
      dispatch(singleEventAction(singleEvent));
      setName(singleEvent.name);
      setDescription(singleEvent.description);
    }
  }, [events, dispatch, eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newArray = [...eventArray];

    for (let index = 0; index < newArray.length; index++) {
      //   console.log('newArray[index]', newArray[index]);
      let eventToUpdate = newArray[index]._id === eventId;
      if (eventToUpdate === true) {
        newArray[index].name = name;
        newArray[index].date = date;
        newArray[index].description = description;
        localStorage.removeItem('events');
        localStorage.setItem('events', JSON.stringify(newArray));
        toast.success('Successfully Updated Event');
      }
    }
    // let eventToUpdate = newArray.find((event) => event._id === eventId);
    // console.log('newArray', newArray);
  };

  return (
    <>
      <Link to='/' className='btn btn-ligth my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 style={{ color: 'hotpink' }}>Update Event</h1>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='name'>
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter event name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Label>Event Date</Form.Label>
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
          <br />
          <br />
          <Form.Group controlId='name'>
            <Form.Label>Event Description</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ height: '200px' }}
            />
          </Form.Group>
          <br />
          <Button type='submit' variant='primary' className='btn-block'>
            {' '}
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default EventEditScreen;
