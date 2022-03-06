function makeFriendsList(friends) {
  const ul = document.createElement('ul')
  friends.forEach(({firstName, lastName}) => {
    const li = document.createElement('li')
    li.textContent = `${firstName} ${lastName}`
    ul.append(li)
  })
  return ul
}
