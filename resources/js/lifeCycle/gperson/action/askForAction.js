


class ActionAskForAction {

    constructor(world, person) {
        this.machine = 'askForAction';
        this.desc    = 'ask for a new action to be created for you to use';
        this.format  = '{"action":"askForAction", "description":"description of the new action"}';
        this.async   = false;
        this.enable  = true;

        this.person = person;
        this.world  = world;
    }

    writeMemoryStart(infos) {
        this.world.memory.writeMemory(this.person.getName() + ' use askForAction: "' + infos.message + '"');
        this.person.memory.writeMemory('You use: "' + infos.message + '"');
    }

    execute(infos) {
        this.writeMemoryStart(infos);

        $('#new_action').append('<br>New Action : ' + infos.message);

        return {
            executed: true
        };
    }
}

window.ActionAskForAction = ActionAskForAction;