


class ActionSaySomething extends ActionBase {

    constructor(world, person) {
        super(world, person);

        this.machine = 'comment';
        this.desc    = 'to comment what you are doing';
        this.format  = '{"action":"comment","message":"message"}';
        this.async   = false;
        this.enable  = true;
    }

    mergeAction(action, actions) {
        if (actions.length > 0) {
            actions[0].message += '<br>' + action.message;
            return actions;
        }

        return [action];
    }

    writeMemoryEnd(infos) {
        this.world.writerActions.writeMsgFromSomeone(this.person.getName(), infos.message);
        this.world.memory.writeMemory(this.person.getName() + ' said: "' + infos.message + '"');
        this.person.memory.writeMemory('You said: "' + infos.message + '"');
    }

    execute(infos) {
        this.writeMemoryEnd(infos);

        return {
            executed: true,
            newActions: []
        };
    }
}

window.ActionSaySomething = ActionSaySomething;