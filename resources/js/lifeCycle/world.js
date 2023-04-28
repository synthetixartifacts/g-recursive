

class WorldCycle {

    constructor(infos) {
        this.infos = infos;
        this.id    = infos.id;
        this.name  = infos.name;
        this.goals = new Goals(infos.goals);

        this.persons = [];
        this.memory  = new Memory('world');

        this.writerListing = new Writer(this, $('#world_listing'), 'prepend');
        this.writerActions = new Writer(this, $('#world_history'));

        this.$maxIteration       = $('#max-iteration');
        this.lastExecutedGPTCall = null;
    }

    ///////////////////////////////////////////////////
    // WORLD
    ///////////////////////////////////////////////////

    killWorld() {
        this.$maxIteration.val(0); // Set iteration to 0 left

        $('#kill_it').addClass('disabled');
        $('#start_it').removeClass('disabled');
    }

    startWorld() {
        // Start
        let worldHasStated = 'World started';
        // this.memory.writeMemory(worldHasStated);
        this.writerActions.writeNotice(worldHasStated);

        // Goal
        var mainGoal = $('#main-goal').val();
        this.memory.writeMemory('Main goal:"' + mainGoal + '"', ['important']);
        this.writerActions.writeNotice('Main goal is: "' + mainGoal + '"');

        // Create birther
        const birther = new GPerson(worldConfig.birther, this);

        // Create Starter Person with new goal
        birther.executeAction({
            action : 'createAI',
            name   : $('#first_ai_name').val(),
            role   : $('#first_ai_role').val(),
            goal   : mainGoal
        });

        const stan = this.findPersonByName($('#first_ai_name').val());

        // Ask Starter to do his first move
        stan.executeActions([{
            action : 'talkToAI',
            name   : stan.getName(),
            message: $('#first_ai_message').val()
        }]);
    }

    ///////////////////////////////////////////////////
    // GET
    ///////////////////////////////////////////////////
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getRole() {
        return this.role;
    }

    ///////////////////////////////////////////////////
    // GET PERSONS
    ///////////////////////////////////////////////////
    findPersonPositionByName(name) {
        var position = 1;
        var found = false;

        var findPerson = false;
        for (const person of this.persons) {
            if (person.name == name) {
                findPerson = person;
                found = true;
            }
            if (!found) {
                position++;
            }
        }

        return position;
    }

    findPersonByName(name) {
        var findPerson = false;
        for (const person of this.persons) {
            if (person.name == name) {
                findPerson = person
            }
        }

        return findPerson
    }

    getPersons() {
        return this.persons;
    }

    getPersonsShort() {
        var persons = '';

        for (const person of this.persons) {
            persons += person.name + '(role: ' + person.role + '), ';
        }

        return persons.slice(0, persons.length - 2);
    }

    getPersonsShortJSON() {
        const persons = [];

        for (const person of this.persons) {
            persons.push({
                name: person.name,
                role: person.role,
            });
        }

        return persons;
    }
}

window.WorldCycle = WorldCycle;