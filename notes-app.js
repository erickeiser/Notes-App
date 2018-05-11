let notes = getSavedNotes()

const filters = {
  searchText: '',
  sortBy: 'byEdited'
}


renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click',function(e){
  const id = uuidv4()
  const timestamp = moment().valueOf()
  notes.push({
    id: id,
    title: '',
    body: '',
    createdAt: timestamp,
    updateAt: timestamp
  })

  saveNotes(notes)
  location.assign(`/notes-app/edit.html#${id}`)
})
  

document.querySelector('#searchText').addEventListener('input', function(e){
  filters.searchText = e.target.value
  renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', function(e){
  filters.sortBy = e.target.value
  renderNotes(notes, filters)
})

window.addEventListener('storage', function(e){
  if(e.key === 'notes') {
    notes = JSON.parse(e.newValue)
    renderNotes(notes, filters)

  }
})


  




