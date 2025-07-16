import React, { useMemo } from 'react';

interface AdSpaceProps {
  size?: 'banner' | 'square' | 'rectangle' | 'leaderboard';
  className?: string;
}

const AdSpace: React.FC<AdSpaceProps> = ({ size = 'banner', className = '' }) => {
  const sizeClasses = {
    banner: 'h-24 w-full',
    square: 'h-64 w-64',
    rectangle: 'h-48 w-full',
    leaderboard: 'h-20 w-full'
  };

  // List of random ad messages
  const adMessages = [
    { title: '❤️ Love Test Pro', subtitle: 'Find out your true match instantly!' },
    { title: '🔥 Hot Deal: Couples Quiz App', subtitle: 'Get exclusive access to premium features' },
    { title: '🌟 Daily Zodiac Match', subtitle: 'What stars say about your love life' },
    { title: '🚀 Promote Your Brand Here', subtitle: 'Reach 100K+ users per month' },
    { title: '💌 AI Love Chat', subtitle: 'Talk to a virtual lover now' }
  ];

  // Pick a random ad every time the component reloads
  const randomAd = useMemo(() => {
    return adMessages[Math.floor(Math.random() * adMessages.length)];
  }, []);

  return (
    <div className={`${sizeClasses[size]} ${className} bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center`}>
      <div className="text-center">
        <div className="text-white/40 text-sm font-medium">{randomAd.title}</div>
        <div className="text-white/30 text-xs mt-1">{randomAd.subtitle}</div>
      </div>
    </div>
  );
};

export default AdSpace;
