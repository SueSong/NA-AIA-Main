FROM postgres:14

# Set timezone environment variables to skip interactive prompts
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC

# Install JDK, Node.js, npm, and Nginx
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    nodejs \
    npm \
    nginx \
    tzdata && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create the /app directory
RUN mkdir -p /app 
RUN mkdir -p /app/logs   

# Set environment variables for Java
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# Copy database initialization script if needed
COPY init.sql /docker-entrypoint-initdb.d/

# Start Nginx in the background
RUN echo "service nginx start" >> /usr/local/bin/start_nginx.sh && \
    chmod +x /usr/local/bin/start_nginx.sh

# Expose ports for PostgreSQL, Java, and Nginx
EXPOSE 5432 80

# Set default command for PostgreSQL
CMD ["docker-entrypoint.sh", "postgres"]
