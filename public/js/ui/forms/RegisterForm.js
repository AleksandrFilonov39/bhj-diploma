

/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
  User.register(data, (err, response) => {
     this.element.reset();
    if (response.success) {
      App.setState('user-logged');
      this.element.reset();
      App.getModal('register').close()
    } else {
      console.log('ошибка регистрации ' + err);
    }
  })
  }
}