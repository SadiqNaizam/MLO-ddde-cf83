import React from 'react';
import { Link } from 'react-router-dom';
import { Gem, Instagram, Twitter, Facebook } from 'lucide-react';

const LuxurySiteFooter: React.FC = () => {
  console.log('LuxurySiteFooter loaded');
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Terms & Conditions', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'FAQs', path: '/faq' },
  ];

  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, path: 'https://instagram.com', label: 'Instagram' },
    { icon: <Twitter className="h-5 w-5" />, path: 'https://twitter.com', label: 'Twitter' },
    { icon: <Facebook className="h-5 w-5" />, path: 'https://facebook.com', label: 'Facebook' },
  ];

  return (
    <footer className="bg-secondary/30 border-t border-border/40 text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2 mb-3 group">
              <Gem className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
              <span className="font-bold text-xl tracking-tight">AURORA</span>
            </Link>
            <p className="text-xs text-muted-foreground text-center md:text-left">
              Crafting bespoke elegance, tailored for you.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-col items-center md:items-start gap-2">
            <h3 className="text-sm font-semibold mb-2 uppercase tracking-wider">Explore</h3>
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social & Contact Teaser */}
          <div className="flex flex-col items-center md:items-end">
             <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">Connect</h3>
            <div className="flex gap-4 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
             <p className="text-xs text-muted-foreground">contact@aurora-atelier.com</p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/40 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} AURORA Atelier. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LuxurySiteFooter;