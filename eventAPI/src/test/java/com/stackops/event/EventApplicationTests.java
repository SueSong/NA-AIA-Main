package com.stackops.event;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;

import static org.hamcrest.Matchers.containsString; // Add this import
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class EventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private EventService eventService;

    @InjectMocks
    private EventController eventController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(eventController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void listEvents() throws Exception {
        EventEntity event = new EventEntity();
        event.setId(974329578L);
        event.setTitle("Test Event 111");
        event.setDescription("Test Description");
        event.setDate(null); // Set appropriate date
        event.setLocation("Toronto");

        when(eventService.listEvents()).thenReturn(Collections.singletonList(event));

        mockMvc.perform(get("/eventAPI/list"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].location").value("Toronto"));
    }

    @Test
    void createEvent() throws Exception {
        EventEntity event = new EventEntity();
        event.setId(12345678L);
        event.setTitle("New Event");
        event.setDescription("New Description");
        event.setDate(null); // Set appropriate date
        event.setLocation("New Location");

        when(eventService.createEvent(any(EventEntity.class))).thenReturn(event);

        mockMvc.perform(post("/eventAPI/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(event)))
                .andExpect(status().isCreated());
    }

    @Test
    void getEventById() throws Exception {
        long eventId = 12345678L;
        EventEntity event = new EventEntity();
        event.setId(eventId);
        event.setTitle("Event by ID");
        event.setDescription("Description");
        event.setDate(null); // Set appropriate date
        event.setLocation("Location");

        when(eventService.getEventById(eventId)).thenReturn(event);

        mockMvc.perform(get("/eventAPI/{id}", eventId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Event by ID"));
    }

    @Test
    void updateEvent() throws Exception {
        long eventId = 12345678L;
        EventEntity updatedEvent = new EventEntity();
        updatedEvent.setId(eventId);
        updatedEvent.setTitle("Updated Event");
        updatedEvent.setDescription("Updated Description");
        updatedEvent.setDate(null); // Set appropriate date
        updatedEvent.setLocation("Updated Location");

        when(eventService.updateEvent(eq(eventId), any(EventEntity.class))).thenReturn(updatedEvent);

        mockMvc.perform(put("/eventAPI/{id}", eventId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedEvent)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Event"));
    }

    @Test
    void deleteEvent() throws Exception {
        long eventId = 12345678L;
        when(eventService.deleteEvent(eventId)).thenReturn(true);

        mockMvc.perform(delete("/eventAPI/{id}", eventId))
                .andExpect(status().isNoContent());
    }

    @Test
    void deleteEventNotFound() throws Exception {
        long eventId = 98435L;
        when(eventService.deleteEvent(eventId)).thenReturn(false);

        mockMvc.perform(delete("/eventAPI/{id}", eventId))
                .andExpect(status().isNotFound());
    }
}
