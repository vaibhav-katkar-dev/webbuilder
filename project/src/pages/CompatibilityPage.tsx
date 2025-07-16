import React, { useState } from 'react';
import { Heart, Users, Sparkles, Target } from 'lucide-react';
import AdSpace from '../components/AdSpace';
import Footer from '../components/Footer';

const CompatibilityPage = () => {
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [adKey, setAdKey] = useState(0); // for refreshing AdSpace


  const compatibilityResults = [
    {
      score: 95,
      title: "Soulmate Connection",
      description: "You two are literally meant for each other. Your energies complement perfectly and you bring out the best in one another.",
      advice: "Don't let this one go! This is the kind of connection people search for their whole lives.",
      color: "text-pink-400"
    },
    {
      score: 88,
      title: "Power Couple Potential",
      description: "You both have strong personalities that work incredibly well together. You challenge and inspire each other.",
      advice: "Focus on communication and you'll build something amazing together.",
      color: "text-purple-400"
    },
    {
      score: 82,
      title: "Great Chemistry",
      description: "There's definitely something special here. You share similar values and have natural chemistry.",
      advice: "Take time to really get to know each other - the potential is definitely there.",
      color: "text-blue-400"
    },
    {
      score: 76,
      title: "Good Match",
      description: "You complement each other well and have a solid foundation for a relationship.",
      advice: "Work on understanding each other's differences and you'll grow stronger together.",
      color: "text-green-400"
    },
    {
      score: 69,
      title: "Interesting Dynamic",
      description: "You're different in ways that could either create amazing balance or some challenges.",
      advice: "Communication will be key to making this work, but it could be worth the effort.",
      color: "text-yellow-400"
    }
  ];

  const generateCompatibility = () => {
    const randomResult = compatibilityResults[Math.floor(Math.random() * compatibilityResults.length)];
    const personalizedAdvice = [
      `${user1} brings creativity and spontaneity, while ${user2} provides stability and grounding.`,
      `Both ${user1} and ${user2} have strong social skills that would make you a popular couple.`,
      `${user1}'s ambition perfectly matches ${user2}'s supportive nature.`,
      `You both share a love for adventure and trying new things together.`,
      `${user1} and ${user2} have complementary communication styles that work well together.`
    ];

    return {
      ...randomResult,
      personalizedAdvice: personalizedAdvice[Math.floor(Math.random() * personalizedAdvice.length)],
      sharedInterests: [
        "Deep conversations",
        "Travel and adventure",
        "Creative projects",
        "Social gatherings",
        "Personal growth"
      ].slice(0, 3),
      challenges: [
        "Different communication styles",
        "Varying social energy levels",
        "Different approaches to planning"
      ].slice(0, 2)
    };
  };

const handleAnalyze = async () => {
  if (!user1.trim() || !user2.trim()) return;

  setAdKey(prev => prev + 1); // reload ads
  setLoading(true);
  await new Promise(resolve => setTimeout(resolve, 2000));
  const compatibility = generateCompatibility();
  setResult(compatibility);
  setLoading(false);
};

  const reset = () => {
    setResult(null);
    setUser1('');
    setUser2('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center text-white max-w-sm">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-3 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
            <Heart className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-400" />
          </div>
          <h2 className="text-xl font-bold mb-2">Analyzing Compatibility</h2>
          <p className="text-white/80 text-sm">@{user1} × @{user2}</p>
          <p className="text-white/60 text-sm mt-2">Reading your combined energy...</p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Ad Space */}
          <AdSpace key={adKey} size="leaderboard" className="mb-8" />

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Compatibility Analysis
            </h1>
            <p className="text-white/90 text-lg">@{user1} × @{user2}</p>
          </div>

          {/* Score Display */}
          <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - result.score / 100)}`}
                  className={result.color}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">{result.score}%</span>
              </div>
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${result.color}`}>
              {result.title}
            </h2>
            <p className="text-white/80 text-lg">
              {result.description}
            </p>
          </div>

          {/* Analysis Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <Target className="w-5 h-5 text-green-400 mr-3" />
                <h3 className="text-lg font-bold text-white">Personalized Insight</h3>
              </div>
              <p className="text-white/90 leading-relaxed">{result.personalizedAdvice}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <Heart className="w-5 h-5 text-pink-400 mr-3" />
                <h3 className="text-lg font-bold text-white">Relationship Advice</h3>
              </div>
              <p className="text-white/90 leading-relaxed">{result.advice}</p>
            </div>
          </div>

          {/* Ad Space */}
          <AdSpace key={adKey} size="banner" className="mb-8" />

          {/* Shared Interests & Challenges */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <Sparkles className="w-5 h-5 text-yellow-400 mr-3" />
                <h3 className="text-lg font-bold text-white">Shared Interests</h3>
              </div>
              <ul className="space-y-2">
                {result.sharedInterests.map((interest: string, index: number) => (
                  <li key={index} className="text-white/80 flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    {interest}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <Users className="w-5 h-5 text-orange-400 mr-3" />
                <h3 className="text-lg font-bold text-white">Growth Areas</h3>
              </div>
              <ul className="space-y-2">
                {result.challenges.map((challenge: string, index: number) => (
                  <li key={index} className="text-white/80 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigator.share?.({ title: 'Check out our compatibility!', text: `@${user1} and @${user2} are ${result.score}% compatible!` })}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center space-x-2 backdrop-blur-sm border border-white/10"
              >
                <Heart className="w-4 h-4" />
                <span>Share Results</span>
              </button>
              
              <button
                onClick={reset}
                className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition-all duration-200"
              >
                Try Another Pair
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
    
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm mb-6 border border-white/10">
            <Heart className="w-8 h-8 text-pink-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Compatibility Test
          </h1>
          <p className="text-lg text-white/90 mb-2">
            Discover how compatible you are with someone special
          </p>
          <p className="text-white/70 text-sm">
            💕 Over 500K couples tested their compatibility 💕
          </p>
        </div>

        {/* Ad Space */}
<AdSpace key={adKey} size="banner" className="mb-8" />

        <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-3">
                First person's username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">@</span>
                <input
                  type="text"
                  value={user1}
                  onChange={(e) => setUser1(e.target.value)}
                  placeholder="username"
                  className="w-full pl-8 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="text-center">
              <Heart className="w-6 h-6 text-pink-400 mx-auto" />
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">
                Second person's username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">@</span>
                <input
                  type="text"
                  value={user2}
                  onChange={(e) => setUser2(e.target.value)}
                  placeholder="username"
                  className="w-full pl-8 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                />
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!user1.trim() || !user2.trim()}
              className="w-full bg-white text-purple-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Test Compatibility 💕
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm">
            🔥 Over 10K compatibility tests completed today
          </p>
        </div>
      </div>
      
       

    </div>
     <Footer/>
    </>
    
  );
};

export default CompatibilityPage;