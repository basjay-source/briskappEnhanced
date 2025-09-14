import React from 'react';
import { Search, Filter, Calendar, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface FilterOption {
  label: string;
  value: string;
}

interface SearchFilterHeaderProps {
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters?: {
    label: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
  dateRange?: {
    from: string;
    to: string;
    onFromChange: (value: string) => void;
    onToChange: (value: string) => void;
    onPresetChange?: (preset: string) => void;
  };
  className?: string;
}

export const SearchFilterHeader: React.FC<SearchFilterHeaderProps> = ({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  filters = [],
  dateRange,
  className = '',
}) => {
  const getDateRangePresets = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    
    return [
      {
        label: 'Today',
        from: formatDate(today),
        to: formatDate(today)
      },
      {
        label: 'This Week',
        from: formatDate(new Date(today.setDate(today.getDate() - today.getDay()))),
        to: formatDate(new Date(today.setDate(today.getDate() - today.getDay() + 6)))
      },
      {
        label: 'This Month',
        from: formatDate(new Date(currentYear, currentMonth, 1)),
        to: formatDate(new Date(currentYear, currentMonth + 1, 0))
      },
      {
        label: 'Last Month',
        from: formatDate(new Date(currentYear, currentMonth - 1, 1)),
        to: formatDate(new Date(currentYear, currentMonth, 0))
      },
      {
        label: 'This Quarter',
        from: formatDate(new Date(currentYear, Math.floor(currentMonth / 3) * 3, 1)),
        to: formatDate(new Date(currentYear, Math.floor(currentMonth / 3) * 3 + 3, 0))
      },
      {
        label: 'Last Quarter',
        from: formatDate(new Date(currentYear, Math.floor(currentMonth / 3) * 3 - 3, 1)),
        to: formatDate(new Date(currentYear, Math.floor(currentMonth / 3) * 3, 0))
      },
      {
        label: 'This Year',
        from: formatDate(new Date(currentYear, 0, 1)),
        to: formatDate(new Date(currentYear, 11, 31))
      },
      {
        label: 'Last Year',
        from: formatDate(new Date(currentYear - 1, 0, 1)),
        to: formatDate(new Date(currentYear - 1, 11, 31))
      },
      {
        label: 'Last 30 Days',
        from: formatDate(new Date(today.setDate(today.getDate() - 30))),
        to: formatDate(new Date())
      },
      {
        label: 'Last 90 Days',
        from: formatDate(new Date(today.setDate(today.getDate() - 90))),
        to: formatDate(new Date())
      }
    ];
  };

  const handlePresetSelect = (preset: { label: string; from: string; to: string }) => {
    if (dateRange) {
      dateRange.onFromChange(preset.from);
      dateRange.onToChange(preset.to);
      if (dateRange.onPresetChange) {
        dateRange.onPresetChange(preset.label);
      }
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-4 mb-6 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-10 border-blue-900 focus:border-blue-500 focus:ring-blue-500 text-white bg-blue-600 placeholder:text-blue-200"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <DropdownMenu key={index}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-10 px-4 border-blue-900 hover:border-blue-500 text-white bg-blue-600 hover:bg-blue-700 hover:text-white"
              >
                <Filter className="h-4 w-4 mr-2" />
                {filter.label}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {filter.options.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => filter.onChange(option.value)}
                  className={filter.value === option.value ? 'bg-blue-50 text-black' : 'text-black'}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}

        {dateRange && (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 px-4 border-blue-900 hover:border-blue-500 text-white bg-blue-600 hover:bg-blue-700 hover:text-white"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {getDateRangePresets().map((preset, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => handlePresetSelect(preset)}
                    className="text-black hover:bg-blue-50 hover:text-black"
                  >
                    {preset.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <div className="p-2">
                  <div className="text-xs text-black mb-2">Custom Range</div>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="date"
                      value={dateRange.from}
                      onChange={(e) => dateRange.onFromChange(e.target.value)}
                      className="h-8 text-xs"
                      placeholder="From"
                    />
                    <Input
                      type="date"
                      value={dateRange.to}
                      onChange={(e) => dateRange.onToChange(e.target.value)}
                      className="h-8 text-xs"
                      placeholder="To"
                    />
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};
