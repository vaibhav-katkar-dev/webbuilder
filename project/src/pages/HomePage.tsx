import React, { useState } from 'react';
import { Sparkles, Heart, TrendingUp, Users, Zap, Share2, Star, Trophy, Target, Eye } from 'lucide-react';
import AdSpace from '../components/AdSpace';
import Footer from '../components/Footer';


interface AnalysisResult {
  personality: string;
  loveLife: string;
  career: string;
  viralPotential: number;
  compatibility: string;
  secretTalent: string;
  futurePredict: string;
  socialStatus: string;
  attractiveness: number;
  popularity: number;
}

const HomePage = () => {
  const [adKey, setAdKey] = useState(0);

  const [username, setUsername] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showShareMessage, setShowShareMessage] = useState(false);

const personalities = [
  "You’re that person who randomly goes viral on Reels for doing the most normal thing in the most filmy way.",
  "Your vibe is ‘chai pe charcha’ meets midnight philosophy. Desi yet deep.",
  "You're the one who quotes Bollywood dialogues in serious convos and somehow makes it profound.",
  "You don’t chase trends – they chase you. People literally save your posts for captions.",
  "People think you're quiet, but you're just observing like a low-key K-drama protagonist.",
  "You’ve got main-character energy, but also side-character chill. Perfect combo.",
  "You’re the one who sends the perfect meme at the exact right time. Every group chat needs you.",
  "You look unbothered but you know everyone’s business. Silent killer vibes.",
  "Everyone thinks you’re mysterious, but you're just thinking about biryani.",
  "You're the one who turns every ‘no plans’ weekend into a core memory."
];


 const loveLife = [
  "Someone’s stalking your Insta and pretending it’s accidental. Spoiler: It's not.",
  "Your crush will reply to your story this week. Don’t leave them on seen this time.",
  "Next relationship? Online. But desi-style: cousins will know before your parents.",
  "You’ll meet someone cute over a chai break. Real filmy scene incoming.",
  "Stop ignoring that one person who always reacts with ❤️ – they mean it.",
  "A soft-spoken gym bro or aesthetic queen is about to fall hard for you.",
  "Next love will feel like old-school SRK – dramatic, intense, unforgettable.",
  "Your DMs will glow up right after your next post. New haircut = new bae?",
  "That one person you're always ‘just friends’ with? Not for long.",
  "Your love life will peak when you stop caring and start vibing."
];


 const careers = [
  "You’ll go viral for a side hustle and accidentally become an entrepreneur.",
  "You’ve got content creator energy – reels, memes, vlogs – all in your zone.",
  "You’ll start something small online and brands will slide in for collabs.",
  "Tech + storytelling = your sweet spot. Build apps with soul.",
  "You're meant for something bigger than 9–5. Think CEO, not employee.",
  "Your LinkedIn profile is low-key fire – it’ll attract the right opportunity soon.",
  "You can literally make ₹₹₹ from your aesthetic sense. Use it.",
  "Start posting what you love. People are waiting, even if you don’t know it yet.",
  "Your career growth will come from a ‘random’ DM. Don’t ignore the small stuff.",
  "You’ll switch fields and everyone will copy you after 6 months."
];


  const compatibilities = [
  "People who vibe to Arijit Singh and can still scream to AP Dhillon.",
  "Someone who loves roadside chai and 5-star dinners equally.",
  "Ambitious folks who also watch motivational reels at 2 AM.",
  "Someone who sends memes, voice notes, and ‘reached safely’ updates.",
  "Old souls who also love chaotic Instagram lives.",
  "Someone with dreams bigger than their phone storage.",
  "The one who’ll take selfies with you at India Gate or Marine Drive at 3AM.",
  "Someone who understands the value of silence AND Spotify playlists.",
  "People who love fully, fight filmy, and stay real.",
  "Someone who’ll match your chaos but still call your mom aunty respectfully."
];


  const secretTalents = [
  "You can decode toxic vibes before they even type 'Hi'.",
  "You know how to roast people so well they thank you after.",
  "Your meme game is actually influencing culture. Low-key influencer.",
  "You vibe-check everyone in a room within 3 seconds of entering.",
  "Your Instagram caption skills = elite. Brands should pay you.",
  "You could run a gossip page anonymously and nobody would suspect you.",
  "You’d win reality shows without even trying. You’re that entertaining.",
  "Your advice hits harder than your WiFi bill.",
  "You’re a vibe architect – you fix bad moods just by showing up.",
  "You make Spotify playlists that feel like therapy sessions."
];

const futurePredicts = [
  "One of your reels or tweets is about to go crazy viral. Like 10K+ overnight.",
  "Your next story reply will lead to something way deeper than you expect.",
  "A random skill you learned during lockdown will become your biggest flex.",
  "Someone unexpected will confess feelings. You’ll pretend to be shocked.",
  "Your name will be associated with something cool. Maybe even a startup?",
  "An opportunity will come from someone who’s been watching your journey silently.",
  "Your childhood dream? You’re closer to achieving it than you think.",
  "You’ll glow up so hard that even your school crush will take notice.",
  "Your next upload will hit different. Screenshot this.",
  "You’ll go from ‘Who’s this?’ to ‘I know them’ in people’s group chats."
];

const socialStatuses = [
  "You’re the friend people secretly flex about knowing.",
  "You always look like you’re headed to a shoot – even when grocery shopping.",
  "You post once and vanish – pure mystery, pure legend.",
  "Your vibe is so strong, even strangers feel like they know you.",
  "You're that one friend who somehow knows everyone – online and offline.",
  "Your posts get saved more than liked. That’s real influence.",
  "You’re soft-spoken in person, savage in DMs.",
  "You’re the person everyone stalks but never DMs first.",
  "Your stories get more views than your posts – you're a proper enigma.",
  "Your presence = everyone becomes funnier, cooler, and more aesthetic."
];


  const generateAnalysis = (): AnalysisResult => {
    const randomSelect = (array: string[]) => array[Math.floor(Math.random() * array.length)];
    
    return {
      personality: randomSelect(personalities),
      loveLife: randomSelect(loveLife),
      career: randomSelect(careers),
      viralPotential: Math.floor(Math.random() * 25) + 75,
      compatibility: randomSelect(compatibilities),
      secretTalent: randomSelect(secretTalents),
      futurePredict: randomSelect(futurePredicts),
      socialStatus: randomSelect(socialStatuses),
      attractiveness: Math.floor(Math.random() * 15) + 85,
      popularity: Math.floor(Math.random() * 20) + 80
    };
  };

  const handleAnalyze = async () => {
    if (!username.trim()) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const analysis = generateAnalysis();
    setResult(analysis);
    setLoading(false);
  };

  const handleShare = () => {
    setShowShareMessage(true);
    setTimeout(() => setShowShareMessage(false), 3000);
  };

  const reset = () => {
    setResult(null);
    setUsername('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center text-white max-w-sm">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-3 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
            <Sparkles className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h2 className="text-xl font-bold mb-2">Analyzing @{username}</h2>
          <p className="text-white/80 text-sm">Reading your vibe and energy...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen py-6 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Ad Space */}
          <AdSpace  key={adKey}size="leaderboard" className="mb-8" />

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Your Profile Analysis</h1>
            <p className="text-white/90 text-lg">@{username}</p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
              <div className="text-2xl font-bold text-white">{result.attractiveness}%</div>
              <div className="text-white/80 text-sm">Attractiveness</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
              <div className="text-2xl font-bold text-white">{result.viralPotential}%</div>
              <div className="text-white/80 text-sm">Viral Potential</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
              <div className="text-2xl font-bold text-white">{result.popularity}%</div>
              <div className="text-white/80 text-sm">Popularity</div>
            </div>
          </div>

          {/* Ad Space */}
          <AdSpace key={adKey} size="banner" className="mb-8" />

          {/* Analysis Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <Zap className="w-5 h-5 text-yellow-400 mr-3" />
                <h3 className="text-lg font-bold text-white">Your Personality</h3>
              </div>
              <p className="text-white/90 leading-relaxed">{result.personality}</p>
            </div>

            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <Heart className="w-5 h-5 text-pink-400 mr-3" />
                <h3 className="text-lg font-bold text-white">Love Life</h3>
              </div>
              <p className="text-white/90 leading-relaxed">{result.loveLife}</p>
            </div>

            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-5 h-5 text-green-400 mr-3" />
                <h3 className="text-lg font-bold text-white">Career Path</h3>
              </div>
              <p className="text-white/90 leading-relaxed">{result.career}</p>
            </div>

            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <Users className="w-5 h-5 text-blue-400 mr-3" />
                <h3 className="text-lg font-bold text-white">Best Match</h3>
              </div>
              <p className="text-white/90 leading-relaxed">{result.compatibility}</p>
            </div>

            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-purple-400 mr-3" />
                <h3 className="text-lg font-bold text-white">Hidden Talent</h3>
              </div>
              <p className="text-white/90 leading-relaxed">{result.secretTalent}</p>
            </div>

            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <Eye className="w-5 h-5 text-cyan-400 mr-3" />
                <h3 className="text-lg font-bold text-white">Social Status</h3>
              </div>
              <p className="text-white/90 leading-relaxed">{result.socialStatus}</p>
            </div>
          </div>

          {/* Future Prediction */}
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
            <div className="flex items-center mb-4">
              <Target className="w-5 h-5 text-orange-400 mr-3" />
              <h3 className="text-lg font-bold text-white">Future Prediction</h3>
            </div>
            <p className="text-white/90 leading-relaxed text-lg">{result.futurePredict}</p>
          </div>

          {/* Ad Space */}
          <AdSpace key={adKey} size="rectangle" className="mb-8" />

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            {showShareMessage && (
              <div className="bg-green-500/20 text-green-100 px-6 py-3 rounded-full inline-block">
                Screenshot and share your results! 📱✨
              </div>
            )}
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleShare}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center space-x-2 backdrop-blur-sm border border-white/10"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Results</span>
              </button>
              
              <button
                onClick={reset}
                className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition-all duration-200"
              >
                Try Another
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
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Profile Analyzer
          </h1>
          <p className="text-lg text-white/90 mb-2">
            Discover your true personality and future potential
          </p>
          <p className="text-white/70 text-sm">
            ✨ Join 3M+ users who discovered their vibe ✨
          </p>
        </div>

        {/* Ad Space */}
        <AdSpace key={adKey} size="banner" className="mb-8" />

        <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-3">
                Enter your username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">@</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className="w-full pl-8 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                />
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!username.trim()}
              className="w-full bg-white text-purple-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Analyze My Profile ✨
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm">
            🔥 Over 100K analyses completed today
          </p>
        </div>

        <div className="mt-10 grid grid-cols-4 gap-3 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-lg font-bold text-white">3M+</div>
            <div className="text-white/70 text-xs">Users</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-lg font-bold text-white">99%</div>
            <div className="text-white/70 text-xs">Accuracy</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-lg font-bold text-white">1M+</div>
            <div className="text-white/70 text-xs">Shares</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-lg font-bold text-white">4.9⭐</div>
            <div className="text-white/70 text-xs">Rating</div>
          </div>
        </div>
      </div>
    </div>
      <Footer/>
    </>
  );
};

export default HomePage;