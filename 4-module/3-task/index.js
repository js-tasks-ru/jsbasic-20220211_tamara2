function highlight(table) {
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i]
    
    const statusCell = row.cells[3]
    const dataAvailable = statusCell.dataset.available
    switch(dataAvailable) {
      case undefined: {
        row.hidden = true
        break
      }
      case 'false': {
        row.classList.add('unavailable')
        break
      }
      case 'true': {
        row.classList.add('available')
        break
      }
    }
    
    const genderCell = row.cells[2].innerText
    switch(genderCell) {
      case ('m'): {
        row.classList.add('male')
        break
      }
       case ('f'): {
        row.classList.add('female')
      }
    }
    
    const ageCell = row.cells[1].innerText
    if (ageCell < 18) {
      row.style.textDecoration = 'line-through'
    }
  }
}
