# SnoopJake TEAM CHANGELOG

## SonarCloud code quality fixes

### Maintability Issues

1. On **email-app/Dockerfile**
    > **Replace 'as' with an uppercase format `AS`.**
    -    >This change was made because using uppercase in instructions enhances readability and clarity, especially during collaborations within development teams. Change date: ***17/03/2024***
    > **This line added --ignore-scripts to the RUN npm install command.**
    -    >this change was made so that npm will install the project dependencies, but will not run any scripts defined in the package.json file. Change date: ***17/03/2024***
2.  On **email-app/src/App.tsx**
    >   **Consolidated multiple calls to `./hooks` into a single line.**
    -   >This change was made because importing the same module multiple times affects code readability and maintainability. Change date: ***17/03/2024***
    >  **Removed empty <> </> enclosing the code fragment in the return statement.**
    -    >This change was made because it's redundant in React; if only one element or component is returned, <> </> tags are unnecessary. Change date: ***17/03/2024***
3. On **email-app/src/__test__/Login.test.jsx**
    > **Removed commented-out code.**
    -    >This change was made because commented-out code distracts attention from the code that is actually being executed and increases maintenance overhead. Change date: ***17/03/2024***
4. On **email-app/src/components/Login/Login.tsx**
    > **Removed empty <> </> enclosing the code fragment in the return statement.**
    -    >This change was made because it's redundant in React; if only one element or component is returned, <> </> tags are unnecessary. Change date: ***17/03/2024***
5. On **email-app/src/components/Mail/MailContainer.tsx**
    > **Consolidated multiple calls to `antd` into a single line.**
    -   > This change was made because importing the same module multiple times affects code readability and maintainability. Change date: ***17/03/2024***
6. On **email-app/src/components/Mail/MailGenericList.tsx**
    >   **Consolidated multiple calls to `./hooks` into a single line.**
    -   >This change was made because importing the same module multiple times affects code readability and maintainability. Change date: ***17/03/2024***
7. On **email-app/src/components/SignUpForm/SignUpForm.tsx**
    > **Removed empty <> </> enclosing the code fragment in the return statement.**
    -    >This change was made because it's redundant in React; if only one element or component is returned, <> </> tags are unnecessary. Change date: ***17/03/2024***
     > **Corrected the regex for password validation, as it had unnecessary character escapes triggered by a \.**
    -    >This change was made because in the special characters part [^$*.{}()?"!@#%&/\,><':;|_~], some characters are unnecessarily escaped. Within brackets [], only ^, -, ], and ` need to be escaped. The rest do not need to be escaped. Change date: ***17/03/2024***
6. On **email-app/src/store.ts**
    >Consolidated multiple calls to `@reduxjs/toolkit` into a single line.
    -    >It was changed because importing the same module multiple times affects code readability and maintainability. Change date: ***17/03/2024***

## New features

### Feature 1 -> W3C Standards
- Dont need changes
### Feature 2 -> Storybook
-

Por que fue importante (desde la perspectiva de un negocio, como si estuvieran haciendo un pitch) y que hace

mas features....


## Architectural Change

Lo que cambiamos, por qué y cómo lo cambiamos.


/
/
/
/
/
//
/
/
/




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
