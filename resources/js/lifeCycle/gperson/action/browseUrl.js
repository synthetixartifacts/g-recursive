


class ActionBrowseUrl extends ActionBase {

    constructor(world, person) {
        super(world, person);

        this.machine = 'browseUrl';
        this.desc    = 'will send you back the content of the url. Last resort action.';
        this.format  = '{"action":"browseUrl","url":"url to browse"}';
        this.async   = true;
    }

    writeMemoryStart(infos) {
        this.world.writerActions.writeMsgFromSomeone(this.person.getName(), 'Browse url: ' + infos.url);

        // this.world.memory.writeMemory(this.person.getName() + ' use google search for: "' + infos.url + '"');
        this.person.memory.writeMemory('You browsed the url : "' + infos.url + '"');
    }

    async execute(infos) {
        this.writeMemoryStart(infos);

        await this.callProxy(infos);

        return {
            executed: false
        };
    }

    callProxy(infos) {
        const self = this;

        $.ajax({
            url: '/browseUrl?url='+infos.url,
            data: {},
            success: function(response) {
                console.log('Browse URL for: ' + infos.url, response);

                self.person.executeActions([{
                    action : 'talkToAI',
                    name   : self.person.getName(),
                    message: 'Content for ' + infos.url + ': \n' + JSON.stringify(response.content) + ' Do not browse the same url twice.'
                }]);
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }
}

window.ActionBrowseUrl = ActionBrowseUrl;