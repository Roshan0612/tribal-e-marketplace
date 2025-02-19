import React from 'react'

const Footer = () => {
  return (
    <>
       <footer className="footer">
      <div className="footer-container">
        {/* Copyright Section */}
        <p className="footer-copyright">
          © 2024 My Website. All Rights Reserved.
        </p>

        {/* Links Section */}
        <div className="footer-links">
          <a href="/about" className="footer-link">About Us</a>
          <a href="/contact" className="footer-link">Contact</a>
          <a href="/privacy" className="footer-link">Privacy Policy</a>
          <a href="/terms" className="footer-link">Terms of Service</a>
        </div>

        {/* Social Media Section */}
        <div className="footer-social">
          <a href="https://facebook.com" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer