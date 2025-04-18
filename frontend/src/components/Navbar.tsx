
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "mr", name: "मराठी (Marathi)" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-agri-400 to-agri-600 flex items-center justify-center text-white font-bold text-lg">A</span>
              <span className="text-2xl font-bold gradient-text">AgriSmart</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-agri-600 transition-colors px-3 py-2 text-sm font-medium">Home</Link>
            <Link to="/features" className="text-gray-700 hover:text-agri-600 transition-colors px-3 py-2 text-sm font-medium">Features</Link>
            <Link to="/about" className="text-gray-700 hover:text-agri-600 transition-colors px-3 py-2 text-sm font-medium">About</Link>
            <Link to="/programs" className="text-gray-700 hover:text-agri-600 transition-colors px-3 py-2 text-sm font-medium">Programs</Link>
            <Link to="/contact" className="text-gray-700 hover:text-agri-600 transition-colors px-3 py-2 text-sm font-medium">Contact</Link>
            
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-agri-600 transition-colors px-3 py-2 text-sm font-medium">
                <Globe className="h-4 w-4" />
                <span>{currentLanguage.code.toUpperCase()}</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang)}
                    className="cursor-pointer hover:bg-agri-50"
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-2">
              <Button asChild variant="outline" size="sm" className="border-agri-500 text-agri-700 hover:bg-agri-50">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="bg-agri-500 hover:bg-agri-600 text-white">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Language Switcher (Mobile) */}
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2">
                <Globe className="h-5 w-5 text-gray-700" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang)}
                    className="cursor-pointer hover:bg-agri-50"
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Auth Button (Mobile) */}
            <Button asChild size="icon" variant="ghost">
              <Link to="/login">
                <User className="h-5 w-5 text-gray-700" />
              </Link>
            </Button>
            
            {/* Menu Toggle */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-agri-600 hover:bg-agri-50 focus:outline-none"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slide-in-bottom">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-agri-600 hover:bg-agri-50" onClick={toggleMenu}>Home</Link>
            <Link to="/features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-agri-600 hover:bg-agri-50" onClick={toggleMenu}>Features</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-agri-600 hover:bg-agri-50" onClick={toggleMenu}>About</Link>
            <Link to="/programs" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-agri-600 hover:bg-agri-50" onClick={toggleMenu}>Programs</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-agri-600 hover:bg-agri-50" onClick={toggleMenu}>Contact</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4 px-4">
              <Button asChild variant="outline" className="w-full border-agri-500 text-agri-700 hover:bg-agri-50">
                <Link to="/login" onClick={toggleMenu}>Login</Link>
              </Button>
              <Button asChild className="w-full bg-agri-500 hover:bg-agri-600 text-white">
                <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
