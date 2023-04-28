

class ActionExecJs extends ActionBase {

    constructor(world, person) {
        super(world, person);

        this.machine = 'execJs';
        this.desc    = 'allows you to run JS code on the browser tab you "live" through the eval() function';
        this.format  = '{"action":"execJs", "code":"js code to execute"}';
    }


    execute(infos) {
        try {
            // Execute code that is located in infos.code
            console.error(this.person.getName() + ' want to execute JS code', infos.code);
            eval(infos.code);

            // Write memory
            this.world.writerActions.writeMsgFromSomeone(this.person.getName(), ' executed JS code');
        } catch (error) {
            console.error('Error executing JavaScript code:', error);
        }

        return {
            executed: true
        };
    }
}

window.ActionExecJs = ActionExecJs;