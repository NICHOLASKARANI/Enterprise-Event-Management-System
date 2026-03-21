import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🏥 Premium Clinic Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Complete solution for modern healthcare practices
          </p>
          <Link href="/dashboard">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700">
              Launch Dashboard →
            </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3">👥 Patient Management</h3>
            <p className="text-gray-600">Manage patient records, medical history, and documents</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3">📅 Appointments</h3>
            <p className="text-gray-600">Schedule and manage appointments with intelligent calendar</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3">📋 Medical Records</h3>
            <p className="text-gray-600">Electronic medical records with SOAP notes and prescriptions</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3">💰 Billing & Payments</h3>
            <p className="text-gray-600">Automated invoicing, insurance claims, and payment processing</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3">📦 Inventory</h3>
            <p className="text-gray-600">Track medications, supplies, and automated reordering</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3">🔬 Lab Integration</h3>
            <p className="text-gray-600">Order lab tests and receive results digitally</p>
          </div>
        </div>
      </div>
    </div>
  )
}