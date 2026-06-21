import "../styles/footer.css";

const Footer = () => {
  return (
    <footer
      className="footer"
      aria-label="Footer"
    >
      <div className="footer-content">
        <h3 className="footer-logo">
          Go Business
        </h3>

        <nav className="footer-links">
          <a
            href="#"
            className="footer-link"
          >
            About
          </a>

          <a
            href="#"
            className="footer-link"
          >
            Contact
          </a>

          <a
            href="#"
            className="footer-link"
          >
            Privacy
          </a>

          <a
            href="#"
            className="footer-link"
          >
            Terms
          </a>
        </nav>

        <p className="footer-copyright">
          © 2024 Go Business
        </p>
      </div>
    </footer>
  );
};

export default Footer;