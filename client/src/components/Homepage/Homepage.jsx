import cssStyles from './Homepage.module.css';

const Homepage = () => {
  return (
    <div id={cssStyles.container}>
      <header className={cssStyles.header}>
        <h1>СИСТЕМА ОБЛІКУ ПРАЦІВНИКІВ</h1>
      </header>
      <br /><br />
      <section className={cssStyles.section}>
        <b>1. Homepage</b> - сторінка загальної інформації. Зараз Ви дивитесь прямо на неї :)
        <br /><br />
        <b>2. Employees</b> - сторінка відображає інформацію про всіх сповробітників компанії. Прихована. Доступ дозволено тільки авторизованим користувачам.
        <br /><br />
        <b>3. SignUp</b> - форма реєстрації нового користувача.
        <br /><br />
        <b>4. SignIn</b> - форма авторизації користувача, який вже зареєстрований у програмі.
        <br /><br />
        <b>5. SignOut</b> - кнопка виходу з профіля поточного користувача. Прихована. Відображається тільки авторизованим користувачам.
      </section>
    </div>
  );
};

export default Homepage;