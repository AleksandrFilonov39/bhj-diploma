
/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) { 
    super(element)

    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {  
    Account.list(User.current(), (err, response) => {
      const select = this.element.querySelector('.form-control.accounts-select');
      if(response.success) {
        select.innerHTML = '';
        select.innerHTML = response.data.reduce((acc, el) => {
          acc += `<option value="${el.id}">${el.name}</option>`;
          return acc;
        }, ``);
      }   
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if(response.success) {
        let modalName = `new${data.type[0].toUpperCase() + data.type.slice(1)}`;
        App.getModal(modalName).close();
        App.update()
        this.element.reset();
      } else {
        console.log(err);
      }
    })
  }
}