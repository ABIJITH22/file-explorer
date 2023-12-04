const { cut_file, copy_file, create_folder, invoke,openContextMenu } = require('@tauri-apps/api/tauri');

document.addEventListener('contextmenu', async (event) => {
    event.preventDefault();

    const menuOptions = [
        {
            label: 'Cut',
            action: cutFile,
        },
        {
            label: 'Copy',
            action: copyFile,
        },
        {
            label: 'Create New Folder',
            action: createFolder,
        },
    ];

    try {
        const selectedOption = await openContextMenu({
            menu: menuOptions.map(option => option.label),
            x: event.clientX,
            y: event.clientY,
        });

        const selectedAction = menuOptions.find(option => option.label === selectedOption);
        if (selectedAction) {
            selectedAction.action();
        }
    } catch (error) {
        console.error('Error opening context menu:', error);
    }
});

function cutFile()  {
    const sourcePath = prompt("Enter source file/directory path for cut:");
    const destinationPath = prompt("Enter destination file/directory path for cut:");

    cut_file(sourcePath, destinationPath)
        .then(() => alert("File/directory cut successfully"))
        .catch((error) => alert("Error cutting file/directory: " + error));
}

function copyFile() {
    const sourcePath = prompt("Enter source file/directory path for copy:");
    const destinationPath = prompt("Enter destination file/directory path for copy:");

     copy_file(sourcePath, destinationPath)
         .then(() => alert("File/directory copied successfully"))
         .catch((error) => alert("Error copying file/directory: " + error));
}

function createFolder() {
    const folderPath = prompt("Enter new folder path:");

    create_folder(folderPath)
        .then(() => alert("Folder created successfully"))
        .catch((error) => alert("Error creating folder: " + error));
}

// Listen for custom events
['cutFileSuccess', 'copyFileSuccess', 'createFolderSuccess'].forEach(eventName => {
    tauri.promisified({
        cmd: 'listen',
        event: eventName,
    }, (result) => {
        console.log(${eventName} event:, result);
        // Additional logic if needed
    });
});