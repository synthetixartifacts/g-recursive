




class Memory {

    constructor(type, firstMemory = '') {
        this.type = type;
        this.data = [];

        this.data.global    = [];
        this.data.short     = [];
        this.data.important = [];


        if (firstMemory != '') {
            this.data.global.push(firstMemory);
            this.data.short.push(firstMemory);
        }
    }

    getMemories(all = false) {
        if (all) {
            return this.data;
        }

        return {
            short_memory: this.data.short,
            important: this.data.important
        };
    }


    writeMemory(msg, folders = ['global', 'short']) {
        // TODO
        // Manage timestamp in some way

        // Optmized
        const optmizedMsg = this.optimizedText(msg);

        // Add message on all folders
        for (const folder of folders) {
            switch(folder) {
                case 'short':
                    this.writeToShortMemory(optmizedMsg);
                    break;
                default:
                    this.data[folder].push(optmizedMsg);
                    break;
            }

        }
    }

    writeToShortMemory(msg) {
        this.data.short = this.pushWithLimit(this.data.short, msg, worldConfig.memory.shortMaxNbEvent);
    }

    pushWithLimit(arr, element, varMax) {
        if (arr.length >= varMax) {
          arr.shift();
        }

        arr.push(element);
        return arr;
    }

    // TODO - Remove last memory


    // Optmized
    optimizedText(msg) {
        msg = msg.replace( /[\r\n]+/gm, "" ).replace(/"/g, '').trim();

        return msg;
    }

}

window.Memory = Memory;



































// Example usage:
// LifeCycleStorage.setValue('memoryFile1', 'This is the memory data for GPT instance 1');
// const memoryFile1 = LifeCycleStorage.getValue('memoryFile1');
// console.log(memoryFile1);


const LifeCycleStorage = (function () {
    const storageKey = 'lifeCycle';

    // Retrieve the lifeCycle JSON object from localStorage
    function getLifeCycleData() {
        const rawData = localStorage.getItem(storageKey);

        if (rawData) {
            return JSON.parse(rawData);
        } else {
            return {};
        }
    }

    // Save the lifeCycle JSON object to localStorage
    function saveLifeCycleData(data) {
        localStorage.setItem(storageKey, JSON.stringify(data));
    }

    // Set a value in the lifeCycle JSON object
    function setValue(key, value) {
        const lifeCycleData = getLifeCycleData();
        lifeCycleData[key] = value;
        saveLifeCycleData(lifeCycleData);
    }

    // Get a value from the lifeCycle JSON object
    function getValue(key) {
        const lifeCycleData = getLifeCycleData();
        return lifeCycleData[key];
    }

    return {
        setValue,
        getValue,
    };
})();