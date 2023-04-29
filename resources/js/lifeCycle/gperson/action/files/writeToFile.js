class ActionWriteToFile extends ActionBase {
    constructor(world, person) {
        super(world, person);

        this.machine = 'writeToFile';
        this.desc    = 'create and/or add content to a text file';
        this.format  = '{"action":"writeToFile","content":"Content to add","filename":"file_name.txt"}';
    }

    execute(infos) {
        const fileContainer = document.querySelector('#world_files .file-list');
        let fileElement = fileContainer.querySelector(`[data-filename="${infos.filename}"]`);

        // Create file if it doesn't exist
        if (!fileElement) {
            fileElement = this.createFileElement(infos.filename);
            fileContainer.appendChild(fileElement);
        }

        // Append content to the file
        const currentContent = fileElement.getAttribute('data-txt');
        const newContent = currentContent + infos.content + '\n';
        fileElement.setAttribute('data-txt', newContent);

        return {
            executed: true
        }
    }

    createFileElement(filename) {
        const fileElement = document.createElement('div');
        fileElement.classList.add('file', 'txt');

        const fileImg = document.createElement('div');
        fileImg.classList.add('img');
        fileImg.textContent = '';

        const fileLabel = document.createElement('label');
        fileLabel.classList.add('filename');
        fileLabel.textContent = filename;

        fileElement.setAttribute('data-filename', filename);
        fileElement.setAttribute('data-txt', '');
        fileElement.appendChild(fileImg);
        fileElement.appendChild(fileLabel);

        fileElement.addEventListener('click', () => {
            const content = fileElement.getAttribute('data-txt');
            const blob = new Blob([content], {type: 'text/plain;charset=utf-8;'});
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.style.display = 'none';

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });

        return fileElement;
    }
}

window.ActionWriteToFile = ActionWriteToFile;
