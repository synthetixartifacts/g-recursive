class ActionWriteToXLSX extends ActionBase {
    constructor(world, person) {
        super(world, person);

        this.machine = 'writeToXLSX';
        this.desc    = '(create)add content to an XLSX file';
        this.format  = '{"action":"writeToXLSX","content":"Content to add as an array of arrays (rows and cells)","filename":"file_name.xlsx"}';
    }

    execute(infos) {
        const fileElement = this.getFileElement(infos.filename);
        let workbook;

        if (!fileElement) {
            workbook = XLSX.utils.book_new();
            const sheet = XLSX.utils.aoa_to_sheet([infos.content]);
            XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
            this.createFileElement(infos.filename, workbook);
        } else {
            workbook = XLSX.read(fileElement.getAttribute('attr-xlsx'), {type: 'binary'});
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const newContent = XLSX.utils.sheet_to_json(sheet, {header: 1});
            newContent.push(infos.content);
            const updatedSheet = XLSX.utils.aoa_to_sheet(newContent);
            workbook.Sheets[workbook.SheetNames[0]] = updatedSheet;
            fileElement.setAttribute('attr-xlsx', XLSX.write(workbook, {type: 'binary'}));
        }

        return {
            executed: true
        }
    }

    getFileElement(filename) {
        return document.querySelector(`#world_files .file-list .file.xlsx[attr-filename="${filename}"]`);
    }

    createFileElement(filename, workbook) {
        const fileContainer = document.querySelector('#world_files .file-list');
        const fileDiv = document.createElement('div');
        fileDiv.className = 'file xlsx';
        fileDiv.setAttribute('attr-filename', filename);
        fileDiv.setAttribute('attr-xlsx', XLSX.write(workbook, {type: 'binary'}));

        const fileIcon = document.createElement('img');
        fileIcon.src = 'path/to/xlsx-icon.png';
        fileDiv.appendChild(fileIcon);

        const fileLabel = document.createElement('label');
        fileLabel.className = 'filename';
        fileLabel.innerText = filename;
        fileDiv.appendChild(fileLabel);

        fileDiv.addEventListener('click', () => {
            const binaryWorkbook = fileDiv.getAttribute('attr-xlsx');
            const data = new Blob([this.s2ab(binaryWorkbook)], {type: "application/octet-stream"});
            const url = URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        });

        fileContainer.appendChild(fileDiv);
    }

    s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }
}

window.ActionWriteToXLSX = ActionWriteToXLSX;
