import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Gamepad2, User, Trophy, MessageSquare, BookOpen, CheckSquare, Bot, LogOut, Joystick } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { name: "Home", path: "/", icon: Gamepad2 },
    { name: "Quests", path: "/quests", icon: BookOpen },
    { name: "Tasks", path: "/tasks", icon: CheckSquare },
    { name: "Mini Games", path: "/mini-games", icon: Joystick },
    { name: "AI Chat", path: "/chatbot", icon: Bot },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Contact", path: "/contact", icon: MessageSquare },
  ];
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="bg-card border-b border-border shadow-nature">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-nature w-10 h-10 rounded-lg flex items-center justify-center">
                <Gamepad2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-nature bg-clip-text text-transparent">
                FarmQuest
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.name} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "quest" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 px-3 py-2 text-sm">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{user?.username}</span>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="quest" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block"
                  >
                    <Button
                      variant={isActive(item.path) ? "quest" : "ghost"}
                      className="w-full justify-start flex items-center space-x-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 flex items-center space-x-2 text-sm border-t border-border mt-2 pt-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{user?.username}</span>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="block">
                  <Button variant="quest" className="w-full justify-start flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;