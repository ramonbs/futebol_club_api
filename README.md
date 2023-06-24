# futebol_club_api

Application for my final exam in the back-end course using typescript, OOP, Docker and Sequelize ORM.

## Installation
To install the futebol_club_api, please follow the steps below:

> Ensure that you have Node.js version 18 and npm installed on your computer. If you don't, you can download them from the official Node.js website: https://nodejs.org/en/. I recommend using NVM for managing Node.js versions, which you can download from the official NVM repository: https://github.com/nvm-sh/nvm.

Clone this repository to your local machine using the following command:

```
git clone git@github.com:ramonbs/futebol_club_api.git
```
Navigate to the project directory:

```
cd futebol_club_api
```

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

Navigate to the back-end directory:

```
cd app/back-end
```

Install the dependencies:

```
npm i
```

Start the development server:

```
npm run dev
```
> This will start a development server, allowing you to view the application in your web browser. By default, the API will be available at http://localhost:5173.
