import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'; // Renaming Calendar to BigCalendar
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Nav from "../components/Nav"; // Import the Nav component
import '../css/styles.css';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ Toggle }) => { // Destructure Toggle from props
    const [events, setEvents] = useState([]);

    const handleSelectSlot = ({ start, end }) => {
        const title = window.prompt('New Event Name');
        if (title) {
            setEvents([
                ...events,
                {
                    start,
                    end,
                    title,
                },
            ]);
        }
    };

    const handleSelectEvent = (event) => {
        const confirmDelete = window.confirm(`Do you want to delete the event '${event.title}'?`);
        if (confirmDelete) {
            setEvents(events.filter(e => e !== event));
        }
    };

    return (
        <div>
            <Nav Toggle={Toggle} /> {/* Include the Nav component and pass the Toggle prop */}
            <div className="calendar-container">
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    selectable
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, margin: "50px" }}
                />
            </div>
        </div>
    );
};

export default MyCalendar;
