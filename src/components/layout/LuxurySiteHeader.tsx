import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Gem, UserCircle, Menu, X } from 'lucide-react';

const LuxurySiteHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  console.log('LuxurySiteHeader loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block py-2 px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-primary rounded-md ${
      isActive ? 'text-primary bg-accent font-semibold' : 'text-foreground'
    }`;

  const navItems = [
    { label: 'Lookbook', path: '/' },
    { label: 'Collections', path: '/collections' },
    { label: 'Atelier', path: '/atelier' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Gem className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
          <span className="font-bold text-xl tracking-tight text-foreground">AURORA</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.path} className={navLinkClasses}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary">
            <Link to="/user-dashboard">
              <UserCircle className="h-5 w-5" />
              My Account
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border/40 shadow-lg pb-4 z-40">
          <div className="container flex flex-col gap-2 pt-2">
            {navItems.map((item) => (
              <NavLink key={item.label} to={item.path} className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/user-dashboard" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-center gap-2">
                <UserCircle className="h-5 w-5" />
                My Account
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default LuxurySiteHeader;