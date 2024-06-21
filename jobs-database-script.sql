-- Drop the database if it exists
DROP DATABASE IF EXISTS jobsdatabase;

-- Create the database
CREATE DATABASE jobsdatabase;

-- Connect to the database
\connect jobsdatabase;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS subscriptions;
DROP TABLE IF EXISTS messages;

-- Create the jobs table
CREATE TABLE jobs (
  id BIGSERIAL PRIMARY KEY,  -- Auto-incrementing primary key
  title VARCHAR(100) NOT NULL,  -- Job title, not nullable
  description TEXT,  -- Job description
  company VARCHAR(100),  -- Company name
  location VARCHAR(100),  -- Job location, single value
  keywords TEXT[],  -- Array of keywords
  date_posted TIMESTAMPTZ,  -- Date posted with timezone
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  -- Record creation timestamp
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP  -- Record update timestamp
);

-- Create the users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,  -- Auto-incrementing primary key
  username VARCHAR(50) NOT NULL UNIQUE,  -- Unique username, not nullable
  password VARCHAR(255) NOT NULL,  -- Password, not nullable
  email VARCHAR(100) NOT NULL UNIQUE,  -- Unique email, not nullable
  subscribed_roles TEXT[],  -- Array of roles the user is subscribed to
  subscribed_locations TEXT[],  -- Array of locations the user is subscribed to
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  -- Record creation timestamp
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP  -- Record update timestamp
);

-- Create the subscriptions table
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,  -- Auto-incrementing primary key
  user_id INT REFERENCES users(id) ON DELETE CASCADE,  -- Foreign key to users table
  role VARCHAR(100),  -- Role the user is subscribed to
  location VARCHAR(100),  -- Location the user is subscribed to
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  -- Record creation timestamp
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP  -- Record update timestamp
);

-- Create the messages table
CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,  -- Auto-incrementing primary key
  user_email VARCHAR(100),  -- Email of the user sending the message
  title VARCHAR(100),  -- Title of the message
  question TEXT,  -- User's question
  admin_email VARCHAR(100),  -- Admin's email
  response TEXT,  -- Admin's response
  closed BOOLEAN DEFAULT FALSE,  -- Status of the message (open/closed)
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  -- Record creation timestamp
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP  -- Record update timestamp
);

-- Example insertions to validate the schema (can be removed in production)
INSERT INTO jobs (title, description, company, location, keywords, date_posted) VALUES
  ('Frontend Developer Intern', 'Develop frontend applications...', 'Tech Company', 'Dubai', ARRAY['React', 'JavaScript'], '2023-06-01 10:00:00');

INSERT INTO users (username, password, email) VALUES
  ('john_doe', 'hashed_password', 'john@example.com');

INSERT INTO subscriptions (user_id, role, location) VALUES
  (1, 'Frontend Developer', 'Dubai');

INSERT INTO messages (user_email, title, question, admin_email, response, closed) VALUES
  ('john@example.com', 'Issue with login', 'I cannot log in...', 'admin@example.com', 'Please reset your password...', FALSE);
