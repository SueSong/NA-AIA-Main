# Use the official OpenJDK image as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the target directory (change this path if necessary)
#COPY userAPI-1.0.jar app.jar
#Modify by Sue2025-08-08
COPY /build/libs/userAPI.jar app.jar
# Expose the port the app runs on 
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]