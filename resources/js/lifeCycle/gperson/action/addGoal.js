

class ActionAddGoal extends ActionBase {

    constructor(world, person) {
        super(world, person);

        this.machine = 'addGoal';
        this.desc    = 'will add a new goal to the specified AI';
        this.format  = '{"action":"addGoal", "name":"AI name", "goal":"Text describing the new goal"}';
    }


    execute(infos) {
        this.world.writerActions.writeMsgFromSomeone(this.person.getName(), ' created a new goal for ' + infos.name + ': "' + infos.goal + '"');

        if (this.person.getName() != infos.name) {
            this.person.memory.writeMemory('You created a new goal for ' + infos.name + ': "' + infos.goal + '"');
        }

        const findPerson = this.world.findPersonByName(infos.name);

        findPerson.goals.addGoal(infos.goal);

        $('.person.'+ findPerson.getName()).find('.goals').append('<br/>' + infos.goal);

        return {
            executed: true
        };
    }
}

window.ActionAddGoal = ActionAddGoal;