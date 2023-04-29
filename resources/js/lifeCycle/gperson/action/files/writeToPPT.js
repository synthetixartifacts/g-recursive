class ActionWriteToPPT extends ActionBase {
    constructor(world, person) {
        super(world, person);

        this.machine = 'writeToPPT';
        this.desc    = 'create and/or content to a PowerPoint presentation';
        this.format  = '{"action":"writeToPPT","content":"Content to add","filename":"file_name.pptx"}';
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
        const currentContent = fileElement.getAttribute('data-ppt');
        const newContent = currentContent + infos.content + '\n';
        fileElement.setAttribute('data-ppt', newContent);

        return {
            executed: true
        }
    }

    createFileElement(filename) {
        const fileElement = document.createElement('div');
        fileElement.classList.add('file', 'ppt');

        const fileImg = document.createElement('div');
        fileImg.classList.add('img');
        fileImg.textContent = '';

        const fileLabel = document.createElement('label');
        fileLabel.classList.add('filename');
        fileLabel.textContent = filename;

        fileElement.setAttribute('data-filename', filename);
        fileElement.setAttribute('data-ppt', '');
        fileElement.appendChild(fileImg);
        fileElement.appendChild(fileLabel);

        fileElement.addEventListener('click', () => {
            const content = fileElement.getAttribute('data-ppt');
            const pptx = new PptxGenJS();

            const lines = content.split('\n');
            const slide = pptx.addSlide();

            lines.forEach((line, index) => {
                slide.addText(line, { x: 1, y: 1 + index * 0.5, fontSize: 14 });
            });

            pptx.writeFile(filename);
        });

        return fileElement;
    }
}

window.ActionWriteToPPT = ActionWriteToPPT;
