const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title fade-in">Contact Us</h1>
      <p className="contact-subtitle slide-in">
        Have questions, feedback, or partnership inquiries? We're here to help!
      </p>

      <div className="contact-details slide-in delay-1">
        <p>
          <strong>Email:</strong> support@foodfire.com
        </p>
        <p>
          <strong>Phone:</strong> +91 98765 43210
        </p>
        <p>
          <strong>Address:</strong> FoodFire HQ, Bengaluru, India
        </p>
        <p>
          <strong>Hours:</strong> Mon–Fri, 10am–6pm
        </p>
      </div>

      <p className="contact-footer slide-in delay-2">
        Whether you're a food lover or a restaurant partner, feel free to reach
        out. Our team will get back to you within 24 hours.
      </p>
    </div>
  );
};

export default Contact;
