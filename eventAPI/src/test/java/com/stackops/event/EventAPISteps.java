package com.stackops.event;

import io.cucumber.java.en.*;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.beans.factory.annotation.Value;
import java.util.HashMap;
import java.util.Map;

public class EventAPISteps { 

    private RequestSpecification request;
    private Response response;
    private Map<String, Object> eventPayload;

    @Value("${event.api.baseUrl}")
    private String baseUrl;

    @Given("the Event API is running")
    public void setup() {
        RestAssured.baseURI = baseUrl;
        request = RestAssured.given().contentType("application/json");
    }

    @When("I send a GET request to {string}")
    public void iSendAGETRequestTo(String endpoint) {
        response = request.get(endpoint);
    }

    @Then("the response status should be {int}")
    public void theResponseStatusShouldBe(int expectedStatusCode) {
        assertEquals(expectedStatusCode, response.getStatusCode());
    }

    @And("the response should contain a list of events")
    public void theResponseShouldContainAListOfEvents() {
        assertTrue(response.jsonPath().getList("").size() > 0, "Expected a list of events");
    }

    @Given("an event payload with title {string}, description {string}, date {string}, location {string}, and organizer {string}")
    public void anEventPayloadWith(String title, String description, String date, String location, String organizer) {
        eventPayload = new HashMap<>();
        eventPayload.put("title", title);
        eventPayload.put("description", description);
        eventPayload.put("date", date);
        eventPayload.put("location", location);
        eventPayload.put("organizer", organizer);
        request.body(eventPayload);
    }

    @When("I send a POST request to {string} with the event payload")
    public void iSendAPOSTRequestToWithTheEventPayload(String endpoint) {
        response = request.body(eventPayload).post(endpoint);
    }

    @And("the response should contain the event with title {string}")
    public void theResponseShouldContainTheEventWithTitle(String expectedTitle) {
        String actualTitle = response.jsonPath().getString("title");
        assertEquals(expectedTitle, actualTitle, "Expected event title to match");
    }

    @Given("an event exists with ID {int}")
    public void anEventExistsWithID(int eventId) {
        // For testing, assume an event with this ID already exists or implement event setup here.
    }

    @When("I send a PUT request to {string} with the event payload")
    public void iSendAPUTRequestToWithTheEventPayload(String endpoint) {
        response = request.body(eventPayload).put(endpoint);
    }

    @And("the response should contain the event with ID {int}")
    public void theResponseShouldContainTheEventWithID(int expectedId) {
        int actualId = response.jsonPath().getInt("id");
        assertEquals(expectedId, actualId, "Expected event ID to match");
    }
}
