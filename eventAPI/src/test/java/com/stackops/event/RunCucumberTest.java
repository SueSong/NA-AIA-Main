package com.stackops.event;

import org.junit.runner.RunWith;
import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = "classpath:features",
	plugin = {
	        "pretty", 
	        "html:build/reports/cucumber/cucumber-html-report.html",
	        "json:build/reports/cucumber/cucumber-report.json",
	        "junit:build/reports/cucumber/cucumber-results.xml"
	    },
    glue = "com.stackops.event"  // Adjust to the package of your step definitions
)
public class RunCucumberTest {
}
