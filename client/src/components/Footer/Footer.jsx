import cssStyles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={cssStyles.container}>
      <p className={cssStyles.text}>&copy; 2023, Sholastix. All rights reserved.</p>
    </footer>
  );
};

export default Footer;