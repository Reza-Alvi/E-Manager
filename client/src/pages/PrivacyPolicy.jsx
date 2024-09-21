import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">Effective Date: [Insert Date]</p>

        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We collect personal information directly from users as well as employee-related data added to the system. This includes:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li><strong>User Information:</strong> Name, email, password, profile picture, and other personal details provided during sign-up.</li>
          <li><strong>Employee Data:</strong> Name, age, gender, contact details, job category, and salary, among other employment-related information.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">2. Use of Information</h2>
        <p className="text-gray-700 mb-4">
          We use the information to provide, maintain, and improve our services, including managing employee data, authenticating users, and resolving issues.
        </p>

        <h2 className="text-xl font-semibold mb-2">3. Data Storage and Security</h2>
        <p className="text-gray-700 mb-4">
          We store data securely using industry-standard encryption and best practices. User passwords are hashed, and sensitive data is protected from unauthorized access.
        </p>

        <h2 className="text-xl font-semibold mb-2">4. Sharing of Information</h2>
        <p className="text-gray-700 mb-4">
          We do not share personal information with third parties, except in cases such as compliance with legal obligations or with your consent.
        </p>

        <h2 className="text-xl font-semibold mb-2">5. User Rights</h2>
        <p className="text-gray-700 mb-4">
          You can access and review your profile information, update your personal information, and request to delete your account or employee data.
        </p>

        <h2 className="text-xl font-semibold mb-2">6. Cookies and Tracking</h2>
        <p className="text-gray-700 mb-4">
          We may use cookies to improve the user experience. You can control cookie settings through your browser, but disabling cookies may limit functionality.
        </p>

        <h2 className="text-xl font-semibold mb-2">7. Changes to the Privacy Policy</h2>
        <p className="text-gray-700 mb-4">
          We may modify this policy from time to time. Any changes will be reflected on this page, and continued use of the app signifies your acceptance of the updated policy.
        </p>

        <h2 className="text-xl font-semibold mb-2">8. Contact Information</h2>
        <p className="text-gray-700 mb-4">
          For any questions regarding this Privacy Policy, please contact us at [Insert Contact Email].
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
