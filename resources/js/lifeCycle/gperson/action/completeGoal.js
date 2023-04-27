


class ActionCompleteGoal extends ActionBase {

    constructor(world, person) {
        super(world, person);

        this.machine = 'completeGoal';
        this.desc    = 'will set the status of your specified goal as accomplished';
        this.format  = '{"action":"completeGoal", "id":"Goal Id"}';
        this.async   = false;
    }


    execute(infos) {
        this.world.writerActions.writeMsgFromSomeone(this.person.getName(), ' completed his goal ' + infos.id);

        this.world.memory.writeMemory(this.person.getName() + ' completed one of his goal');
        this.person.memory.writeMemory('You completed the goal id: ' +  + infos.id);

        this.person.goals.accomplishGoal(infos.id);

        return {
            executed: true,
            newActions: []
        };
    }
}

window.ActionCompleteGoal = ActionCompleteGoal;