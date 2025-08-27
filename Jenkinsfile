pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "eventapi-pr:${env.CHANGE_ID ?: 'manual'}"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build JAR') {
    steps {
        bat 'cd eventapi && gradlew clean build'
    }
    }
        stage('Build & Test in Docker') {
            steps {
                script {
                    // Build Docker image with Gradle and code
                    bat """
                        docker build -t %DOCKER_IMAGE% ./eventapi
                    """
                    // Run tests inside Docker container
                    bat """
                        docker run --rm %DOCKER_IMAGE% ./gradlew test
                    """
                }
            }
        }
    }
    post {
        always {
            // Optional: remove Docker image to save space
            bat 'docker rmi %DOCKER_IMAGE% || exit 0'
            // Publish Gradle test reports (JUnit XML)
            junit 'eventapi/build/test-results/test/*.xml'
        }
    }
}
