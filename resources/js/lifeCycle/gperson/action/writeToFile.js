

class ActionWriteToFile extends ActionBase {

    constructor(world, person) {
        super(world, person);

        this.machine = 'writeToFile';
        this.desc    = 'append text to the main file';
        this.format  = '{"action":"writeToFile","message":"Information to add"}';
    }

    execute(infos) {
        this.world.writerActions.writeMsgFromSomeone(this.person.getName(), 'Wrote memory to "' + infos.type + '": ' + infos.message);


        $('#world_file .gpt-response').append('<br>' + infos.message);

        this.person.memory.writeMemory('You wrote in the window file: "' + infos.message + '"');


        return {
            executed: true
        }
    }
}

window.ActionWriteToFile = ActionWriteToFile;