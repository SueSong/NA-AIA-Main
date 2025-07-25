CREATE TABLE IF NOT EXISTS na_aia_event (
    id BIGSERIAL PRIMARY KEY,          -- Automatically incrementing integer for the 'id'
    title VARCHAR(255) NOT NULL,        -- 'title' column with max length 12 characters
    description VARCHAR(255) NOT NULL,  -- 'description' column with max length 12 characters
    date TIMESTAMP NOT NULL,           -- 'date' column with timestamp type
    location VARCHAR(255) NOT NULL,     -- 'location' column with max length 12 characters
    organizer VARCHAR(64) NOT NULL     -- 'organizer' column with max length 12 characters
);

CREATE TABLE IF NOT EXISTS na_aia_user (
    id SERIAL PRIMARY KEY,              -- Auto-incremented primary key
    user_name VARCHAR(50) NOT NULL,     -- User name with a max length of 50 characters
    email VARCHAR(255) UNIQUE NOT NULL, -- Unique email with a max length of 255 characters
    password VARCHAR(255) NOT NULL,     -- Password hash stored as a string
    user_type VARCHAR(20) NOT NULL      -- User type (e.g., regular, member, administrator)
);

CREATE INDEX IF NOT EXISTS idx_na_aia_user_email ON na_aia_user(email);

-- Insert the first admin user
INSERT INTO na_aia_user (user_name, email, password, user_type)
VALUES ('Jack', 'jack@email.com', 'cHdkSmFjazIwMjIxMTI3', 'administrator');

INSERT INTO na_aia_event (title, description, date, location, organizer) 
VALUES ('AI Summit','Discuss upcoming advancements', '2025-05-15 10:00:00','Toronto','NA-AIA' );