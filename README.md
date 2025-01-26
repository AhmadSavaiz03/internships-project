# Internship Finder (in progress)

I created this project to help students, like myself, find internships based on time period and geography without relying on career advising centers. Many students lack the guidance that some schools and services offer, and I hope this tool can serve as an alternative. The goal is to enable students to research various internship roles, their timelines, descriptions, and keywords, while keeping track of them geographically and chronologically.

This screenshot provides an idea of the design:
![Internship Finder Design](https://github.com/user-attachments/assets/a7dd4aa6-5922-4dd5-8768-e7d66a850378)

## Project Overview

The project revolves around a PostgreSQL database populated with job postings using Python web scraping. PostgreSQL was chosen for its scalability and compatibility with other technologies in the stack. Python was selected due to my prior experience with it and its powerful data manipulation capabilities, especially with the Pandas library. Additionally, Python's natural language processing (NLP) capabilities allow me to extract keywords from job descriptions and classify job postings.

### Key Components

- **Database (PostgreSQL):** Stores internship postings, user data, and subscription preferences. PostgreSQL is ideal for handling the scalability and complexity of this project.
  
- **Web Scraping (Python):** Python scripts are used to scrape job postings from various sources. These postings are processed and stored in the database. The Pandas library simplifies data manipulation, while Python's NLP tools help analyze job descriptions for keyword extraction and classification.
  
- **Email Notifications (Python):** Python also handles sending periodic emails to users based on their subscriptions and corresponding job postings in the database.
  
- **Backend (SpringBoot/Java):** The backend is a SpringBoot Java server that provides RESTful APIs for the frontend. It also handles user inputs for subscription management and sign-in. I chose Java for its simplicity on the server side and the availability of annotations that streamline development.
  
- **Frontend (React):** The frontend is built with React, utilizing the Java APIs to display a user-friendly webpage. React is a natural choice for frontend development due to its flexibility and my prior experience with it.

### User Experience

Users sign in to the application and can then view internship postings based on their selected timeline, role, and geography. They can also subscribe to specific roles and regions to receive daily email updates if new postings are added to the database. This functionality simplifies internship searching by consolidating everything into one app, eliminating the need to sift through multiple descriptions to find suitable opportunities based on location and timing.

Furthermore, the keyword extraction feature helps users tailor their resumes to match specific internships. The role classifications assist users in planning and conducting targeted research for each opportunity.

### Authentication

I use Okta for user authentication, ensuring a secure and reliable sign-in process.

### Current Status and Future Goals

This is an ambitious project that is still in progress. My aim is to refine it into a fully functional tool that could potentially be scaled into a startup if it proves successful.
