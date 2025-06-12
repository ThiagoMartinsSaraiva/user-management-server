# User Management - Server

## A User Management API built using NestJS, Prisma, Docker (Postgres, Redis)

## Technologies

- Node.js

- Fastify

- NestJS

- Postgres

- Redis

- Prisma

## Running the project 
To run this Project, you need to use **Node.js** 20 and **Yarn** **Docker**

### Clone the Project
```
git clone https://github.com/ThiagoMartinsSaraiva/weather-app
```

### Installing the Dependencies
```
yarn
```

### Adding Env Variables
As you may notice, there is a **.env.example**, you can copy it and change it's name to **.env**


### Running Container
```
docker-compose up -d
```

### Setting up Prisma
```
npx prisma migrate deploy
npx ts-node ./prisma/seed.ts
```
Now you are all set up to run the project!

### Running the Code
```
yarn start
```

## Description
This API was developed to demonstrate and practice my knowledge of Node.js and NestJS. 
I built a performance focused API that uses Postgres as Database and Redis as Cache and Fastify as HTTP and Web Framework to improve performance and avoid Async/Await problems.

## Main challenges:
- Build the API focusing on Performance and Cache
- Build the API focusing on Scale and Backend Best Practices
- Add tests to ensure the useCases work as expected

## Next Steps:
- Add Tests