import React, { useState, useEffect, useCallback } from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { fetchDonations, type Donation } from '../../../mocks/api';
import Modal from './Modal';
import Toast from './Toast';

const Donations: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<string>('camp1');
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDonationsData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchDonations();
      setDonations(data);
      setError(null);
    } catch (err) {
      setError('Failed to load donations.');
      setShowToast({ message: 'Failed to load donations.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDonationsData();
  }, [fetchDonationsData]);

  const handleDonate = () => {
    if (!donationAmount || Number(donationAmount) <= 0) {
      setShowToast({ message: 'Please enter a valid donation amount.', type: 'error' });
      return;
    }
    if (!selectedCampaign) {
      setShowToast({ message: 'Please select a campaign.', type: 'error' });
      return;
    }

    setShowDonationModal(false);
    setShowToast({ message: 'Donation successful!', type: 'success' });

    setDonationAmount('');
    setSelectedCampaign('camp1');

    setDonations((prev) => [
      ...prev,
      {
        id: `don${prev.length + 1}`,
        amount: Number(donationAmount),
        supporter: 'Current User', // Replace with real user data
        date: new Date().toISOString().split('T')[0],
        campaignId: selectedCampaign,
        campaignName: selectedCampaign === 'camp1' ? 'Million Steps Challenge' : 'Community Walk 2025',
      },
    ]);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">My Donations</h1>
      <button
        onClick={() => setShowDonationModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Make a donation"
      >
        Make a Donation
      </button>

      {loading && (
        <div className="text-center text-gray-600" role="status">
          Loading donations...
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
          <button
            onClick={fetchDonationsData}
            className="ml-4 text-sm text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Retry loading donations"
          >
            Retry
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <CurrencyDollarIcon className="w-8 h-8 text-green-500" />
          <h2 className="text-xl font-semibold">Donation History</h2>
        </div>
        {donations.length === 0 && !loading && !error ? (
          <p className="text-sm text-gray-500" aria-live="polite">
            No donations yet. Start by making a donation!
          </p>
        ) : (
          <div className="space-y-4">
            {donations.map((donation) => (
              <div key={donation.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">GHS {donation.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">From {donation.supporter}</p>
                    <p className="text-sm text-gray-500">For {donation.campaignName}</p>
                  </div>
                  <span className="text-sm text-gray-500">{donation.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
        title="Make a Donation"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Campaign</label>
            <select
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Select campaign for donation"
            >
              <option value="camp1">Million Steps Challenge</option>
              <option value="camp2">Community Walk 2025</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Donation Amount (GHS)</label>
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Donation amount"
              min="0"
              required
            />
          </div>
          <button
            onClick={handleDonate}
            disabled={!donationAmount || Number(donationAmount) <= 0 || !selectedCampaign}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Submit donation"
          >
            Donate
          </button>
        </div>
      </Modal>

      {showToast && (
        <Toast
          message={showToast.message}
          type={showToast.type}
          onClose={() => setShowToast(null)}
        />
      )}
    </div>
  );
};

export default Donations;
