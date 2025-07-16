import React from 'react';
import { Sparkles, Users, Target, Zap, Heart, TrendingUp } from 'lucide-react';
import AdSpace from '../components/AdSpace';
import Footer from '../components/Footer';
import  { useState, useEffect } from 'react';


const AboutPage = () => {

  const [adKey, setAdKey] = useState(0);

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Analysis",
      description: "Our advanced algorithms analyze thousands of data points to give you the most accurate personality insights.",
      color: "text-purple-400"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join millions of users discovering their true potential and connecting with like-minded individuals.",
      color: "text-blue-400"
    },
    {
      icon: Target,
      title: "Personalized Results",
      description: "Every analysis is unique to you, providing insights that are relevant and actionable for your life.",
      color: "text-green-400"
    },
    {
      icon: Heart,
      title: "Relationship Insights",
      description: "Discover compatibility with others and get advice on building meaningful connections.",
      color: "text-pink-400"
    },
    {
      icon: TrendingUp,
      title: "Future Predictions",
      description: "Get glimpses into your potential future based on your current personality traits and behaviors.",
      color: "text-orange-400"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get comprehensive personality analysis in seconds, not hours. Fast, accurate, and always available.",
      color: "text-yellow-400"
    }
  ];

  const stats = [
    { number: "5M+", label: "Happy Users" },
    { number: "50M+", label: "Analyses Completed" },
    { number: "99.2%", label: "Accuracy Rate" },
    { number: "150+", label: "Countries Reached" }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Lead AI Researcher",
      description: "PhD in Psychology, 10+ years in personality analysis",
      avatar: "👩‍🔬"
    },
    {
      name: "Marcus Rodriguez",
      role: "Data Scientist",
      description: "Expert in machine learning and behavioral analytics",
      avatar: "👨‍💻"
    },
    {
      name: "Emma Thompson",
      role: "UX Designer",
      description: "Creating beautiful experiences that users love",
      avatar: "👩‍🎨"
    },
    {
      name: "Alex Kim",
      role: "Product Manager",
      description: "Bringing innovative features to life",
      avatar: "👨‍💼"
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm mb-8 border border-white/10">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About ProfileVibe
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to help people discover their true potential through advanced personality analysis 
            and social insights. Our platform combines cutting-edge AI with psychological research to provide 
            accurate, entertaining, and actionable insights about who you are and who you could become.
          </p>
        </div>

        {/* Ad Space */}
        <AdSpace key={adKey} size="leaderboard" className="mb-16" />

        {/* Mission Statement */}
        <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed">
              In a world where self-discovery often takes years, we believe everyone deserves instant access to 
              insights about their personality, potential, and path forward. We're democratizing personality analysis, 
              making it fun, shareable, and surprisingly accurate. Whether you're looking to understand yourself better, 
              find compatible connections, or just have fun with friends, ProfileVibe is your gateway to self-discovery.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Makes Us Special
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-200">
                  <div className="flex items-center mb-4">
                    <Icon className={`w-6 h-6 ${feature.color} mr-3`} />
                    <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ad Space */}
        <AdSpace key={adKey} size="banner" className="mb-16" />

        {/* Stats */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            By the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:bg-white/15 transition-all duration-200">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-lg font-bold text-white mb-2">{member.name}</h3>
                <div className="text-purple-400 font-semibold mb-3">{member.role}</div>
                <p className="text-white/70 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Space */}
        <AdSpace key={adKey} size="rectangle" className="mb-16" />

        {/* Technology */}
        <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">The Science Behind It</h2>
            <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
              Our analysis engine combines multiple psychological frameworks including the Big Five personality model, 
              social psychology research, and behavioral pattern recognition. We've trained our AI on millions of 
              personality assessments and social media patterns to provide insights that are both scientifically 
              grounded and surprisingly entertaining.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-400 mb-2">AI Analysis</div>
                <div className="text-white/80 text-sm">Advanced machine learning algorithms</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-400 mb-2">Psychology</div>
                <div className="text-white/80 text-sm">Evidence-based personality research</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-400 mb-2">Big Data</div>
                <div className="text-white/80 text-sm">Millions of data points analyzed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact/Join */}
        <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Discover Yourself?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join millions of users who've already discovered their true potential. 
            Your personality analysis is just one click away.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold text-lg transition-all duration-200 transform hover:scale-105">
              Get Started Now
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 backdrop-blur-sm border border-white/10">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;