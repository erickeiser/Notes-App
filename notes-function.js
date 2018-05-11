// Read exisiting notes form localStorage
const getSavedNotes = function() {
const notesJSON = localStorage.getItem('notes')
if(notesJSON !== null) {
  return JSON.parse(notesJSON)
  } else {
    return []
  }
}

const saveNotes = function(notes) {
  localStorage.setItem('notes',JSON.stringify(notes))
}

const removeNote = function(id) {
  const noteIndex = notes.findIndex(function(note){
    return note.id === id
  })

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1)
  }

}

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
  const noteElement = document.createElement('a')
  const textElement = document.createElement('p')
  const statusElement = document.createElement('p')

    // Setup the note title text
    if(note.title.length > 0 ) {
      textElement.textContent = note.title
    } else {
      textElement.textContent = 'Unnamed note'
    }
    textElement.classList.add('list-item__title')
    noteElement.appendChild(textElement)
    
    // set up the link
    noteElement.setAttribute('href',`/notes-app/edit.html#${note.id}`)
    noteElement.classList.add('list-item')

    // set up status message
    statusElement.textContent = generateLastEdited(note.updatedAt)
    statusElement.classList.add('list-item__subtitle')
    noteElement.appendChild(statusElement)

    return noteElement
}

// Sort the notes with the dropDown box
const sortNotes = function(notes, sortBy) {
  if(sortBy === 'byEdited') {
    return notes.sort(function(a, b){
      if(a.updatedAt > b.updatedAt) {
        return -1
      } else if(a.updatedAt < b.updatedAt) {
        return 1
      } else {
        return 0
      }
    })
  } else if(sortBy === 'byCreated') {
    return notes.sort(function(a, b) {
      if(a.createdAt > b.createdAt) {
        return -1
      } else if(a.createdAt < b.createdAt) {
        return 1
      } else {
        return 0
      }
    })
  } else if(sortBy === 'alphabetically') {
    return notes.sort(function(a, b){
      if(a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1
      } else if(a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1
      } else {
        return 0
      }
    })
  } else {
    return notes
  }
}

// Render application notes
const renderNotes = function(notes, filters) {
  const notesElement = document.querySelector('#notes')
  notes = sortNotes(notes, filters.sortBy)
  const filteredNotes = notes.filter(function(note){ 
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

  notesElement.innerHTML= ''

  if(filteredNotes.length > 0) {
     filteredNotes.forEach((note) => {
    const noteElement = generateNoteDOM(note)
    notesElement.appendChild(noteElement)
  })
} else {
  const emptyMessage = document.createElement('p')
  emptyMessage.textContent =' You have no notes to show'
  emptyMessage.classList.add('empty-message')
  notesElement.appendChild(emptyMessage)
}
  }

 

// Generate the last edited message 
const generateLastEdited = function( timestamp) {
  return `Last edited ${moment(timestamp).fromNow()}`
}

