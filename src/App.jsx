import { useState } from 'react';

import { Button, Container, IconButton, List, ListItem, Paper, TextField, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

import { Add, Delete } from '@mui/icons-material';

import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

import appStyles from './App.module.css';

function Event(e, setValue, deleteEvent) {
    const key = e.key;

    const deleteButton = (
        <IconButton edge="end" aria-label="delete"
                    onClick={() => deleteEvent(e)}>
            <Delete />
        </IconButton>);
    const time = (
        <DateTimePicker value={e.time} label="Time"
                        className={appStyles.eventDate}
                        onChange={newValue => setValue({...e, time: newValue})}
        />);
    const title = (
        <TextField value={e.title} label="Title" fullWidth
                   onChange={event => setValue({...e,
                                                title: event.target.value})}
        />);

    return <ListItem key={key} secondaryAction={deleteButton}>
        {time}{title}
    </ListItem>;
}

export default function App() {
    const [events, setEvents] = useState([{
        key: uuidv4(),
        time: dayjs().startOf('hour'),
        title: '',
    }]);

    const changeEvent = newEvent => {
        const newEvents = events.map(
            oldEvent => oldEvent.key === newEvent.key ? newEvent : oldEvent);
        setEvents(newEvents);
    };
    const deleteEvent = event => {
        const newEvents = events.filter(
            oldEvent => oldEvent.key !== event.key);
        setEvents(newEvents);
    };

    const eventElts = events.map(e => Event(e, changeEvent, deleteEvent));
    
    const addEvent = () => {
        const newEvents = events.concat([{
            key: uuidv4(),
            time: dayjs().startOf('hour'),
            title: '',
        }]);
        setEvents(newEvents);
    };

    const discordTs = events.map(e => `<t:${e.time.unix()}> ${e.title}`)
                            .join('\n') + '\n';
    
    return (
        <Container>
            <Paper>
                <List>
                    {eventElts}
                </List>
            </Paper>
            <Button variant="contained" endIcon={<Add/>}
                    color="primary" aria-label="add" onClick={addEvent}>
                Add Event
            </Button>
            <Paper sx={{mt:4, p:1}}>
                <Typography variant="h6">
                    Copy / paste this into Discord:
                </Typography>
                <Typography variant="body1" className={appStyles.discord}>
                    {discordTs}
                </Typography>
            </Paper>
        </Container>
    )
}
