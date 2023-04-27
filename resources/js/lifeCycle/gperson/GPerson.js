


class GPerson {

    constructor(config, world) {
        this.infos         = config.infos;
        this.messageConfig = config.messageConfig;

        this.name  = config.infos.name;
        this.role  = config.infos.role;
        this.goals = new Goals(config.infos.goals);
        this.world = world;

        this.memory = new Memory('person', config.infos.name + ' creation');

        this.actionslist = [];
        this.actionslist.push(new ActionCreateAi(world, this));
        this.actionslist.push(new ActionEndAI(world, this));
        this.actionslist.push(new ActionTalkToAI(world, this));
        this.actionslist.push(new ActionSaySomething(world, this));
        this.actionslist.push(new ActionCompleteGoal(world, this));
        this.actionslist.push(new ActionWriteMemory(world, this));
        this.actionslist.push(new ActionGoogleSearch(world, this));
        this.actionslist.push(new ActionBrowseUrl(world, this));
        this.actionslist.push(new ActionAskForAction(world, this));
        this.actionslist.push(new ActionAddGoal(world, this));
        // // this.actionslist.push(new ActionExecJs(world, this));
        // this.actionslist.push(new ActionExecPHP(world, this));
        // this.actionslist.push(new ActionAskUserInfos(world, this));

        this.lastMessageGPT = '';
        this.isWaiting      = false;
    }


    organizedAction(actions) {
        // Format actions and organized them properly
        var sortedActions = [];

        // Add rules for order
        // Todo make this better somewhere
        // CUT whenever I see talkToAI / googleSearch / browseUrl
        var toContinueToAdd = true;

        for (const action of actions) {
            const realAction = this.getProperAction(action.action);

            if (toContinueToAdd) {
                if (realAction != null) {
                    if (sortedActions[realAction.machine] === undefined) {
                        sortedActions[realAction.machine] = []
                    }

                    sortedActions[realAction.machine] = realAction.mergeAction(action, sortedActions[realAction.machine]);

                    if (realAction.async) {
                        toContinueToAdd = false;
                    }
                } else {
                    var msg = 'Unkown action asked';
                    console.error(msg, action);
                    // this.world.memory.writeMemory(msg);
                    this.memory.writeMemory(msg);
                    this.person.executeActions([{
                        action : 'askForAction',
                        description : actions.machine,
                    }])
                }
            }
        }



        var returnAction = [];
        var asyncFunction = null;
        for (const actionList of this.actionslist) {

            if (sortedActions[actionList.machine] !== undefined) {
                for (const action of sortedActions[actionList.machine]) {

                    if (actionList.async) {
                        asyncFunction = action;
                    } else {
                        returnAction.push(action);
                    }
                }
            }
        }

        if (asyncFunction != null) {
            returnAction.push(asyncFunction);
        }

        return returnAction;
    }


    executeActions(actions) {
        var didAllActions = true;
            actions       = this.organizedAction(actions);

        // Still action to do
        for (const action of actions) {
            var response = this.executeAction(action);

            if (!response.executed) {
                didAllActions = false;
            }
        }

        if (this.getName() == 'Prof') {
            return;
        }

        // Still acting?
        if (actions.length <= 0 || didAllActions) {
            this.finishActing();
        }
    }

    executeAction(action) {
        console.warn(this.getName() + ' ----- EXECUTE ACTION', action);

        // Validate max iteration
        this.world.$maxIteration.val(this.world.$maxIteration.val() - 1);
        if (this.world.$maxIteration.val() <= 0) {
            this.world.writerActions.writeNotice('Max iteration achieved - World Ended');
            console.warn('WORLD ENDED  ----- Max iteration achieved');
            return false;
        }

        var returnExec = {
            executed: true,
            newActions: [],
        };

        const realAction = this.getProperAction(action.action);
        var   returnExec = realAction.execute(action);
        var   newActions = returnExec.newActions;

        // If not async
        if (!realAction.async && newActions.length > 0) {
            // Execute following actions - TODO put this outside or maybe add criticity level of task
            this.executeActions(newActions);
        } else if (realAction.async) {
            returnExec = {
                executed: false,
                newActions: [],
            }
        }

        return returnExec;
    }


    getProperAction(machineName) {
        var actionFind = null;

        for (const realAction of this.actionslist) {
            if (machineName == realAction.machine) {
                actionFind = realAction;
            }
        }

        return actionFind;
    }




    finishActing() {
        // All actions are done
        // console.log(this.getName() + ' ----- NO MORE ACTIONS');


        // Check if goals have been accomplished
        if (!this.goals.validator()) {
            console.log(this.getName() + ' ----- GOALS STILL NOT ACCOMPLISHED');

            this.world.writerActions.writeMsgFromSomeone(this.getName(), 'Goals not done, retriger talkTo');


            // Get proper message to send based on last message it said
            // Check if there is a { in the response.
            // msgBack = 'Your goals are still not achieved. Please validate the memory files and proceed accordingly.';

            // if (this.lastMessageGPT.indexOf('{') > 0) {
            //     msgBack = 'Your goals are still not achieved. Please validate the memory files and proceed accordingly.';
            // } else {
            //     console.warn('WTF', this.lastMessageGPT);
            // }

            // TODO - Add last message sent

            var msgBack = worldConfig.retryMessage;

            // Retrigger talk to continue somewhere
            this.executeActions([{
                action : 'talkToAI',
                name   : this.getName(),
                message: msgBack
            }]);
        } else {
            console.warn(this.getName() + ' ----- ALL GOALS ARE COMPLETED');
        }
    }






    ///////////////////////////////////////////////////
    // GET
    ///////////////////////////////////////////////////
    getName() {
        return this.name;
    }
    getRole() {
        return this.role;
    }
}

window.GPerson = GPerson;

