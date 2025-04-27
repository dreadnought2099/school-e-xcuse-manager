
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { School } from 'lucide-react';
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
  const { currentReviewer, logoutReviewer } = useApp();
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  
  return (
    <header className="bg-school-700 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2" onClick={() => navigate('/')} role="button">
          <School className="h-6 w-6" />
          <h1 className="text-xl font-bold hidden md:block">School Excuse Management System</h1>
          <h1 className="text-xl font-bold md:hidden">SEMS</h1>
        </div>
        
        <div className="flex items-center gap-2">
          {!currentReviewer ? (
            <>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/submit')}
                className="text-school-700"
              >
                Submit Excuse
              </Button>
              
              <Sheet open={showLogin} onOpenChange={setShowLogin}>
                <SheetTrigger asChild>
                  <Button variant="outline">Reviewer Login</Button>
                </SheetTrigger>
                <SheetContent>
                  <ReviewerLogin onSuccess={() => setShowLogin(false)} />
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <>
              <Button 
                variant="secondary"
                onClick={() => navigate('/dashboard')}
                className="text-school-700"
              >
                Dashboard
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="focus:outline-none">
                    {currentReviewer.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="bg-white border shadow-md rounded-md min-w-[200px] z-50"
                >
                  <DropdownMenuLabel>
                    {currentReviewer.role.charAt(0).toUpperCase() + currentReviewer.role.slice(1)}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onSelect={logoutReviewer}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
