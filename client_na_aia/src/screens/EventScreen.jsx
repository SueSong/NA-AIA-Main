import React, { useState, useEffect } from 'react';
import ObjectivesList from '../components/ObjectivesList';
import './events.css';

const EventScreen = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://stackops-dev.abilityell.com/eventAPI/list'); 
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
      <div>
        <div className="hero">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div>
                            <h1>Events and Workshop</h1>
                            <h3>Explore our calendar of conferences, workshops, and special events designed to inspire, educate, and connect the AI community.</h3>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="hero-img-wrap">
                            <img src="/images/events_image.jpg"></img>
                        </div>
                    </div>
                </div>    
            </div>
		</div>
        <div className="container row">
            <ObjectivesList objectives={events} />       

            <div className="event-container col">
                <div className="event-headers"> Workshops</div>
                <div className="card-container">
                    <div className="card">
                        <div className="card-headers">
                            <h1 className="title">Member Applications for Tech Team Released</h1>
                        </div>
                        <div className="card-body">
                            <div className="screenshot">
                                <iframe className="elementor-video" width="640" height="360" src="https://www.youtube.com/embed/z8Fco4pTwzQ?controls=1&amp;rel=0&amp;playsinline=0&amp;modestbranding=0&amp;autoplay=0&amp;start=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fvicedu.com&amp;widgetid=3" id="widget4" data-gtm-yt-inspected-18="true"></iframe>
                            </div>
                        </div>    
                        <div className="card-footer">
                            <p>Technical Director Louis: Why So Many Traditional Industries Can No Longer Be Career Choices</p>
                        </div>
                    </div>    
                </div>
            </div>        
        </div>    
      </div>
    );
};

export default EventScreen;
