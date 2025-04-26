
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const FilterBar = () => {
  const { 
    students,
    filterByDate, 
    filterByClass, 
    filterByStatus,
    setFilterByDate,
    setFilterByClass,
    setFilterByStatus,
    clearFilters
  } = useApp();
  
  // Get unique classes from students
  const classes = [...new Set(students.map(s => s.class).filter(Boolean))];
  
  // Check if any filters are active
  const hasActiveFilters = filterByDate || filterByClass || filterByStatus;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-medium">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !filterByDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filterByDate ? format(filterByDate, "PPP") : <span>Filter by date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filterByDate || undefined}
                onSelect={setFilterByDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-medium">Class</label>
          <Select 
            value={filterByClass || "all"} 
            onValueChange={(val) => setFilterByClass(val === "all" ? null : val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {classes.map((cls) => (
                <SelectItem key={cls} value={cls || "unknown"}>
                  {cls || "Unassigned"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-medium">Status</label>
          <Select 
            value={filterByStatus || "all"} 
            onValueChange={(val) => setFilterByStatus(val === "all" ? null : val as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="denied">Denied</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {hasActiveFilters && (
          <div className="flex items-end">
            <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-1 h-10">
              <X className="h-4 w-4" />
              <span>Clear</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
