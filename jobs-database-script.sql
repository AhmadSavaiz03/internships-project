-- \i 'C:/Users/dell/Documents/Projects/Internships_First_Draft/jobs-database-script.sql'

DROP DATABASE IF EXISTS jobsdatabase;

CREATE DATABASE jobsdatabase;

\connect jobsdatabase;

DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS subscriptions;
DROP TABLE IF EXISTS messages;

CREATE TABLE jobs (
  id BIGSERIAL PRIMARY KEY, 
  title VARCHAR(100) NOT NULL,
  description TEXT,
  company VARCHAR(100),
  location VARCHAR(100),
  keywords TEXT[],
  date_posted TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  subscribed_roles TEXT[],
  subscribed_locations TEXT[],
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(100),
  location VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  user_email VARCHAR(100),
  title VARCHAR(100),
  question TEXT,
  admin_email VARCHAR(100),
  response TEXT,
  closed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- example
INSERT INTO jobs (title, description, company, location, keywords, date_posted) VALUES
  ('Frontend Developer Intern', 'Develop frontend applications...', 'Tech Company A', 'Dubai', ARRAY['React', 'JavaScript'], '2024-06-01 10:00:00'),
  ('Backend Developer Intern', 'Develop backend services...', 'Tech Company B', 'Dubai', ARRAY['Node.js', 'Express'], '2024-06-02 11:00:00'),
  ('Data Scientist Intern', 'Analyze data and build models...', 'Analytics Co', 'Dubai', ARRAY['Python', 'Machine Learning'], '2024-06-03 12:00:00'),
  ('Marketing Intern', 'Assist with marketing campaigns...', 'Marketing Agency', 'Abu Dhabi', ARRAY['SEO', 'Content Creation'], '2024-06-04 09:00:00'),
  ('Product Manager Intern', 'Help manage product lifecycle...', 'Product Co', 'Sharjah', ARRAY['Product Management', 'Agile'], '2024-06-05 08:00:00'),
  ('UI/UX Designer Intern', 'Design user interfaces...', 'Design Studio', 'Dubai', ARRAY['Figma', 'Adobe XD'], '2024-06-06 14:00:00'),
  ('Sales Intern', 'Assist with sales strategies...', 'Sales Corp', 'Abu Dhabi', ARRAY['Salesforce', 'CRM'], '2024-06-07 13:00:00'),
  ('HR Intern', 'Support HR activities...', 'HR Solutions', 'Dubai', ARRAY['Recruitment', 'Employee Engagement'], '2024-06-08 15:00:00'),
  ('Finance Intern', 'Assist with financial analysis...', 'Finance Firm', 'Dubai', ARRAY['Excel', 'Financial Modeling'], '2024-06-09 16:00:00'),
  ('IT Support Intern', 'Provide IT support...', 'IT Services', 'Dubai', ARRAY['Technical Support', 'Troubleshooting'], '2024-06-10 17:00:00');

INSERT INTO users (username, password, email) VALUES
  ('john_doe', 'hashed_password', 'john@example.com');

INSERT INTO subscriptions (user_id, role, location) VALUES
  (1, 'Frontend Developer', 'Dubai');

INSERT INTO messages (user_email, title, question, admin_email, response, closed) VALUES
  ('john@example.com', 'Issue with login', 'I cannot log in...', 'admin@example.com', 'Please reset your password...', FALSE);
