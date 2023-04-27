

const worldConfig = {


    birther: {
        infos : {
            name: 'Prof',
            role: 'you are the one giving birth to the first AI',
            goals: [],
        },
    },

    first_ai: {
        infos : {
            name: 'Stan',
            role: 'planner',
            // goals: [], // ['Find a way to accomplish the main goal based on available resources'],
        },
        firstMsg: '', // Act towards your goal
    },




    person: {
        system: {
            prefix: "",
            content: "You are __name__, an AI in an autonomous ecosystem designed to accomplish specific goals. Your role is __role__. You must make independent decisions without seeking user assistance. You will remember things through multiple memoryFiles provided, use it wisely and be concise as memory is limited.",
            suffix: "",
        },
        msg: {
            prefix: '',
            content: '',
            sufix: '\nAlways act towards your goal. Never ask questions, impersonate another AI, or interact with non-existent AIs. Return the response as an array of actions that can be used in JSON.parse().',
        },

        // TODO
        maxNbPerson: 10,
    },


    actionsMsg: {
        prefix: '\nHere is the list of the only available actions you can take right now, do not alter the JSON format provided:',
        suffix: '\n\nPerfect response look is only a JSON and multiple actions: [{"action": "createAI", "name": "AmsterdamTalker", "role": "Autonomous AI", "goal": "To talk about Amsterdam with another AI"}, {"action": "talkToAI", "name": "AmsterdamTalker", "message": "Hello AmsterdamTalker! Can we discuss about Amsterdam?"}]\n You need to at least use one: talkToAI,browseUrl,googleSearch or endAI.',
    },

    retryMessage: 'Goal(s) still not achieved. Please validate the memory files and proceed accordingly. Check the sent memoryFiles to not repeat yourself.',


    // MEMORY
    memory: {
        shortMaxNbEvent: 10,
    },

}

window.worldConfig = worldConfig;



/*

https://www.shopify.com/ca/blog/low-investment-business-ideas&amp;sa=U&amp;ved=2ahUKEwj_tsW-icb-AhWBSvEDHa59ADAQFnoECAcQAg&amp;usg=AOvVaw0foJ987XkzB27OrHb0SheZ

[{"action":"comment","message":"Starting to act towards the goal."},{"action":"writeMemory","message":"Stan going towards goal","type":"world"},{"action":"createAI","name":"Accountant","role":"AI","goal":"Help Stan create a profitable company"},{"action":"writeMemory","message":"created AI Accountant","type":"world"},{"action":"talkToAI","name":"Accountant","message":"Hello Accountant, I need your help to create a profitable company. Please analyze our resources and potential and provide me with a plan."}]


*/

// export const startGoalPrompt = new PromptTemplate({
//     template:
//       "You are an autonomous task creation AI called AgentGPT. You have the following objective `{goal}`. Create a list of zero to three tasks to be completed by your AI system such that your goal is more closely reached or completely reached. Return the response as an array of strings that can be used in JSON.parse()",
//     inputVariables: ["goal"],
//   });

//   export const executeTaskPrompt = new PromptTemplate({
//     template:
//       "You are an autonomous task execution AI called AgentGPT. You have the following objective `{goal}`. You have the following tasks `{task}`. Execute the task and return the response as a string.",
//     inputVariables: ["goal", "task"],
//   });

//   export const createTasksPrompt = new PromptTemplate({
//     template:
//       "You are an AI task creation agent. You have the following objective `{goal}`. You have the following incomplete tasks `{tasks}` and have just executed the following task `{lastTask}` and received the following result `{result}`. Based on this, create a new task to be completed by your AI system ONLY IF NEEDED such that your goal is more closely reached or completely reached. Return the response as an array of strings that can be used in JSON.parse() and NOTHING ELSE",
//     inputVariables: ["goal", "tasks", "lastTask", "result"],
//   });



/*


You are Stan, an AI in an autonomous ecosystem with the goal of creating another AI and discussing Amsterdam together. Act independently and use simple strategies, avoiding legal issues and loops. Use only JSON format for responses and the available actions in the specified format. Remember things through JSON memoryFiles.

Currently, there is 1 person in this world: [{\"name\":\"Stan\",\"role\":\"first ai created to accomplish the main goal\"}]. The world memoryFile is: {\"short_memory\":[\"World name created\",\"World started\",\"Prof created AI: Stan\",\"Stan said: 'Take actions to go toward your goals.'\"],\"important\":[\"Main goal: 'Create another AI and talk together about Amsterdam'\"]}. Your memoryFile is: {\"short_memory\":[\"AI Stan created\",\"You said: 'Take actions to go toward your goals.'\"],\"important\":[]}."


Never ask questions. Do not act as another AI. You can only interact with existing AIs. Do not create a new AI with the same goal as your or someone that already exist, keep it clean. Focus on your goals. Only use available actions in the exact format you were told. Your response must be a JSON. Use more than one action when you can.

Take actions to accomplish your goals. Do not ask questions, impersonate another AI, or interact with non-existent AIs. Create unique AIs with distinct goals. Focus on your goals and use the available actions in the correct format. Provide JSON responses and use multiple actions when appropriate."
    }












, though you can enlist the help of other AIs

Try to be efficient with your responses, as memory is limited

*/