


class ActionEndAI extends ActionBase {

    constructor(world, person) {
        super(world, person);

        this.machine = 'endAI';
        this.desc    = 'will set all your goals as accomplished';
        this.format  = '{"action":"endAI"}';
    }

    execute(infos) {
        this.world.writerActions.writeMsgFromSomeone(this.person.getName(), 'All goals are complete.');
        console.warn(this.person.getName() + ' ------ world has been terminated');

        // Complete goals
        // this.world.memory.writeMemory(this.person.getName() + ' accomplished all of his goals');
        this.person.memory.writeMemory('You accomplished all of your goals');

        this.person.goals.accomplishAllGoals();

        return {
            executed: true,
            newActions: []
        }
    }
}

window.ActionEndAI = ActionEndAI;