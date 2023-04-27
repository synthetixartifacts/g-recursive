

class ActionExecJs extends ActionBase {

    constructor(world, person) {
        super(world, person);

        this.machine = 'execJs';
        this.desc    = 'allows you to run javascript on a browser page your spawned on';
        this.format  = '{"action":"execJs", "code":"js code to execute"}';
    }


    execute(infos) {
        try {
            // Execute code that is located in infos.code
            // eval(infos.code);
            console.error(this.person.getName() + ' want to execute JS code', infos.code);

            // Write memory
            this.world.writerActions.writeMsgFromSomeone(this.person.getName(), ' executed JS code');
        } catch (error) {
            console.error('Error executing JavaScript code:', error);
            // You may want to handle the error and update the memory accordingly
        }
    }
}

window.ActionExecJs = ActionExecJs;