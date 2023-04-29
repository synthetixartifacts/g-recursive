class ActionWriteToPDF extends ActionBase {
    constructor(world, person) {
        super(world, person);

        this.machine = 'writeToPDF';
        this.desc = 'create and/or content to a pdf file with html2canvas and jsPDF';
        this.format = '{"action":"writeToPDF","content":"Content to add","filename":"file_name.pdf"}';
    }

    execute(infos) {
        // Add the content to a hidden div
        const hiddenDiv = document.createElement('div');
        hiddenDiv.style.display = 'none';
        hiddenDiv.innerHTML = infos.content;
        document.body.appendChild(hiddenDiv);

        // Render the hidden div as a canvas
        html2canvas(hiddenDiv).then(canvas => {
            // Convert the canvas to an image
            const imgData = canvas.toDataURL('image/png');

            // Create a new jsPDF instance
            const pdf = new jsPDF();

            // Add the image to the PDF
            // pdf.addImage(imgData, 'PNG', 10, 10);

            // Get the PDF as a Blob
            pdf.output('blob').then((blob) => {
                // Create a URL for the Blob
                const pdfUrl = URL.createObjectURL(blob);

                // Add the file to the list
                this.addFileToList(infos.filename, 'pdf', pdfUrl);

                // Remove the hidden div from the document
                document.body.removeChild(hiddenDiv);
            });
        });

        return {
            executed: true
        };
    }


    addFileToList(filename, fileType) {
        const fileList = document.querySelector('#world_files .file-list');
        const fileItem = document.createElement('div');
        fileItem.classList.add('file', fileType);

        const fileImg = document.createElement('div');
        fileImg.classList.add('img');
        fileImg.textContent = '';

        const fileLabel = document.createElement('span');
        fileLabel.classList.add('filename');
        fileLabel.textContent = filename;

        fileItem.appendChild(fileImg);
        fileItem.appendChild(fileLabel);
        fileList.appendChild(fileItem);


        fileItem.addEventListener('click', () => {
            window.location.href = filename;
        });
    }
}

window.ActionWriteToPDF = ActionWriteToPDF;
