


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
        // this.person.memory.writeMemory('you googleSearch: "' + infos.query + '"');
    }

    async execute(infos) {
        this.writeMemoryStart(infos);

        if (googleApiKey != undefined && googleApiKey != null & googleApiKey != '') {
            this.searchGoogle(infos);
        } else {
            await this.callProxy(infos);
        }

        return {
            executed: false
        };
    }


    async searchGoogle(infos) {
        const self = this;
        const url  = `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${googleCseId}&q=${encodeURIComponent(infos.query)}`;

        try {
            const response = await fetch(url);
            const data     = await response.json();
            var   items    = [];

            var maxItem = 0;
            if (data.items) {
                data.items.forEach((item, index) => {
                    maxItem++;
                    if (maxItem <= 6) {
                        items.push({url: item.link, title: item.title});
                    }
                });
            }

            this.person.memory.writeMemory('You search for "' + infos.query + '". These are the search results: ' + JSON.stringify(items));

            self.person.executeActions([{
                action : 'talkToAI',
                name   : self.person.getName(),
                message: 'You search for "' + infos.query + '". These are the search results: ' + JSON.stringify(items)
            }]);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
    }


    callProxy(infos) {
        const self = this;

        $.ajax({
            url: '/googleSearchResult?query='+infos.query,
            data: {},
            success: function(response) {
                console.log('Google Search Response for: ' + infos.query, response);

                this.person.memory.writeMemory('You search for "' + infos.query + '". These are the search results: ' + JSON.stringify(items));

                self.person.executeActions([{
                    action : 'talkToAI',
                    name   : self.person.getName(),
                    message: 'You search for "' + infos.query + '". These are the search results: ' + JSON.stringify(response)
                }]);
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }
}

window.ActionGoogleSearch = ActionGoogleSearch;