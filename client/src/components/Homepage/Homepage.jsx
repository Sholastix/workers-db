import cssStyles from './Homepage.module.css';

const Homepage = () => {
  return (
    <div id={cssStyles.container}>
      <p className={cssStyles.title}>EMPLOYEE MANAGEMENT SYSTEM</p>
      <section className={cssStyles.section}>
        <div className={cssStyles.description}>
          <p>This program helps you keep track of your company's employees. After completing the registration you will be able to view the complete list of employees as well as create, edit and delete their individual profiles.</p>
          <br />
          <b>1. Homepage</b> - general information page.
          <br /><br />
          <b>2. Employees</b> - page displays information about all company employees. Hidden. Access is allowed only to authorized users.
          <br /><br />
          <b>3. SignIn</b> - authorization page.
          <br /><br />
          <b>4. SignUp</b> - registration page.
          <br /><br />
          <b>5. Username</b> - link to profile the current signed in user. Contains dropdown menu. Hidden. Access is allowed only to authorized users.
          <br /><br />
          <b>6. SignOut</b> - exit the profile of the current user. Located in dropdown menu. Hidden. Access is allowed only to authorized users.
        </div>
      </section>
    </div>
  );
};

export default Homepage;