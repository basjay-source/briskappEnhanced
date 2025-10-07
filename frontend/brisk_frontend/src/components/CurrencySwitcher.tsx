import { useState } from 'react';
import { DollarSign } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { supportedCurrencies } from '@/types/currency';

export default function CurrencySwitcher() {
  const [selectedCurrency, setSelectedCurrency] = useState(supportedCurrencies[0]);

  const changeCurrency = (currencyCode: string) => {
    const currency = supportedCurrencies.find(c => c.code === currencyCode);
    if (currency) {
      setSelectedCurrency(currency);
      localStorage.setItem('preferredCurrency', currencyCode);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 border-2 border-blue-900 rounded-md">
          <DollarSign className="h-4 w-4 text-blue-900" />
          <span>{selectedCurrency.flag} {selectedCurrency.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-96 overflow-y-auto">
        {supportedCurrencies.map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            onClick={() => changeCurrency(currency.code)}
            className={selectedCurrency.code === currency.code ? 'bg-blue-50' : ''}
          >
            <span className="mr-2">{currency.flag}</span>
            <span className="font-medium">{currency.code}</span>
            <span className="ml-2 text-gray-500">{currency.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
