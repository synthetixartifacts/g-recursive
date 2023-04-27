

class Writer {
    constructor($div, method = 'append') {
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

    writeNotice(msg) {
        let html = '';
        html += '<div class="history_msg"><div class="infos">';
        html += this.getTimeHtml();
        html += '</div><div class="message">';
        html += msg;
        html += '</div></div>';

        this.realWrite(html);
    }

    writeMsgFromSomeone(name, msg) {
        let html = '';
        html += '<div class="history_msg someone"><div class="infos">';
        html += '<div class="name">' + name + '</div>';
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
        html += '<div class="person ' + createPerson.id +  '"><div class="name">';
            html += createPerson.name;
        html += '</div><div class="role">';
            html += '<u>Role:</u> ' + createPerson.role;
            html += '</div><div class="goals">';
            html += '<u>Goals:</u> ' + createPerson.goals.getGoalsText();
        html += '</div></div>';

        this.realWrite(html);
    }


}

window.Writer = Writer;



