/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #rows = []
  elem = null
  constructor(rows) {
    this.#rows = rows
    this.elem = document.createElement('div')
    this.elem.innerHTML = this.#template()
    this.elem.addEventListener('click', (event) => {
      if (event.target.dataset.action !== 'remove') {
        return;
      }
      
      const tr = event.target.closest('tbody tr');
      if (!tr) {
        return;
      }
      
      tr.remove();
    });
  }

  #templateElements() {
    return this.#rows.map(({ name, age, salary, city }) =>
    (
      `<tr>
        <td>${name}</td>
        <td>${age}</td>
        <td>${salary}</td>
        <td>${city}</td>
        <td><button data-action="remove">X</button></td>
      </tr>`
    )
    )
  }

  #template() {
    return (
      `<table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${this.#templateElements()}
      </tbody>
    </table>`
    )
  }
}
