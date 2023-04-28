# G-Recursive: AI-Driven Autonomous Virtual World

G-Recursive is an AI-driven autonomous virtual world where artificial intelligence agents interact, perform actions, and achieve goals within a simulated environment. Users can set main goals, and the application automates the rest of the process.

## Features

-   AI-driven agents with unique roles, goals, and memories.
-   Dynamic interactions between agents and the world.
-   Automated decision-making and execution of actions.
-   Memory management for agents and the world.
-   API integration with OpenAI GPT for generating human-like responses.
-   Simple user interface to set goals and start the simulation.

<br/>
<hr>

<br/>
<br/>

# Logic

Here's an overview of the global logic of your code and how the different components interact with each other:

# WorldCycle:

This class represents a world with its own state, goals, persons, and memory. It is responsible for managing the world and interacting with the persons in it.

## Main responsibilities include:

-   Initializing the world with its ID, name, and goals.
-   Creating and managing persons (GPerson instances) in the world.
-   Starting the world by setting the main goal and initializing the first person.
-   Updating the world state and handling the UI updates associated with it.
-   Providing methods to find persons and get information about them.

# GPerson:

This class represents a person in the world, with its own name, role, goals, memory, and actions.

## Main responsibilities include:

-   Initializing the person with its configuration and world.
-   Organizing, executing, and managing actions.
-   Deciding when to finish acting based on the person's goals.
-   Communicating with the WorldCycle instance to interact with other persons and update the world state.

# Actions:

Actions are objects that represent specific tasks or behaviors that a person can perform. Each action has its own execution logic and can interact with the person and the world.

## Main responsibilities include:

-   Defining the execution logic for each action.
-   Handling any additional data or properties needed for the action.
-   Returning the execution result and any new actions that need to be performed.

# Memory:

This class is responsible for storing and managing memories for both the world and persons.

## Main responsibilities include:

-   Storing memory entries.
-   Writing new memory entries with optional tags.
-   Retrieving memory entries based on specific criteria.
-   These components work together to simulate a world with persons who can perform actions, interact with each other, and achieve their goals. By breaking down the code into these distinct classes and modules, you can better understand the overall logic and responsibilities of each component.
