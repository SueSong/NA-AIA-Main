package com.stackops.event;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin 
@RequestMapping("/eventAPI")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/list")
    public ResponseEntity<List<EventEntity>> listEvents() {
        List<EventEntity> events = eventService.listEvents();
        return ResponseEntity.ok(events);
    }

    @PostMapping("/create")
    public ResponseEntity<EventEntity> createEvent(@RequestBody EventEntity event) {
        EventEntity createdEvent = eventService.createEvent(event);
        return ResponseEntity.created(URI.create("/events/" + createdEvent.getId())).body(createdEvent);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventEntity> getEventById(@PathVariable Long id) { // Changed to String
        EventEntity event = eventService.getEventById(id);
        if (event != null) {
            return ResponseEntity.ok(event);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventEntity> updateEvent(@PathVariable Long id, @RequestBody EventEntity updatedEvent) { // Changed to String
        EventEntity event = eventService.updateEvent(id, updatedEvent);
        if (event != null) {
            return ResponseEntity.ok(event);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) { // Changed to String
        boolean deleted = eventService.deleteEvent(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/subscribe")
    public ResponseEntity<Void> subscribeToEvent(@PathVariable UUID eventId) {
        // Implement logic to subscribe the current authenticated user to the event
        // ...
        return ResponseEntity.ok().build();
    }

    @GetMapping("/subscribe/{eventId}")
    public ResponseEntity<Boolean> isSubscribedToEvent(@PathVariable UUID eventId) {
        // Implement logic to check if the current authenticated user is subscribed to the event
        // ...
        return ResponseEntity.ok(true); // Replace with actual check result
    }

 
}