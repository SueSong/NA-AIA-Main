package com.stackops.event;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public EventEntity createEvent(EventEntity event) {
        eventRepository.save(event);
        return event;
    }

    public List<EventEntity> listEvents() {
        return eventRepository.findAll();
    }

    public EventEntity getEventById(Long id) { 
        return eventRepository.findById(id).orElse(null);
    }

    public boolean deleteEvent(long id) { 
        eventRepository.deleteById(id);
        return !eventRepository.existsById(id);
    }

    public EventEntity updateEvent(long id, EventEntity updatedEvent) { 
        return eventRepository.findById(id)
                .map(event -> {
                    event.setTitle(updatedEvent.getTitle());
                    event.setDescription(updatedEvent.getDescription());
                    event.setLocation(updatedEvent.getLocation());
                    event.setDate(updatedEvent.getDate());
                    event.setOrganizer(updatedEvent.getOrganizer());
                    return eventRepository.save(event);
                })
                .orElse(null);
    }

}