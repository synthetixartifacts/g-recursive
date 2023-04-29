class ActionWriteToCSV extends ActionBase {
    constructor(world, person) {
        super(world, person);

        this.machine = 'writeToCSV';
        this.desc    = 'create and/or content to a csv file';
        this.format  = '{"action":"writeToCSV","content":"Content to add","filename":"file_name.csv"}';
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
        const currentContent = fileElement.getAttribute('data-csv');
        const newContent = currentContent + infos.content + '\n';
        fileElement.setAttribute('data-csv', newContent);

        return {
            executed: true
        }
    }

    createFileElement(filename) {
        const fileElement = document.createElement('div');
        fileElement.classList.add('file', 'csv');

        const fileImg = document.createElement('div');
        fileImg.classList.add('img');
        fileImg.textContent = '';

        const fileLabel = document.createElement('label');
        fileLabel.classList.add('filename');
        fileLabel.textContent = filename;

        fileElement.setAttribute('data-filename', filename);
        fileElement.setAttribute('data-csv', '');
        fileElement.appendChild(fileImg);
        fileElement.appendChild(fileLabel);

        fileElement.addEventListener('click', () => {
            const content = fileElement.getAttribute('data-csv');
            const blob = new Blob([content], {type: 'text/csv;charset=utf-8;'});
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

window.ActionWriteToCSV = ActionWriteToCSV;
