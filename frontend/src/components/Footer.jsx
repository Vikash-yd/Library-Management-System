import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>📚 Smart Library</h3>
        <p>Find your quiet space to read, learn, and grow.</p>

        <div className="footer-links">
          <span>Home</span>
          <span>Books</span>
          <span>Contact</span>
        </div>

        <p className="copyright">
          © 2026 Smart Library. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;