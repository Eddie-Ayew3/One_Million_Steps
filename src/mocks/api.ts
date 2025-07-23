export interface User {
  id: string;
  name: string;
  email: string;
  gender?: string;
  referralCode: string;
  steps: number;
  donationTotal: number;
  device?: string;
}

export interface Referral {
  id: string;
  name: string;
  date: string;
  steps: number;
  donations: number;
  status: 'Active' | 'Inactive';
}

export interface Donation {
  id: string;
  amount: number;
  supporter: string;
  date: string;
  campaignId: string;
  campaignName: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  participants: number;
  institutions: number;
  joined: boolean;
  steps: number;
  goal: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  steps: number;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  mobile: string;
}

const simulateDelay = (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms));
const simulateError = () => Math.random() < 0.1; // 10% chance of error for testing

export const signIn = async (credentials: SignInCredentials): Promise<User> => {
  await simulateDelay();
  if (simulateError()) throw new Error('Invalid email or password');
  if (
    credentials.email === 'john.doe@example.com' &&
    credentials.password === 'password123'
  ) {
    return {
      id: 'user1',
      name: 'John Doe',
      email: credentials.email,
      gender: 'male',
      referralCode: 'ABC123',
      steps: 15234,
      donationTotal: 500,
      device: localStorage.getItem('selectedDevice') || 'Unknown',
    };
  }
  throw new Error('Invalid email or password');
};

export const signUp = async (credentials: SignUpCredentials): Promise<User> => {
  await simulateDelay();
  if (simulateError()) throw new Error('Failed to create account');
  if (!credentials.name || !credentials.email || !credentials.password || !credentials.mobile) {
    throw new Error('All fields are required');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
    throw new Error('Invalid email format');
  }
  if (credentials.password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  return {
    id: `user${Math.random().toString(36).substr(2, 9)}`,
    name: credentials.name,
    email: credentials.email,
    gender: '',
    referralCode: `REF${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    steps: 0,
    donationTotal: 0,
    device: localStorage.getItem('selectedDevice') || 'Unknown',
  };
};

export const signInWithGoogle = async (): Promise<User> => {
  await simulateDelay();
  if (simulateError()) throw new Error('Google sign-in failed');
  return {
    id: 'user2',
    name: 'Google User',
    email: 'google.user@example.com',
    gender: '',
    referralCode: 'GOOGLE123',
    steps: 5000,
    donationTotal: 100,
    device: localStorage.getItem('selectedDevice') || 'Unknown',
  };
};

export const signInWithApple = async (): Promise<User> => {
  await simulateDelay();
  if (simulateError()) throw new Error('Apple sign-in failed');
  return {
    id: 'user3',
    name: 'Apple User',
    email: 'apple.user@example.com',
    gender: '',
    referralCode: 'APPLE123',
    steps: 3000,
    donationTotal: 50,
    device: localStorage.getItem('selectedDevice') || 'Unknown',
  };
};

export const fetchUser = async (): Promise<User> => {
  await simulateDelay();
  if (simulateError()) throw new Error('Failed to fetch user');
  return {
    id: 'user1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    gender: 'male',
    referralCode: 'ABC123',
    steps: 15234,
    donationTotal: 500,
    device: localStorage.getItem('selectedDevice') || 'Unknown',
  };
};

export const fetchReferrals = async (): Promise<Referral[]> => {
  await simulateDelay();
  if (simulateError()) throw new Error('Failed to fetch referrals');
  return [
    {
      id: 'ref1',
      name: 'Jane Smith',
      date: '2025-06-15',
      steps: 12345,
      donations: 200,
      status: 'Active',
    },
    {
      id: 'ref2',
      name: 'Alice Johnson',
      date: '2025-07-01',
      steps: 8765,
      donations: 150,
      status: 'Inactive',
    },
  ];
};

export const fetchDonations = async (): Promise<Donation[]> => {
  await simulateDelay();
  if (simulateError()) throw new Error('Failed to fetch donations');
  const donations = [
    {
      id: 'don1',
      amount: 100,
      supporter: 'John Doe',
      date: '2025-07-10',
      campaignId: 'camp1',
      campaignName: 'Million Steps Challenge',
    },
    {
      id: 'don2',
      amount: 250,
      supporter: 'Jane Smith',
      date: '2025-07-12',
      campaignId: 'camp1',
      campaignName: 'Million Steps Challenge',
    },
    {
      id: 'don3',
      amount: 150,
      supporter: 'Alice Johnson',
      date: '2025-07-15',
      campaignId: 'camp2',
      campaignName: 'Community Walk 2025',
    },
    {
      id: 'don4',
      amount: 300,
      supporter: 'Bob Brown',
      date: '2025-07-20',
      campaignId: 'camp2',
      campaignName: 'Community Walk 2025',
    },
  ];
  // Mock usage of campaignId to avoid TS6133
  const activeCampaigns = ['camp1', 'camp2'];
  return donations.filter(d => activeCampaigns.includes(d.campaignId));
};

export const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  await simulateDelay();
  if (simulateError()) throw new Error('Failed to fetch leaderboard');
  return [
    { id: 'user1', name: 'John Doe', steps: 15234 },
    { id: 'user2', name: 'Jane Smith', steps: 12345 },
    { id: 'user3', name: 'Alice Johnson', steps: 8765 },
  ];
};

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  await simulateDelay();
  if (simulateError()) throw new Error('Failed to fetch campaigns');
  return [
    {
      id: 'camp1',
      name: 'Million Steps Challenge',
      description: 'Walk for a healthier Ghana!',
      participants: 4200,
      institutions: 25,
      joined: false,
      steps: 1000000,
      goal: 2000000,
    },
    {
      id: 'camp2',
      name: 'Community Walk 2025',
      description: 'Step up for community health!',
      participants: 1800,
      institutions: 10,
      joined: true,
      steps: 500000,
      goal: 1000000,
    },
  ];
};

export const joinCampaign = async (campaignId: string): Promise<void> => {
  await simulateDelay();
  if (simulateError()) throw new Error('Failed to join campaign');
  // Mock usage of campaignId to validate against active campaigns
  const activeCampaigns = ['camp1', 'camp2'];
  if (!activeCampaigns.includes(campaignId)) {
    throw new Error(`Campaign ${campaignId} is not active`);
  }
  // Simulate successful join
};