import { useState } from 'react';

function ContactForm() {
  // form state: all inputs kept in a single object
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // validation error messages per field
  const [errors, setErrors] = useState({});

  // UI status: '', 'Sending...' or success/error messages
  const [status, setStatus] = useState('');

  // Runs on every input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    // update the single formData object immutably
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Simple validation: returns an object with error messages
  const validate = (data) => {
    const errs = {};
    if (!data.name.trim()) errs.name = 'Name is required';
    if (!data.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) errs.email = 'Enter a valid email';
    if (!data.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();          // 1) prevent normal page reload
    setStatus('');               // 2) clear previous status
    const validation = validate(formData);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);     // 3) show validation errors if any
      return;
    }

    // 4) no validation errors — proceed
    setErrors({});
    setStatus('Sending...');

    // Simulate async call (replace this with fetch/axios POST in real app)
    setTimeout(() => {
      // pretend send succeeded
      setStatus('Message sent successfully ✅');
      // reset the form
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 480, fontFamily: 'sans-serif' }}>
      <h2>Contact Us</h2>

      <label>
        Name
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
        />
      </label>
      {errors.name && <div style={{ color: 'crimson' }}>{errors.name}</div>}

      <label style={{ display: 'block', marginTop: 12 }}>
        Email
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          type="email"
        />
      </label>
      {errors.email && <div style={{ color: 'crimson' }}>{errors.email}</div>}

      <label style={{ display: 'block', marginTop: 12 }}>
        Message
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help?"
          rows={4}
        />
      </label>
      {errors.message && <div style={{ color: 'crimson' }}>{errors.message}</div>}

      <div style={{ marginTop: 12 }}>
        <button type="submit">Send</button>
      </div>

      {status && <p style={{ marginTop: 12 }}>{status}</p>}
    </form>
  );
}

export default ContactForm;
