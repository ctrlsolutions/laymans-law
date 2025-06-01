"use client";

import React from "react";

interface TermsAndConditionsProps {
  show: boolean;
  onClose: () => void;
}

export default function TermsAndConditions({ show, onClose }: TermsAndConditionsProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-10 ml-[250px] relative">
        <button
          className="absolute top-2 right-3 text-2xl font-bold text-gray-500 hover:text-black"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="text-xl font-semibold mb-4">Terms & Conditions</h3>
        <div className="max-h-[60dvh] overflow-y-auto text-sm text-gray-700 space-y-4">
          <div>
            <p><strong>1. Acceptance of Terms</strong></p>
            <p className="pl-4">
                By accessing or using Layman's Law (the Platform), a project of Ctrl Solutions, you agree to be bound by these Terms and Conditions. If you do not agree with any part, you must not use the Platform.
            </p>
            </div>

            <div>
            <p><strong>2. Description of Service</strong></p>
            <p className="pl-4">
                Layman's Law provides legal wikis, translations, case submission, lawyer Q&A, forums, and OFW support. These services aim to empower marginalized communities with legal information and access to professionals.
            </p>
            </div>

            <div>
            <p><strong>3. User Accounts</strong></p>
            <p className="pl-4">
                Users must register and are responsible for maintaining the confidentiality and accuracy of their account information.
            </p>
            </div>

            <div>
            <p><strong>4. Lawyer Verification</strong></p>
            <p className="pl-4">
                Lawyers must be verified. The platform does not guarantee the accuracy or outcome of legal advice provided.
            </p>
            </div>

            <div>
            <p><strong>5. User-Generated Content</strong></p>
            <p className="pl-4">
                You retain ownership of your content but grant Layman's Law a license to use it. You agree not to post unlawful, misleading, or harmful content.
            </p>
            </div>

            <div>
            <p><strong>6. Limitation of Liability</strong></p>
            <p className="pl-4">
                Ctrl Solutions is not liable for any actions taken outside the platform or misuse of its services. The platform is not responsible for external communication or legal outcomes.
            </p>
            </div>

            <div>
            <p><strong>7. Data Privacy</strong></p>
            <p className="pl-4">
                Personal data is collected to support legal aid and platform functionality. Data is never sold and is only shared as required by law.
            </p>
            </div>

            <div>
            <p><strong>8. Third-Party Content</strong></p>
            <p className="pl-4">
                The platform may link to external resources (e.g., embassies). We do not control or endorse these sites.
            </p>
            </div>

            <div>
            <p><strong>9. Account Termination</strong></p>
            <p className="pl-4">
                You may delete your account at any time. We may suspend accounts that violate these terms.
            </p>
            </div>

            <div>
            <p><strong>10. Modifications to Terms</strong></p>
            <p className="pl-4">
                Terms may be updated. Continued use of the platform constitutes acceptance of changes.
            </p>
            </div>

            <div>
            <p><strong>11. Governing Law</strong></p>
            <p className="pl-4">
                These terms are governed by the laws of the Republic of the Philippines.
            </p>
            </div>

            <div>
            <p><strong>12. Contact</strong></p>
            <p className="pl-4">
                For any concerns, contact us at: <a href="mailto:ctrlsolutions.space@gmail.com" className="text-blue-600 underline" rel="noopener noreferrer" target="_blank">ctrlsolutions.space@gmail.com</a>
            </p>
            </div>
        </div>
      </div>
    </div>
  );
}
