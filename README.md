
This repository showcases a project built with NestJS, aimed at constructing an event-driven architecture using RabbitMQ. The primary focus of the project is the implementation of event sourcing with an automated retry mechanism. Uniquely, the event sourcing in this project is designed such that developers only need to focus on publishing events. The system handles the rest, efficiently ensuring the execution and persistence of events. This approach provides a robust architecture that minimizes developer overhead and maximizes system resilience.

For you to be able to run this project:

``` 
npm install
```

``` 
docker-compose up -d
```
