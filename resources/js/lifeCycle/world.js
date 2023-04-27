



class WorldCycle {

    constructor(infos) {
        this.infos = infos;
        this.id    = infos.id;
        this.name  = infos.name;
        this.goals = new Goals(infos.goals);

        this.birther = null;
        this.persons = [];
        this.memory  = new Memory('world', 'World ' + infos.name + ' creation');

        this.writerListing = new Writer($('#world_listing'), 'prepend');
        this.writerActions = new Writer($('#world_history .long_discussion'));
        this.writerTalking = new Writer($('#ai_chatting_chat .long_discussion'));

        this.setState({
            code: 'not_started',
            label: 'Not Started'
        });

        this.$maxIteration       = $('#max-iteration');
        this.lastExecutedGPTCall = null;
    }

    ///////////////////////////////////////////////////
    // WORLD
    ///////////////////////////////////////////////////

    killWorld() {
        this.$maxIteration.val(0)
    }

    startWorld() {
        // Start
        let worldHasStated = 'World started';
        // this.memory.writeMemory(worldHasStated);
        this.setState('started', worldHasStated);
        this.writerActions.writeNotice(worldHasStated);

        // Goal
        var mainGoal = $('#main-goal').val();
        this.memory.writeMemory('Main goal:"' + mainGoal + '"', ['important']);
        this.writerActions.writeNotice('Main goal is: "' + mainGoal + '"');


        // Create birther
        this.birther = new GPerson(worldConfig.birther, this);

        // Create Starter Person with new goal
        this.birther.executeAction({
            action : 'createAI',
            name   : worldConfig.first_ai.infos.name,
            role   : worldConfig.first_ai.infos.role,
            goal   : mainGoal
        });

        const starterPerson = this.findPersonByName(worldConfig.first_ai.infos.name);

        // Ask Starter to do his first move
        // starterPerson.talkTo(worldConfig.firstMsg);
        starterPerson.executeActions([{
            action : 'talkToAI',
            name   : starterPerson.getName(),
            message: worldConfig.first_ai.firstMsg
        }]);
    }

    ///////////////////////////////////////////////////
    // GET
    ///////////////////////////////////////////////////

    setState(code, label) {
        $('#status').html(label);

        this.state = {
            code: code,
            label: label
        };
    }

    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getRole() {
        return this.role;
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