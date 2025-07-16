import React from 'react';

import { Calendar, User, TrendingUp, Heart, Zap, Star } from 'lucide-react';
import AdSpace from '../components/AdSpace';
import Footer from '../components/Footer';
import  { useState, useEffect } from 'react';



const BlogPage = () => {
  const [adKey, setAdKey] = useState(0);

  const blogPosts = [
    {
      id: 1,
      title: "10 Signs You're About to Go Viral on Social Media",
      excerpt: "These subtle indicators suggest your content is about to explode. Number 7 will shock you!",
      author: "Sarah Chen",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Viral Tips",
      icon: TrendingUp,
      color: "text-green-400"
    },
    {
      id: 2,
      title: "The Psychology Behind Profile Pictures That Get More Matches",
      excerpt: "Scientists reveal the hidden factors that make certain profile photos irresistible to potential matches.",
      author: "Dr. Mike Rodriguez",
      date: "2024-01-12",
      readTime: "8 min read",
      category: "Dating",
      icon: Heart,
      color: "text-pink-400"
    },
    {
      id: 3,
      title: "Your Birth Month Reveals Your Social Media Personality",
      excerpt: "Discover how your birth month influences your online behavior and content preferences.",
      author: "Luna Martinez",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Personality",
      icon: Star,
      color: "text-purple-400"
    },
    {
      id: 4,
      title: "Why Your Username Says More About You Than You Think",
      excerpt: "The hidden psychology behind username choices and what they reveal about personality traits.",
      author: "Alex Thompson",
      date: "2024-01-08",
      readTime: "4 min read",
      category: "Psychology",
      icon: Zap,
      color: "text-yellow-400"
    },
    {
      id: 5,
      title: "The Secret Formula for Creating Shareable Content",
      excerpt: "Industry insiders reveal the exact elements that make content go viral every single time.",
      author: "Emma Wilson",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "Content",
      icon: TrendingUp,
      color: "text-blue-400"
    },
    {
      id: 6,
      title: "How to Read Someone's Personality from Their Social Media",
      excerpt: "Learn the subtle signs that reveal someone's true personality through their online presence.",
      author: "Dr. James Park",
      date: "2024-01-03",
      readTime: "9 min read",
      category: "Analysis",
      icon: Star,
      color: "text-cyan-400"
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Viral Insights Blog
          </h1>
          <p className="text-xl text-white/80 mb-6">
            Discover the secrets behind viral content and social psychology
          </p>
          <div className="flex justify-center space-x-6 text-white/60">
            <span>📈 Trending Topics</span>
            <span>🧠 Psychology Insights</span>
            <span>💡 Viral Strategies</span>
          </div>
        </div>

        {/* Ad Space */}
<AdSpace key={adKey} size="leaderboard" className="mb-8" />

        {/* Featured Post */}
        <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-12">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-green-400 mr-3" />
            <span className="text-green-400 font-semibold">Featured Post</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            The Ultimate Guide to Going Viral in 2024
          </h2>
          <p className="text-white/80 text-lg mb-6">
            Everything you need to know about creating content that spreads like wildfire. 
            From timing to psychology, we break down the exact formula used by top influencers.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-white/60">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>ProfileVibe Team</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Jan 18, 2024</span>
              </div>
              <span>12 min read</span>
            </div>
            <button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-2 rounded-full font-semibold transition-all duration-200">
              Read More
            </button>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => {
            const Icon = post.icon;
            return (
              <div key={post.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-200 cursor-pointer group">
                <div className="flex items-center mb-4">
                  <Icon className={`w-5 h-5 ${post.color} mr-2`} />
                  <span className={`text-sm font-semibold ${post.color}`}>
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-white/70 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-white/50">
                  <div className="flex items-center space-x-3">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>

                {/* Ad Space every 3rd post */}
                {(index + 1) % 3 === 0 && (
                  <div className="mt-6">
                    <AdSpace key={adKey} size="banner" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Ad Space */}
        <AdSpace key={adKey} size="rectangle" className="mb-12" />

        {/* Newsletter Signup */}
        <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Get Viral Insights Weekly
          </h3>
          <p className="text-white/80 mb-6">
            Join 50K+ creators who get our exclusive tips for going viral
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-r-2xl font-semibold transition-all duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;