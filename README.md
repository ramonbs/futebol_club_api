# Futebol Club API

Application for my final exam in the back-end course using typescript, OOP, Docker and Sequelize ORM.

## Installation
To install the futebol_club_api, please follow the steps below:

> Ensure that you have Node.js version 18 and npm installed on your computer. If you don't, you can download them from the official Node.js website: https://nodejs.org/en/. I recommend using NVM for managing Node.js versions, which you can download from the official NVM repository: https://github.com/nvm-sh/nvm.

1. Clone this repository to your local machine using the following command:

```
git clone git@github.com:ramonbs/futebol_club_api.git
```
2. Navigate to the project directory:

```
cd futebol_club_api
```

3. Install the required dependencies in front and back using npm:

```
npm install:apps
```

> This command will install all the required packages, including ESLint, RTL, Jest, Node, TypeScript, and other necessary dependencies.

## Running Containers (Docker)
To start all the necessary containers for running the application, execute the following command:

```
npm compose:up
```

> This command will execute a docker-compose up to start the required containers.

## Usage
To run the application, use the following commands:

1. Navigate to the back-end directory:

```
cd app/back-end
```

2. Install the dependencies:

```
npm i
```

3. Start the development server:

```
npm run dev
```

> This will start a development server, allowing you to view the application in your web browser. By default, the API will be available at http://localhost:5173.
