


class ActionCreateAi extends ActionBase {

    constructor(world, person) {
        super(world, person);

        this.machine = 'createAI';
        this.desc    = 'create a new AI that will help you to go torward the your goals. Create unique AIs with distinct goals';
        this.format  = '{"action":"createAI","name":"Name","role":"Role","goal":"main goal"}';
        this.async   = false;
    }


    writeMemoryEnd(newPerson) {
        this.world.writerActions.writeMsgFromSomeone(this.person.getName(), 'Creation of: ' + newPerson.getName());
    }

    execute(config) {
        // Make goal an array
        config.goals = [config.goal];

        const findPerson = this.world.findPersonByName(config.name);

        if (findPerson) {
            this.person.memory.writeMemory('You tried to duplicate an AI, you can NOT do that');

            return {
                executed: false
            };

        }

        var condigAi = {
            infos : {
                name: config.name,
                role: config.role,
                goals: config.goals,
            },
        };

        // Create Object
        const newPerson = new GPerson(condigAi, this.world);

        // Add it to the world
        this.world.persons.push(newPerson);

        // Write memory
        this.writeMemoryEnd(newPerson);

        this.world.writerListing.addPerson(newPerson);

        return {
            executed: true
        };
    }
}

window.ActionCreateAi = ActionCreateAi;