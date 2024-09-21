import React from 'react';

const Support = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Introduction Section */}
        <section className="animate__animated animate__fadeIn">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-orange-500 text-5xl">E-Manager</span> Support
          </h1>
          <p className="text-lg mb-8">
            E-Manager is a web-based employee management system designed to streamline your HR processes. 
            From tracking employee performance to managing payroll, our intuitive interface simplifies 
            workforce management and enhances productivity.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-bold">1. How do I reset my password?</h3>
              <p>You can reset your password by clicking on the "Forgot Password?" link on the login page.</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-bold">2. What features does E-Manager offer?</h3>
              <p>E-Manager offers features such as employee performance tracking, payroll management, attendance tracking, and more.</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-bold">3. Is there a mobile app available?</h3>
              <p>Currently, E-Manager is a web-based application, but we are working on a mobile app version!</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-bold">4. How can I contact support?</h3>
              <p>You can reach out to our support team via the contact form below or through our support email.</p>
            </div>
          </div>
        </section>

        {/* About Us and Contact Section */}
        <footer className="mt-8">
          <h2 className="text-3xl font-semibold mb-4">About Us</h2>
          <p className="mb-4">
            At E-Manager, we are dedicated to providing innovative solutions for effective employee management. 
            Our goal is to empower businesses to streamline their HR processes and enhance productivity.
          </p>
          <h2 className="text-3xl font-semibold mb-2">Contact Us</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Email: support@e-manager.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: 1234 Manager Lane, Suite 100, Business City, BC 12345</li>
          </ul>
          <h2 className="text-3xl font-semibold mb-4">Quick Links</h2>
          <ul className="list-none">
            <li className="mb-2"><a href="/terms" className="text-orange-500 hover:underline">Terms of Service</a></li>
            <li className="mb-2"><a href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</a></li>
            <li className="mb-2"><a href="/faq" className="text-orange-500 hover:underline">FAQ</a></li>
            <li className="mb-2"><a href="/contact" className="text-orange-500 hover:underline">Contact Support</a></li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default Support;
