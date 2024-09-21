import React from 'react';

const TermsOfService = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Terms of Service</h1>
        <p className="text-gray-600 mb-4">Effective Date: [Insert Date]</p>

        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p className="text-gray-700 mb-4">
          By creating an account or using our application, you agree to abide by these terms. If you do not agree to these terms, you must not use the application.
        </p>

        <h2 className="text-xl font-semibold mb-2">2. User Responsibilities</h2>
        <p className="text-gray-700 mb-4">
          <strong>Account Creation:</strong> You are responsible for maintaining the confidentiality of your account information, including your password, and for any activities that occur under your account.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>User Conduct:</strong> You agree not to misuse the service, including but not limited to unauthorized access, hacking, or using the service in a way that violates applicable laws.
        </p>

        <h2 className="text-xl font-semibold mb-2">3. Employee Management</h2>
        <p className="text-gray-700 mb-4">
          You may add, edit, and manage employee data through the app. You are solely responsible for ensuring the accuracy of the data you enter or modify.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Deletion of Employees:</strong> When an employee is deleted, all associated data will be removed from the system.
        </p>

        <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
        <p className="text-gray-700 mb-4">
          We prioritize data security and take reasonable measures to protect user and employee information. However, we cannot guarantee absolute security. By using our service, you acknowledge and accept the inherent risks involved in data transmission and storage.
        </p>

        <h2 className="text-xl font-semibold mb-2">5. Termination</h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to suspend or terminate your access to the service at our sole discretion for violating any of these terms.
        </p>

        <h2 className="text-xl font-semibold mb-2">6. Changes to the Terms</h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to modify or update these Terms of Service at any time, with or without notice. Continued use of the app constitutes acceptance of such changes.
        </p>

        <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          To the fullest extent permitted by law, we shall not be liable for any damages or losses arising out of your use of the app.
        </p>

        <h2 className="text-xl font-semibold mb-2">8. Contact Information</h2>
        <p className="text-gray-700 mb-4">
          For any questions about these Terms of Service, please contact us at [Insert Contact Email].
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
