


class ActionBase {

    constructor(world, person) {
        this.machine = 'baseAction';
        this.desc    = '';
        this.format  = '{"action":"baseAction"}';
        this.async   = false;
        this.enable  = true;

        this.person = person;
        this.world  = world;
    }

    mergeAction(action, actions) {
        actions.push(action);
        return actions;
    }

    writeMemoryStart(infos) {
        // this.world.writerTalking.writeMsgFromSomeone(this.person.getName(), 'Non configured action');
        // this.world.writerActions.writeMsgFromSomeone('to: ' + this.person.getName(), 'asked to talk : ' + infos.message);
        // Add infos to memory files
        // this.world.memory.writeMemory(this.person.getName() + ' was asked: "' + infos.message + '"');
        // this.person.memory.writeMemory('You were asked: "' + infos.message + '"');
    }

    writeMemoryEnd(infos) {}

    execute(infos) {
        this.writeMemoryStart(infos);

        // this.world.writerActions.writeNotice('Max iteration achieved - World Ended');
        // this.world.writerActions.writeMsgFromSomeone(this.person.getName(), ' world has been terminated.');
        // console.warn('WORLD ENDED  ----- Max iteration achieved')

        // this.writeMemoryEnd(infos);

        return {
            executed: true
        };
    }
}

window.ActionBase = ActionBase;