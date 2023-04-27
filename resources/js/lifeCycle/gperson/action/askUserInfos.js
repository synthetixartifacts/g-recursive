

class ActionAskUserInfos extends ActionBase {

    constructor(world, person) {
        super(world, person);

        this.machine = 'askUserInfos';
        this.desc    = 'allows you to ask the user actions, only if needed';
        this.format  = '{"action":"askUserInfos", "question":"question to ask to user"}';
    }


    execute(infos) {
        try {
            // Execute code that is located in infos.code
            // eval(infos.code);
            console.error(this.person.getName() + ' want to ask something', infos.code);

            // Write memory
            // this.world.writerActions.writeMsgFromSomeone(this.person.getName(), 'want to ask something');
        } catch (error) {
            console.error('Error executing JavaScript code:', error);
            // You may want to handle the error and update the memory accordingly
        }
    }
}

window.ActionAskUserInfos = ActionAskUserInfos;