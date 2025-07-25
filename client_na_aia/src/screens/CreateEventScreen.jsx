import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const CreateEventScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    date,
                    location,
                    organizer,
                    image,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            navigate('/events');
        } catch (error) {
            console.error('Error creating event:', error);
            // Handle error appropriately (e.g., display an error message)
        }
    };

    return (
        <Container>
            <h1>Create New Event</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as='textarea'
                        rows={3}
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='date'>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='location'>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter location'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='organizer'>
                    <Form.Label>Organizer</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter organizer'
                        value={organizer}
                        onChange={(e) => setOrganizer(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter image URL'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Create Event
                </Button>
            </Form>
        </Container>
    );
};

export default CreateEventScreen;