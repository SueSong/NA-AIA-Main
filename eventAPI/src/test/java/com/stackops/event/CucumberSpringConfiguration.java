package com.stackops.event;

import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@CucumberContextConfiguration
@SpringBootTest
// @TestPropertySource(properties = {
//     "event.api.baseUrl=http://localhost:8082/" // Set API base URL here
// })
//added "test"
@TestPropertySource(properties = {
    "event.api.baseUrl=http://localhost:8080/","spring.profiles.active=test" // Set API base URL here
})
public class CucumberSpringConfiguration {
    // No additional code is required here
}

