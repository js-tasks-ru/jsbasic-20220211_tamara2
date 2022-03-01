function showSalary(users, age) {
  const filtered = users.filter(user => user.age <= age)
  return filtered.reduce(
    (str, user, index) => index !== filtered.length - 1 ? 
     str += `${user.name}, ${user.balance}\n` 
    : str += `${user.name}, ${user.balance}`
  , '')
}
