const draggerArea = document.getElementById('dragger');
const inputField = document.getElementById('fileInputField');
const dragText = document.getElementById('drag-text');
const fileName = document.getElementById('fileName');
const browseFile = document.getElementById('browseFile');
browseFile.addEventListener('click', () => {
    inputField.value = ""
    inputField.click();
});
inputField.addEventListener('change', function(e) {
    file = this.files[0];
    fileHandler(file);
});
draggerArea.addEventListener('dragover', (e) => {
    e.preventDefault() ;dragText.textContent = "Release to upload image"
});
draggerArea.addEventListener('dragleave', () => {
    dragText.textContent = "Drag and Drop File"
});
draggerArea.addEventListener('drop', (e) => {
    e.preventDefault() ;file = e.dataTransfer.files[0];
    fileHandler(file)
});
const deleteHandler = () => {
    const draggerElement = ` <div class="icon"><i class="fa-solid fa-images"></i></div> <h2 id="drag-text">Drag and Drop File</h2> <h3>Or</h3> <button class="browseFile" id="browseFile">Browse File</button> <input type="file" hidden id="fileInputField"/>`;
    draggerArea.innerHTML = draggerElement ;fileName.innerHTML = ""
    draggerArea.classList.remove('active');
};
const fileHandler = (file) => {
    const validExt = ["image/jpeg", "image/jpg", "image/png"]
    if (validExt.includes(file.type)) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const fileURL = fileReader.result;
            let imgTag = `<img src=${fileURL} alt=""/>`
            draggerArea.innerHTML = imgTag;
            let paragraph = `<div class="fileName"><p>${file.name.split('.')[0]}</p><i class="fa-solid fa-trash-can" onclick={deleteHandler()}></i></div>`
            fileName.innerHTML = paragraph;
        }
        fileReader.readAsDataURL(file);
        draggerArea.classList.add('active')
    } else {
        draggerArea.classList.remove('active');
        dragText.textContent = "Drag and Drop File"
    }
};