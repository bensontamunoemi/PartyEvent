import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import FormContainer from './FormContainer';
import { eventCreate } from '../action/eventAction';

const CreateEventForm = ({ lgShow, setLgShow }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const getUser = useSelector((state) => state.getUser);
  const { user } = getUser;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      dispatch(
        eventCreate({
          _id: uuidv4(),
          user: user._id,
          name,
          date,
          description,
        })
      );
      toast.success('New event added successfully');
    }
  };
  return (
    <div>
      <Modal
        size='lg'
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby='example-modal-sizes-title-lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id='example-modal-sizes-title-lg'
            style={{ color: 'hotpink' }}
          >
            Create Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer>
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
                />
              </Form.Group>
              <br />
              <Button type='submit' variant='primary' className='btn-block'>
                {' '}
                Submit
              </Button>
            </Form>
          </FormContainer>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateEventForm;
