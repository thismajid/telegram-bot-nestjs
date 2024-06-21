# Telegram Bot NestJS Template

This project serves as a boilerplate for building Telegram bots using the NestJS framework. It provides a structured and scalable foundation, integrating essential features and best practices to help you kickstart your Telegram bot development.

## Features

- **Telegram Bot Integration**: This app is integrated with the Telegram platform, allowing users to interact with it through the Telegram messaging app.
- **User Authentication**: The bot supports user authentication, ensuring secure access to the bot's functionalities.
- **Redis Caching**: Redis is used for caching frequently accessed data, improving the bot's performance and response times.
- **MongoDB Storage**: MongoDB is used as the primary data storage solution, allowing the bot to persist and retrieve user-related data.
- **NestJS Framework**: The bot is built using the NestJS framework, a progressive Node.js framework for building efficient and scalable server-side applications.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/thismajid/telegram-bot-nestjs.git
```

2. Install the dependencies:

```bash
cd telegram-bot-nestjs
npm install
```

3. Set up the environment variables: Create a .env file in the project's root directory and populate it with the necessary configuration values, such as Telegram bot token, Redis connection details, and MongoDB connection details.

```bash
NODE_ENV= # production | development | test
APP_PORT= # desired app running port

TELEGRAM_API_TOKEN= # bot auth token

REDIS_HOSTNAME= # redis host name
REDIS_PORT= # redis port

MONGO_INITDB_USERNAME= # mongodb init username
MONGO_INITDB_PASSWORD= # mongodb init password
MONGO_HOSTNAME= # mongodb init host name
MONGO_PORT= # mongodb port
MONGO_INITDB_DATABASE= # mongodb init database
```

Start the development server:

```bash
npm run start | or | npm run start:dev
```

### Docker

The application can also be run using Docker. Follow these steps to set up the Docker environment:

1. Build the Docker image:

```bash
docker build -t telegram-bot-nestjs .
```

2. Use the provided docker-compose.yaml file to run the bot along with its dependencies (Redis and MongoDB):

```bash
docker-compose up
```


### Contributing
Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please feel free to create a new issue or submit a pull request.
