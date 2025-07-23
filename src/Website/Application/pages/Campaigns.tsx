import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { ShareIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';
import Toast from './Toast';
import Modal from './Modal';
import { motion } from 'framer-motion';

const StepChart = lazy(() => import('./StepChart'));

interface Campaign {
  id: string;
  name: string;
  description: string;
  participants: number;
  institutions: number;
  joined: boolean;
  steps: number;
  goal: number;
}

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showJoinModal, setShowJoinModal] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const referralLink = 'https://stepup.gh/join-campaign';

  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/campaigns', {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
      });
      setCampaigns(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load campaigns. Please try again.');
      setShowToast({ message: 'Failed to load campaigns.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setShowToast({ message: 'Campaign link copied!', type: 'success' });
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setShowToast({ message: 'Failed to copy link.', type: 'error' });
    });
  };

  const handleJoinCampaign = async (campaignId: string) => {
    try {
      await axios.post(
        `/api/campaigns/${campaignId}/join`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }
      );
      setCampaigns((prev) =>
        prev.map((c) => (c.id === campaignId ? { ...c, joined: true } : c))
      );
      setShowToast({ message: 'Successfully joined campaign!', type: 'success' });
      setShowJoinModal(null);
    } catch (err) {
      setShowToast({ message: 'Failed to join campaign.', type: 'error' });
    }
  };

  const downloadQRCode = (campaignId: string) => {
    const canvas = document.getElementById(`qr-code-${campaignId}`) as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `campaign-${campaignId}-qr-code.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setShowToast({ message: 'QR code downloaded!', type: 'success' });
    } else {
      setShowToast({ message: 'Failed to download QR code.', type: 'error' });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-2">Active Campaigns</h1>
      <p className="text-gray-600 mb-4">
        Join and share ongoing campaigns to get more people involved!
      </p>

      {loading && (
        <div className="text-center text-gray-600" role="status">
          Loading campaigns...
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
          <button
            onClick={fetchCampaigns}
            className="ml-4 text-sm text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Retry loading campaigns"
          >
            Retry
          </button>
        </div>
      )}

      <Suspense fallback={<div>Loading chart...</div>}>
        {campaigns.map((campaign) => (
          <motion.div
            key={campaign.id}
            className="bg-white border rounded-xl shadow-sm p-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-blue-700">
                  {campaign.name} 🚶‍♂️💙
                </h2>
                <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
              </div>
              <div className="text-sm text-right text-gray-500">
                <p>
                  <strong>{campaign.participants.toLocaleString()}</strong> individuals joined
                </p>
                <p>
                  <strong>{campaign.institutions}</strong> institutions on board
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor={`referral-${campaign.id}`} className="block text-sm text-gray-500 mb-2">
                  Share Campaign Link
                </label>
                <div className="flex gap-2">
                  <input
                    id={`referral-${campaign.id}`}
                    type="text"
                    className="flex-1 border px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={referralLink}
                    readOnly
                    aria-label={`Referral link for ${campaign.name}`}
                  />
                  <button
                    onClick={copyReferralLink}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1 disabled:opacity-50"
                    disabled={copied}
                    aria-label={copied ? 'Link copied' : 'Copy campaign link'}
                  >
                    <ShareIcon className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-500 mb-2">QR Code</label>
                <div className="flex flex-col items-center">
                  <QRCodeCanvas
                    id={`qr-code-${campaign.id}`}
                    value={referralLink}
                    size={128}
                    className="border border-gray-200 p-2 rounded-lg"
                    aria-label={`QR code for ${campaign.name}`}
                  />
                  <button
                    onClick={() => downloadQRCode(campaign.id)}
                    className="mt-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`Download QR code for ${campaign.name}`}
                  >
                    Download QR Code
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">Step Progress</label>
              <div className="flex gap-2 mb-4">
                {['day', 'week', 'month'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range as 'day' | 'week' | 'month')}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      timeRange === range
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    aria-label={`View ${range} step progress`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
              <StepChart campaignId={campaign.id} timeRange={timeRange} steps={campaign.steps} goal={campaign.goal} />
            </div>

            {!campaign.joined && (
              <button
                onClick={() => setShowJoinModal(campaign.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Join ${campaign.name}`}
              >
                Join Campaign
              </button>
            )}
          </motion.div>
        ))}
      </Suspense>

      <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 mt-6">
        <div className="flex items-start gap-4">
          <BuildingOffice2Icon className="w-8 h-8 text-gray-500 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Are you representing an institution?
            </h3>
            <p className="text-sm text-gray-600 mt-1 mb-3">
              Onboard your organization or company to join the campaign and track collective impact.
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Request to onboard institution"
            >
              Request to Onboard
            </button>
          </div>
        </div>
      </div>

      {showJoinModal && (
        <Modal
          isOpen={!!showJoinModal}
          onClose={() => setShowJoinModal(null)}
          title="Join Campaign"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to join this campaign?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleJoinCampaign(showJoinModal)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Confirm join campaign"
              >
                Join
              </button>
              <button
                onClick={() => setShowJoinModal(null)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Cancel join campaign"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

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

export default Campaigns;