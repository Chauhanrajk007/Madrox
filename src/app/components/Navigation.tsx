import { Link } from "react-router";
import { Activity, UserCircle, Menu } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import { LoginModal } from "@/app/components/LoginModal";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/app/components/ui/sheet";

export function Navigation() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link
        to="/bill-audit"
        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Scan Bill
      </Link>
      <Link
        to="/doctor-search"
        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Find Doctors
      </Link>
      <Link
        to="/dashboard"
        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Dashboard
      </Link>
      <Link
        to="/community"
        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Community
      </Link>
    </>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">Medrox</span>
          </Link>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <NavLinks />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden md:flex items-center gap-2">
               <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowLoginModal(true)}
              >
                <UserCircle className="w-5 h-5" />
              </Button>
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                 <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                 <SheetDescription className="sr-only">Navigation links</SheetDescription>
                <div className="flex flex-col gap-6 mt-8">
                   <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                       <Activity className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-semibold text-foreground">Medrox</span>
                   </div>
                  <nav className="flex flex-col gap-4">
                    <NavLinks />
                  </nav>
                  <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2"
                      onClick={() => {
                        setIsOpen(false);
                        setShowLoginModal(true);
                      }}
                    >
                      <UserCircle className="w-4 h-4" />
                      Login
                    </Button>
                    <Button asChild className="w-full">
                      <Link to="/login" onClick={() => setIsOpen(false)}>Sign Up</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <LoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
      />
    </>
  );
}
