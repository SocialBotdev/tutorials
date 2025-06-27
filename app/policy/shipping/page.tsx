const ShippingPolicy = () => (
  <div className="p-6 max-w-3xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">Shipping Policy</h1>
    <p>Effective Date: [Insert Date]</p>
    <ul className="list-disc pl-6 mt-4 space-y-2">
      <li>We ship across India. International shipping is not available.</li>
      <li>Orders are processed within 1–3 business days.</li>
      <li>Delivery typically takes 3–7 business days.</li>
      <li>Shipping charges are calculated at checkout.</li>
      <li>Tracking info will be emailed upon dispatch.</li>
    </ul>
    <p className="mt-4">Contact: <a href="mailto:shipping@yourdomain.com" className="text-blue-600">shipping@yourdomain.com</a></p>
  </div>
);

export default ShippingPolicy;
