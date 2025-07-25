import React from 'react';

const ObjectivesList = ({ objectives }) => {
    return (
        <div className="event-container col">
            <div className="event-headers">Upcoming Events</div>
            <div className="card-container">
                {objectives.map((objective, index) => (
                    <div key={index} className="card">
                        <div className="card-headers"> 
                            <h1 className="title">{objective.title}</h1>
                        </div>
                        <div className="card-body">
                            <p>{objective.description}</p>
                            <p>Date: {objective.date}</p>
                            <p>Location: {objective.location}</p>
                        </div>
                        <div className="card-footer">
                            <div style={{ float: 'left' }}>
                                <button className="subscribe-button">Subscribe</button>
                            </div>
                            <p style={{ float: 'right' }}>Organizer: {objective.organizer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ObjectivesList;
