import React from 'react';
import { Sparkles, Heart, Users, Mail, Twitter, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">ProfileVibe</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Discover your true personality and viral potential with our AI-powered analysis. 
              Join millions who found their vibe!
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Profile Analyzer</a></li>
              <li><a href="/compatibility" className="hover:text-white transition-colors">Compatibility Test</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-white/70 text-sm">
                <Mail className="w-4 h-4" />
                <span>hello@profilevibe.com</span>
              </div>
              <div className="flex items-center space-x-2 text-white/70 text-sm">
                <Users className="w-4 h-4" />
                <span>5M+ Happy Users</span>
              </div>
              <div className="flex items-center space-x-2 text-white/70 text-sm">
                <Heart className="w-4 h-4" />
                <span>99% Accuracy Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm">
            © 2024 ProfileVibe. All rights reserved. Made with ❤️ for viral content creators.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Privacy</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Terms</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;