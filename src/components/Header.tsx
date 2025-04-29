
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { BookOpen, Settings, Menu } from 'lucide-react';
import ReviewerLogin from './ReviewerLogin';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { currentReviewer, logoutReviewer, isAdmin } = useApp();
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate('/')} 
          >
            <div className="bg-gradient-primary p-2 rounded-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-school-800 hidden md:block">School Excuse System</h1>
              <h1 className="text-lg font-bold text-school-800 md:hidden">SES</h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-school-700 hover:bg-school-50"
            >
              Home
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => navigate('/submit')}
              className="text-gray-700 hover:text-school-700 hover:bg-school-50"
            >
              Submit Letter
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => navigate('/status')}
              className="text-gray-700 hover:text-school-700 hover:bg-school-50"
            >
              Check Status
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            {!currentReviewer ? (
              <>
                <div className="hidden md:block">
                  <Button 
                    variant="outline"
                    className="border-school-600 text-school-600 hover:bg-school-50"
                    onClick={() => navigate('/submit')}
                  >
                    Submit Letter
                  </Button>
                </div>
                
                <Sheet open={showLogin} onOpenChange={setShowLogin}>
                  <SheetTrigger asChild>
                    <Button className="btn-gradient">Staff Login</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <ReviewerLogin onSuccess={() => setShowLogin(false)} />
                  </SheetContent>
                </Sheet>
                
                <div className="md:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <div className="flex flex-col space-y-4 mt-8">
                        <Button 
                          variant="ghost" 
                          onClick={() => navigate('/')}
                          className="justify-start"
                        >
                          Home
                        </Button>
                        <Button 
                          variant="ghost" 
                          onClick={() => navigate('/submit')}
                          className="justify-start"
                        >
                          Submit Letter
                        </Button>
                        <Button 
                          variant="ghost" 
                          onClick={() => navigate('/status')}
                          className="justify-start"
                        >
                          Check Status
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </>
            ) : (
              <>
                <Button 
                  variant="outline"
                  className="border-school-600 text-school-600 hover:bg-school-50"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className="focus:ring-0">
                      {currentReviewer.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="bg-white border shadow-md rounded-md min-w-[200px] z-50"
                  >
                    <DropdownMenuLabel className="text-gray-700">
                      {currentReviewer.role.charAt(0).toUpperCase() + currentReviewer.role.slice(1)}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onSelect={() => navigate('/dashboard')}
                      className="cursor-pointer text-gray-700 hover:bg-gray-100 focus:text-gray-700"
                    >
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onSelect={() => navigate('/user-management')}
                      className="cursor-pointer text-gray-700 hover:bg-gray-100 focus:text-gray-700"
                      disabled={!isAdmin}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      User Management
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onSelect={logoutReviewer}
                      className="cursor-pointer text-gray-700 hover:bg-gray-100 focus:text-gray-700"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
