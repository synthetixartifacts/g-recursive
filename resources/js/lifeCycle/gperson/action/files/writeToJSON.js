class ActionWriteToJSON extends ActionBase {
    constructor(world, person) {
        super(world, person);

        this.machine = 'writeToJSON';
        this.desc    = 'create and/or content to a JSON file';
        this.format  = '{"action":"writeToJSON","content":"JSON content to add","filename":"file_name.json"}';
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
        const currentContent = fileElement.getAttribute('data-json');
        const newContent = JSON.parse(currentContent);
        const contentToAdd = JSON.parse(infos.content);

        Object.assign(newContent, contentToAdd);
        fileElement.setAttribute('data-json', JSON.stringify(newContent));

        return {
            executed: true
        }
    }

    createFileElement(filename) {
        const fileElement = document.createElement('div');
        fileElement.classList.add('file', 'json');

        const fileIcon = document.createElement('img');
        fileIcon.src = 'path/to/json-icon.png'; // Replace with the path to your JSON icon image
        fileIcon.alt = filename;

        const fileLabel = document.createElement('label');
        fileLabel.classList.add('filename');
        fileLabel.textContent = filename;

        fileElement.setAttribute('data-filename', filename);
        fileElement.setAttribute('data-json', '{}');
        fileElement.appendChild(fileIcon);
        fileElement.appendChild(fileLabel);

        fileElement.addEventListener('click', () => {
            const content = fileElement.getAttribute('data-json');
            const blob = new Blob([content], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();

            URL.revokeObjectURL(url);
        });

        return fileElement;
    }
}

window.ActionWriteToJSON = ActionWriteToJSON;
