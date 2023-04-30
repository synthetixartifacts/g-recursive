<img src="https://user-images.githubusercontent.com/131910612/235371502-a12f5ceb-1495-4cab-b192-c75d08be69bc.png" height="350"/>


[![Twitter Follow](https://img.shields.io/twitter/follow/g_prompter?style=social)](https://twitter.com/g_prompter)
<img src="https://img.shields.io/badge/lang-English-blue.svg" alt="English"></a>

<hr>  

# G-Recursive: AI-Driven Autonomous Virtual World

G-Recursive is an AI-driven autonomous virtual world where artificial intelligence agents interact, perform actions and achieve goals within a simulated environment. Users can set main goals, and the application automates the rest of the process.

<hr>

## Features

-   AI-driven agents with unique roles, goals, and memories.
-   Dynamic interactions between agents and the world.
-   Automated decision-making and execution of actions.
-   Memory management for agents and the world.
-   API integration with OpenAI GPT for generating human-like responses.
-   Simple user interface to set goals and start the simulation.

<hr>

## Available actions
Watch AI characters come to life as they work towards achieving it. They can intelligently interact with each other, remember past events, and adapt their actions to achieve the main goal you set.

Here's a list of the AI actions currently available in the virtual world:
- Create another AI agent
- Talk to a specific agent
- Add a goal
- Complete a goal
- Write in memory
- Perform a Google search
- Browse a URL
- Add a comment
- Set all goals as accomplished
- Write into a text file (downloadable)
- Write into a CSV file (downloadable)


<hr>

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
