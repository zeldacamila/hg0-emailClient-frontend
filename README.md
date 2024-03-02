# Email Client Project
This is the frontend interface for an email client.
Check the backend here (https://github.com/zeldacamila/hg0-emailClient-backend)

## Features

- Basic Email Sending and Receiving
- User Registration and Login System
- Email Organization
- Basic Email Search Functionality
- 
## Technologies Used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Ant Design](https://ant.design/)

## Requirements

- Typescript 5.2.2 or higher
- React 18.2.0 or higher
- Vite 5.1.4 or higher
- Antd 5.14.1 or higher
- Dayjs 1.11.10 or higher
- Reduxjs/toolkit 2.2.1 or higher

## Environment Setup

1. Clone the repository:

```bash
git clone git@github.com:zeldacamila/hg0-emailClient-frontend.git
cd email-app
npm install
npm run dev
```

## Environment Variables
These are only used for the github actions that are implemented on this repo.
To run this project, you will need to add the following environment variables to your github repository. Do not include sensitive information directly in your project files or documentation.

``` bash
DOCKER_USERNAME='your_dockerhub_user'
DOCKER_PASSWORD='your_dockerhub_password'
API_URL='your_api_url'
```

## Usage
- Access http://localhost:5173/ in your browser to interact with the application.
