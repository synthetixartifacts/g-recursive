


class ActionTalkToAI extends ActionBase {

    constructor(world, person) {
        super(world, person);

        this.machine = 'talkToAI';
        this.desc    = 'to send a message/command to an AI';
        this.format  = '{"action":"talkToAI","name":"AI name","message":"Message to send to that AI"}';
        this.async   = true;

        this.openAiAPI = new OpenAiAPI;
        this.newPerson = null;
    }

    mergeAction(action, actions) {
        // merge talkto same AI together
        var returnActions = actions;
        var findPerson    = false;

        for (const listaction of actions) {
            if (action.name == listaction.name) {
                findPerson = true;
                listaction.message += ' ' + action.message;
            }

            returnActions.push(listaction);
        }

        if (!findPerson) {
            returnActions.push(action);
        }

        return returnActions;
    }

    writeMemoryStart(infos) {
        // this.world.writerActions.writeMsgFromSomeone(this.person.getName(), 'said to ' + this.newPerson.getName() + ' :' + infos.message);


        // Add infos to memory files
        if (this.newPerson.getName() == this.person.getName()) {
            // this.world.memory.writeMemory(this.person.getName() + ' asked himself : "' + infos.message + '"');
            // this.person.memory.writeMemory('You said this yourself : "' + infos.message + '"');
        } else {
            // this.world.memory.writeMemory(this.person.getName() + ' said to ' + this.newPerson.getName() + ' : "' + infos.message + '"');


            // this.world.writerActions.writeMsgFromSomeone(this.person.getName(), '<b>said to ' + this.newPerson.getName() + ':<br/> ' + infos.message + '</b>');
            // this.world.writerActions.writeMsgFromSomeone(this.newPerson.getName(), 'is thinking...');

            this.person.memory.writeMemory('You said to ' + this.newPerson.getName() + ': "' + infos.message + '"');
            this.newPerson.memory.writeMemory(this.person.getName() + ' said: "' + infos.message + '"');
        }
    }

    writeMemoryEnd(infos) {
        // this.world.writerTalking.removeLastItem();
        if (infos.first_message.length > 0) {
            this.world.writerActions.writeMsgFromSomeone(this.newPerson.getName(), infos.first_message);
        }

        // Memory Person
        // Format response for memory
        // var memoryText = 'You answered this: ' + infos.first_message + ' ' + JSON.stringify(infos.actions) + ' ' + infos.last_message;
        // this.newPerson.memory.writeMemory(memoryText);

        // Action BACK
        if (infos.actions.length > 0) {
            var actionListName = '';
            var count = 0;

            for (const action of infos.actions) {
                actionListName += action.action + ', ';
                count ++;

                // TODO - Update this logic to make this dry
                // const realAction = this.person.acti
                if (action.action == 'talkToAi' || action.action == 'browseUrl' || action.action == 'googleSearch') {
                    break;
                }
            }
            actionListName = actionListName.slice(0, actionListName.length - 2);
            var mnessageWorld = 'Responded with ' + count + ' action(s): ' + actionListName;

            this.world.writerActions.writeMsgFromSomeone(this.newPerson.getName(), mnessageWorld);
            // this.newPerson.memory.writeMemory(actionListName);
        }

        // End message
        if (infos.last_message.length > 0) {
            this.world.writerActions.writeMsgFromSomeone(this.newPerson.getName(), infos.last_message);
        }
    }

    canTalkValidation(messages) {
        // Validate interval between call
        var now         = new Date();
        var numberSpace = 60000 / $('#max-call-min').val() + 50;

        if (!this.person.isWaiting) {
            this.world.writerActions.writeMsgFromSomeone(this.person.getName(), 'Said to ' + this.newPerson.getName() + ':<br/><b>' + messages.message + '</b>');
            this.world.writerActions.writeMsgFromSomeone(this.newPerson.getName(), 'Is thinking...');
        }

        // Wait
        if (this.world.lastExecutedGPTCall !== null && now - this.world.lastExecutedGPTCall < numberSpace) {
            console.log('TIMEOUT-----------------------', 'SetTimeout Talkto -> ' + (numberSpace/1000) + 'sec');

            setTimeout(() => {
                this.execute(messages);
            }, numberSpace);

            this.person.isWaiting = true;

            return false;
        }

        return true;
    }

    async execute(infos) {
        // Find proper personne to talk to in the world
        for (const person of this.world.getPersons()) {
            if (person.name == infos.name) {
                this.newPerson = person;
            }
        }
        if (this.newPerson == null) {
            console.error('Person to talk to not found');
        }


        // Validate that we can call API
        if (!this.canTalkValidation(infos)) {
            return {
                executed: false
            }
        }

        this.world.lastExecutedGPTCall = new Date();
        this.writeMemoryStart(infos);

        // Real Send TO API
        const realMsg = this.prepareMessage(infos);

        var rawSent = '';
        for (const line of realMsg) {
            rawSent += line.content + ' ';
        }

        console.log('API SENT');
        console.warn(rawSent);


        this.world.$maxIteration.val(this.world.$maxIteration.val() - 1);

        var response = await this.openAiAPI.gptApiCall(realMsg);

        // Responded
        this.person.isWaiting = false;

        // Manage Response
        if (typeof response !== "object" && response.includes('Error fetching')) {
            this.world.writerActions.writeNotice(response, true);

            return {
                executed: false
            };
        }

        // console.log('API RESPONSE', response);

        // Write memory
        this.writeMemoryEnd(response);

        this.newPerson.executeActions(response.actions);

        // Save last lastMessageGPT
        // this.person.lastMessageGPT = response;

        return {
            executed: true
        };
    }


    ///////////////////////////////////////////////////
    // MESSAGE
    ///////////////////////////////////////////////////
    prepareMessage(infos) {
        var messages = [];

        // Add System
        messages.push({ role: 'system', content: this.getSystemMessage(infos) });

        // Add all Person from World
        const persons    = this.world.getPersonsShort();
        const personJson = this.world.getPersonsShortJSON();
        if (persons.length > 0) {
            messages.push({
                role: 'user',
                content: 'Important information: there is ' + personJson.length + ' AI(s) in this world. Here is the Ai list: ' + persons});
        }

        // MEMORY
        // messages.push({ role: 'user', content: this.getMemoryTextForGptAPI()});

        // Add message
        // FORMAT MESSAGE
        var lastMessage = this.getMemoryTextForGptAPI() + '\n\n';
        lastMessage += $('#person_user_prefix').val();
        lastMessage += infos.message;
        lastMessage += $('#person_user_suffix').val();

        messages.push({ role: 'user', content: lastMessage });


        return messages;
    }


    getSystemMessage(infos) {
        var systemMsg = '';

        systemMsg += $('#person_system_content').val().replace('__name__', this.newPerson.getName()).replace('__role__', this.newPerson.getRole());

        // Goals
        const mainGoals = this.world.goals.getGoals();
        systemMsg += '\nMain goals:\n';
        for (let i = 0; i < mainGoals.length; i++) {
            var number = i + 1;
            systemMsg += number + '. ' + mainGoals[i].getGoalText() + '\n';
        }

        // No prof goal
        const goals = this.newPerson.goals.getGoals();
        var minGoalSize = 1;
        var i = 0;
        if (this.person.getName() == 'Stan') {
            minGoalSize = 2;
            i = 1;
        }

        if (goals.length >= minGoalSize) {
            systemMsg += 'Your goals:\n';
            for (i; i < goals.length; i++) {
                var number = i + 1;
                systemMsg += number + '. ' + goals[i].getGoalText() + '\n';
            }
        }

        // ACTIONS LIST
        systemMsg += this.getPromptListOfActions();

        systemMsg += $('#person_system_suffix').val();

        return systemMsg;
    }


    getPromptListOfActions() {
        var prompt = '';

        prompt += $('#action_msg_prefix').val();

        // Loop through available actions
        for (const action of this.newPerson.actionslist) {
            if (action.enable) {
                prompt += '\n- "' + action.machine + '" ';
                prompt += action.desc;
                prompt += ' (format: ' + action.format + ')';
            }
        }

        prompt += $('#action_msg_suffix').val();

        return prompt;
    }



    getMemoryTextForGptAPI() {
        const worldMemories = this.world.memory.getMemories();
        const memories      = this.newPerson.memory.getMemories();
        var   memoryText    = '';

        memoryText += 'Use the memoryFiles below to understand the context and progress toward your goals.\n';
        memoryText += 'Here\'s the world memoryFile in JSON format: ';
        memoryText += JSON.stringify(worldMemories);
        memoryText += '\n';

        memoryText += 'Here\'s YOUR memoryFile as a list: ';
        for (const mem of memories.short_memory) {
            memoryText += '\n- "' +mem + '" ';
        }
        for (const mem of memories.important) {
            memoryText += '\n- "' +mem + '" ';
        }

        return memoryText;
    }

}

window.ActionTalkToAI = ActionTalkToAI;