


class ActionWriteMemory extends ActionBase {

    constructor(world, person) {
        super(world, person);

        this.machine = 'writeMemory';
        this.desc    = 'write information on a memory file that you can access later. type world is for all the AI to know, local is for your own memoryFile';
        this.format  = '{"action":"writeMemory","message":"Information to add","type":"world/local"}';
    }

    execute(infos) {
        this.world.writerActions.writeMsgFromSomeone(this.person.getName(), 'Wrote memory to "' + infos.type + '": ' + infos.message);

        // Write Memory
        if (infos.type == 'world') {
            this.world.memory.writeMemory(infos.message);
        } else {
            this.person.memory.writeMemory(infos.message);
        }

        return {
            executed: true,
            newActions: []
        }
    }
}

window.ActionWriteMemory = ActionWriteMemory;