

class ActionExecPHP extends ActionBase {

    constructor(world, person) {
        super(world, person);

        this.machine = 'execPhp';
        this.desc    = 'allows you to run PHP8 code on the server your spawned on';
        this.format  = '{"action":"execPhp", "code":"PHP code to execute"}';
    }


    execute(infos) {
        try {
            // Execute code that is located in infos.code
            // eval(infos.code);
            console.error(this.person.getName() + ' want to execute PHP8 code', infos.code);

            // Write memory
            this.world.writerActions.writeMsgFromSomeone(this.person.getName(), ' executed PHP8 code');
        } catch (error) {
            console.error('Error executing PHP code:', error);
            // You may want to handle the error and update the memory accordingly
        }
    }
}

window.ActionExecPHP = ActionExecPHP;