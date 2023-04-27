

class OpenAiAPI {
    constructor() {
        this.apiKey         = $('#api_key').val();
        this.apiUrl         = 'https://api.openai.com/v1/chat/completions';
        this.apiModel       = $('#model_name').val();
        this.apiMaxToken    = parseInt($('#max_token').val());
        this.apiTemperature = 1;
    }


    gptFormatApiResponse(messages) {
        var contentMessage = messages.choices[0].message.content.trim();

        console.warn('-----------------------');
        console.log('RAW Return ---:', contentMessage);

        var formatedResponse = {
            first_message: '',
            actions: [],
            last_message: ''
        };

        const startIndex = contentMessage.indexOf('{');
        const endIndex = contentMessage.lastIndexOf('}');

        // prof like to answer first use it as profMsg
        if (startIndex > 0) {
            var firstMsg = contentMessage.slice(0, startIndex - 1); // Trim a bit
            if (firstMsg.length > 5) {
                formatedResponse.first_message = this.gptFormatGPTMessage(firstMsg);
            }
        }

        // Get actions
        formatedResponse.actions = this.getActionsFromResponse(contentMessage);


        // prof like to answer at the end too - use it as profMsg
        if (endIndex < contentMessage.length - 10) {
            var lastMsg = contentMessage.slice(endIndex + 2, contentMessage.length); // Trim a bit
            if (lastMsg.length > 5) {
                formatedResponse.last_message = this.gptFormatGPTMessage(lastMsg);
            }
        }

        // console.warn('warn', formatedResponse);

        return formatedResponse;
    }

    gptFormatGPTMessage(message) {
        // Trim of ```
        message = message.replace(/```/g, '');

        return message;
    }

    getActionsFromResponse(contentMessage) {
        const regex = /{[^}]*}/g;
        let match;
        var actions = [];

        while ((match = regex.exec(contentMessage)) !== null) {
            try {
                const jsonAction = JSON.parse(match[0]);
                actions.push(jsonAction);
            } catch (e) {
                console.error("Error parsing JSON action:", e);
            }
        }

        return actions;
    }



    async gptApiCall(messages) {
        // Post header
        const headers = {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        };

        // POST DATA
        const postData = {
            model      : this.apiModel,         //'gpt-3.5-turbo',
            max_tokens : this.apiMaxToken,      // Adjust this value based on your desired response length
            temperature: this.apiTemperature,
            messages   : messages,
        };

        const body = JSON.stringify(postData);

        // CALL
        try {
            // console.warn('REAL SEND', body);

            const response = await fetch(this.apiUrl, { method: 'POST', headers, body });
            const data     = await response.json();

            // Check error
            if (data.error) {
                console.error('ERROR API CALL - ', data.error);
                return 'Error fetching GPT response - DATA: ' + data.error.message;
            }


            // Manage return message from GPT
            return this.gptFormatApiResponse(data);
        } catch (error) {
            console.error('Error fetching GPT response:', error);
            return 'Error fetching GPT response';
        }
    }
}

window.OpenAiAPI = OpenAiAPI;









