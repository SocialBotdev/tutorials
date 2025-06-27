const ContactUs = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Contact Us</h1>

      <p className="mb-4">
        If you have any questions about our services, policies, or your orders, feel free to contact us. We're here to help.
      </p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Business Name</h2>
        <p>Your Business Name Pvt. Ltd.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Registered Address</h2>
        <p>
          Bibewadi<br />
          Pune, Maharashtra – 411037<br />
          India
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Email Support</h2>
        <p>
          <a href="mailto:monkon.official@gmail.com" className="text-blue-600 underline">
            monkon.official@gmail.com
          </a>
        </p>
      </div>

    </div>
  );
};

export default ContactUs;
