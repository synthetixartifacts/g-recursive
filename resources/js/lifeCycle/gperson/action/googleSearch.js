


class ActionGoogleSearch extends ActionBase {

    constructor(world, person) {
        super(world, person);

        this.machine = 'googleSearch';
        this.desc    = 'will return 5 first results on google for your query';
        this.format  = '{"action":"googleSearch","query":"String to search in Google"}';
        this.async   = true;
    }

    writeMemoryStart(infos) {
        this.world.writerActions.writeMsgFromSomeone(this.person.getName(), 'Google Search: ' + infos.query);
        this.person.memory.writeMemory('you googleSearch: "' + infos.query + '"');
    }

    async execute(infos) {
        this.writeMemoryStart(infos);

        await this.callProxy(infos);

        return {
            executed: false,
            newActions: []
        };
    }

    callProxy(infos) {
        const self = this;

        $.ajax({
            url: '/googleSearchResult?query='+infos.query,
            data: {},
            success: function(response) {
                console.log('Google Search Response for: ' + infos.query, response);

                self.person.executeActions([{
                    action : 'talkToAI',
                    name   : self.person.getName(),
                    message: 'result are: ' + JSON.stringify(response)
                }]);
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }
}

window.ActionGoogleSearch = ActionGoogleSearch;