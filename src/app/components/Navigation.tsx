import { Link } from "react-router";
import { Activity, UserCircle, Menu, FileText, Stethoscope, LayoutDashboard, Users } from "lucide-react";
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
              <SheetContent side="left" className="w-[85vw] sm:w-[350px] p-0 border-r-0 bg-background/80 backdrop-blur-xl">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <SheetDescription className="sr-only">Navigation links</SheetDescription>

                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="p-6 border-b border-border/10 bg-gradient-to-r from-primary/10 to-transparent">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <Activity className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Medrox</span>
                        <p className="text-xs text-muted-foreground font-medium">Healthcare Simplified</p>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto py-6 px-4">
                    <nav className="flex flex-col gap-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-2">Menu</p>

                      <Link
                        to="/bill-audit"
                        className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-primary/5 active:bg-primary/10 transition-colors group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">Scan Bill</span>
                          <span className="text-xs text-muted-foreground">Audit medical expenses</span>
                        </div>
                      </Link>

                      <Link
                        to="/doctor-search"
                        className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-primary/5 active:bg-primary/10 transition-colors group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                          <Stethoscope className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">Find Doctors</span>
                          <span className="text-xs text-muted-foreground">Specialists near you</span>
                        </div>
                      </Link>

                      <Link
                        to="/dashboard"
                        className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-primary/5 active:bg-primary/10 transition-colors group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                          <LayoutDashboard className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">Dashboard</span>
                          <span className="text-xs text-muted-foreground">Your health overview</span>
                        </div>
                      </Link>

                      <Link
                        to="/community"
                        className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-primary/5 active:bg-primary/10 transition-colors group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                          <Users className="w-5 h-5 text-amber-600" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">Community</span>
                          <span className="text-xs text-muted-foreground">Connect with others</span>
                        </div>
                      </Link>
                    </nav>
                  </div>

                  {/* Footer Actions */}
                  <div className="p-6 pb-32 border-t border-border/10">
                    <div className="flex flex-col gap-3">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full justify-start gap-3 rounded-xl h-12 border-primary/20 hover:bg-primary/5 hover:text-primary"
                        onClick={() => {
                          setIsOpen(false);
                          setShowLoginModal(true);
                        }}
                      >
                        <UserCircle className="w-5 h-5" />
                        Login
                      </Button>
                      <Button asChild size="lg" className="w-full rounded-xl h-12 shadow-lg shadow-primary/25 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity">
                        <Link to="/login" onClick={() => setIsOpen(false)}>Create Account</Link>
                      </Button>
                    </div>
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
