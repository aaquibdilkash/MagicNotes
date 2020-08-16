

console.log("Welcome to NotePadJS")
showNotes()
//if user adds a note, add it to the localstorage
let addBtn = document.getElementById('addbtn')
addBtn.addEventListener("click",(e)=>{
    let addText = document.getElementById('addText')
    let notes = localStorage.getItem('notes')
    if(notes == null){
        let notesObj = []
    }
    else{
        notesObj = JSON.parse(notes)
    }
    if(addText.value!=""){
        notesObj.push(addText.value)
        
    }
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addText.value = ''
    console.log(notesObj)
    showNotes()
})


//showNote function to display the notes
function showNotes(){
    let notes = localStorage.getItem('notes')
    if(notes == null){
        notesObj = []
    }
    else{
        notesObj = JSON.parse(notes)
    }
    let html = ""
    notesObj.forEach((element, index)=> {
        html += `<div class="noteCard mx-2 my-2 carbutton" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index+1}</h5>
                    <p class="card-text">
                        ${element}
                    </p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>`
    })

    let notesElm = document.getElementById("notes")
    if(notesObj.length != 0){
        notesElm.innerHTML = html
    }
    else{
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add Notes
        `
    }
}


//deleteNote function to delete a note
function deleteNote(index){
    console.log(`Deleting Note ${index}`);
    let notes = localStorage.getItem("notes")
    if(notes == null){
        notesObj = []
    }else{
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notesObj))
    showNotes()
}


//to search the notes for a particular phrase
let search = document.getElementById("searchText")
search.addEventListener("input", ()=>{

    let inputVal = search.value.toLowerCase()
    console.log("input event fired", inputVal);
    let noteCards = document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach((e)=>{
        let cardText = e.getElementsByTagName('p')[0].innerText
        if(cardText.includes(inputVal)){
            e.style.display = 'block'
        }else{
            e.style.display = 'none'
        }
        // console.log(cardText)
    })
})