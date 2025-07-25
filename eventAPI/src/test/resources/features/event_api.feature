Feature: Event API

  Background: 
    Given the Event API is running

  Scenario: Listing all events
    When I send a GET request to "/eventAPI/list"
    Then the response status should be 200
    And the response should contain a list of events

  Scenario: Creating a new event
    Given an event payload with title "New Event", description "Annual meetup", date "2024-12-01T10:00:00", location "New York", and organizer "StackOps"
    When I send a POST request to "/eventAPI/create" with the event payload
    Then the response status should be 201
    And the response should contain the event with title "New Event"

  Scenario: Retrieving an event by ID
    Given an event exists with ID 1
    When I send a GET request to "/eventAPI/1"
    Then the response status should be 200
    And the response should contain the event with ID 1

  Scenario: Updating an event by ID
    Given an event payload with title "Updated Event", description "Updated description", date "2024-12-10T15:00:00", location "San Francisco", and organizer "Updated Organizer"
    When I send a PUT request to "/eventAPI/1" with the event payload
    Then the response status should be 200
    And the response should contain the event with title "Updated Event"