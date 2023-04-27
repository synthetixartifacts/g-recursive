

class Writer {
    constructor(world, $div, method = 'append') {
        this.world  = world;
        this.div    = $div;
        this.method = method;
    }

    realWrite(msg) {
        if (this.method == 'replace') {
            this.div.html(msg);
        } else if (this.method == 'append') {
            this.div.prepend(msg);
        } else {
            this.div.append(msg);
        }
    }

    writeNotice(msg, error = false) {
        const classError = error ? 'error' : '';

        let html = '';
        html += '<div class="history_msg ' + classError + '"><div class="infos">';
        html += this.getTimeHtml();
        html += '</div><div class="message">';
        html += msg;
        html += '</div></div>';

        this.realWrite(html);
    }

    writeMsgFromSomeone(name, msg) {
        var person_position = this.world.findPersonPositionByName(name);

        let html = '';
        html += '<div class="history_msg"><div class="infos">';
        html += '<div class="name color_accent_' + person_position + '">' + name + '</div>';
        html += this.getTimeHtml();
        html += '</div><div class="message">';
        html += msg;
        html += '</div></div>';

        this.realWrite(html);
    }

    removeLastItem() {
        this.div.find('.history_msg:first').remove();
    }

    getTimeHtml() {
        return '<div class="timestamp">' + getDateNow() + '</div>';
    }

    addPerson(createPerson) {
        let html = '';
        html += '<div class="person ' + createPerson.name +  '"><div class="top"><div class="head">';
            html += '🤖';
        html += '</div><div class="name color_accent_' + this.world.persons.length + '">';
            html += createPerson.name;
        html += '</div><div class="role">';
            html += createPerson.role;
            html += '</div></div><div class="goals">';
            html += createPerson.goals.getGoalsText();
        html += '</div></div>';

        this.realWrite(html);
    }


}

window.Writer = Writer;



