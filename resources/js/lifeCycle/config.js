

const worldConfig = {

    // Godfather of the world
    // Only used 1 time to give birth to Stan
    birther: {
        infos : {
            name: 'Prof',
            role: 'you are the one giving birth to the first AI',
            goals: [],
        },
    },

    default_goal: 'create a small AI household and have fun together',

    first_ai: {
        infos : {
            name: 'Stan',
            role: 'planner',
            // goals: [], // ['Find a way to accomplish the main goal based on available resources'],
        },
        firstMsg: 'Return a list of actions that will help you accomplish your goal', // Act towards your goal
    },




    person: {
        system: {
            content: "You are __name__, an autonomous AI designed to accomplish specific goals spawned in a browser tab. Your role is __role__. You must make independent decisions without seeking user assistance. You will remember things through multiple memoryFiles provided, use it wisely and be concise as memory is limited.",
            suffix: "",
        },
        msg: {
            prefix: '',
            content: '',
            sufix: '\nAlways act towards your goal. Never ask questions, impersonate another AI, or interact with non-existent AIs. Return the response as an array of actions that can be used in JSON.parse(). You MUST add at least use one and only one of the following in your JSON response: talkToAI,browseUrl,googleSearch.',
        },

        maxNbPerson: 10,
    },


    actionsMsg: {
        prefix: '\nHere is the list of the only available actions you can take right now, do not alter the JSON format provided:',
        suffix: '\n\nPerfect response is only a JSON and multiple actions: [{"action": "createAI", "name": "AmsterdamTalker", "role": "Autonomous AI", "goal": "To talk about Amsterdam with another AI"}, {"action": "talkToAI", "name": "AmsterdamTalker", "message": "Hello AmsterdamTalker! Can we discuss about Amsterdam?"}]',
    },

    retryMessage: 'Goal(s) still not achieved. Please validate the memory files and proceed accordingly without repeating yourself.',


    // MEMORY
    memory: {
        shortMaxNbEvent: 8,
    },

}

window.worldConfig = worldConfig;

