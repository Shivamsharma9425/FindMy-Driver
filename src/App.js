import React from "react";
import "./styles.css";

function App() {
  return (
    <div className="App">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <h1>FindMy Driver</h1>
        </div>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <button className="cta-button">Book Now</button>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h2>Your Private Driver, Just a Click Away!</h2>
          <p>Rent a professional driver for your car and enjoy a stress-free ride.</p>
          <button className="cta-button">Get Started</button>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Driver Illustration" />
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="card">
            <h3>Hourly Rentals</h3>
            <p>Book a driver by the hour for your errands or events.</p>
          </div>
          <div className="card">
            <h3>Daily Rentals</h3>
            <p>Need a driver for the whole day? We've got you covered.</p>
          </div>
          <div className="card">
            <h3>Corporate Services</h3>
            <p>Professional drivers for your business needs.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq" id="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h3>How do I book a driver?</h3>
            <p>You can book a driver through our website or mobile app. Simply select your preferred time and location.</p>
          </div>
          <div className="faq-item">
            <h3>What areas do you serve?</h3>
            <p>We currently serve all major cities. Check our service map for more details.</p>
          </div>
          <div className="faq-item">
            <h3>Can I cancel my booking?</h3>
            <p>Yes, you can cancel your booking up to 24 hours before the scheduled time.</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <h2>Subscribe to Our Newsletter</h2>
        <p>Get the latest updates and special offers.</p>
        <form>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit" className="cta-button">Subscribe</button>
        </form>
      </section>

      {/* Footer Section */}
      <footer id="contact">
        <div className="footer-content">
          <h3>FindMy Driver</h3>
          <p>Your trusted partner for private driver rentals.</p>
          <ul className="social-links">
            <li><a href="#"><i className="fab fa-facebook"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
