# Project Deployment Guide
This guide will help you set up and deploy this react.js application to Netlify.

## Prerequisites

Before you begin, make sure you have the following installed:

Node.js and npm
Git

## Getting Started

1. Clone the repository to your local machine:

`git clone https://github.com/PoojaPatel9123/IdeaTheorem.git`

2. Navigate to the project directory:

`cd <project_directory>`

3. Install dependencies:

`npm install``

### Development Server

To run the app locally, use the following command:

`npm start`

This will start a development server at http://localhost:3000.


## Deployment to Netlify

1. Sign up or log in to Netlify.

2. Once logged in, click on the "New site from Git" button on your dashboard.

3. Choose your Git provider and select the repository containing React.js app.

4. Configure your build settings:

    Build command: npm run build
    Publish directory: build/

5. Click on "Deploy site".

6. Once the deployment is complete, Netlify will provide a URL to access live application.
