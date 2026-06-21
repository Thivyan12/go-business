import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-logo">
          Go Business
        </h3>

        <nav
          className="footer-links"
          aria-label="Footer"
        >
          <a
            href="/about"
            className="footer-link"
          >
            About
          </a>

          <a
            href="/contact"
            className="footer-link"
          >
            Contact
          </a>

          <a
            href="/privacy"
            className="footer-link"
          >
            Privacy
          </a>

          <a
            href="/terms"
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