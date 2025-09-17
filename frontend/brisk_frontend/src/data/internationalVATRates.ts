export interface VATRate {
  country: string;
  countryCode: string;
  standardRate: number;
  reducedRates: number[];
  zeroRate: boolean;
  exemptions: string[];
  currency: string;
  lastUpdated: string;
  effectiveDate: string;
}

export const internationalVATRates: VATRate[] = [
  {
    country: "United Kingdom",
    countryCode: "GB",
    standardRate: 20,
    reducedRates: [5, 0],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Education", "Healthcare"],
    currency: "GBP",
    lastUpdated: "2024-01-01",
    effectiveDate: "2011-01-04"
  },
  {
    country: "Germany",
    countryCode: "DE",
    standardRate: 19,
    reducedRates: [7],
    zeroRate: false,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2007-01-01"
  },
  {
    country: "France",
    countryCode: "FR",
    standardRate: 20,
    reducedRates: [10, 5.5, 2.1],
    zeroRate: false,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2014-01-01"
  },
  {
    country: "Spain",
    countryCode: "ES",
    standardRate: 21,
    reducedRates: [10, 4],
    zeroRate: false,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2012-09-01"
  },
  {
    country: "Italy",
    countryCode: "IT",
    standardRate: 22,
    reducedRates: [10, 5, 4],
    zeroRate: false,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2013-10-01"
  },
  {
    country: "Netherlands",
    countryCode: "NL",
    standardRate: 21,
    reducedRates: [9],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2012-10-01"
  },
  {
    country: "Belgium",
    countryCode: "BE",
    standardRate: 21,
    reducedRates: [12, 6],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2012-01-01"
  },
  {
    country: "Austria",
    countryCode: "AT",
    standardRate: 20,
    reducedRates: [13, 10],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "1984-01-01"
  },
  {
    country: "Sweden",
    countryCode: "SE",
    standardRate: 25,
    reducedRates: [12, 6],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "SEK",
    lastUpdated: "2024-01-01",
    effectiveDate: "1990-01-01"
  },
  {
    country: "Denmark",
    countryCode: "DK",
    standardRate: 25,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "DKK",
    lastUpdated: "2024-01-01",
    effectiveDate: "1992-01-01"
  },
  {
    country: "Norway",
    countryCode: "NO",
    standardRate: 25,
    reducedRates: [15, 12],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "NOK",
    lastUpdated: "2024-01-01",
    effectiveDate: "2001-01-01"
  },
  {
    country: "Finland",
    countryCode: "FI",
    standardRate: 24,
    reducedRates: [14, 10],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2013-01-01"
  },
  {
    country: "Ireland",
    countryCode: "IE",
    standardRate: 23,
    reducedRates: [13.5, 9, 4.8],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2012-01-01"
  },
  {
    country: "Portugal",
    countryCode: "PT",
    standardRate: 23,
    reducedRates: [13, 6],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2011-01-01"
  },
  {
    country: "Poland",
    countryCode: "PL",
    standardRate: 23,
    reducedRates: [8, 5],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "PLN",
    lastUpdated: "2024-01-01",
    effectiveDate: "2011-01-01"
  },
  {
    country: "Czech Republic",
    countryCode: "CZ",
    standardRate: 21,
    reducedRates: [15, 10],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "CZK",
    lastUpdated: "2024-01-01",
    effectiveDate: "2013-01-01"
  },
  {
    country: "Hungary",
    countryCode: "HU",
    standardRate: 27,
    reducedRates: [18, 5],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "HUF",
    lastUpdated: "2024-01-01",
    effectiveDate: "2012-01-01"
  },
  {
    country: "Romania",
    countryCode: "RO",
    standardRate: 19,
    reducedRates: [9, 5],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "RON",
    lastUpdated: "2024-01-01",
    effectiveDate: "2017-01-01"
  },
  {
    country: "Bulgaria",
    countryCode: "BG",
    standardRate: 20,
    reducedRates: [9],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "BGN",
    lastUpdated: "2024-01-01",
    effectiveDate: "2007-01-01"
  },
  {
    country: "Croatia",
    countryCode: "HR",
    standardRate: 25,
    reducedRates: [13, 5],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2013-07-01"
  },
  {
    country: "Greece",
    countryCode: "GR",
    standardRate: 24,
    reducedRates: [13, 6],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2016-06-01"
  },
  {
    country: "Luxembourg",
    countryCode: "LU",
    standardRate: 17,
    reducedRates: [14, 8, 3],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2015-01-01"
  },
  {
    country: "Slovenia",
    countryCode: "SI",
    standardRate: 22,
    reducedRates: [9.5],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2013-07-01"
  },
  {
    country: "Slovakia",
    countryCode: "SK",
    standardRate: 20,
    reducedRates: [10],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2011-01-01"
  },
  {
    country: "Estonia",
    countryCode: "EE",
    standardRate: 20,
    reducedRates: [9],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2009-07-01"
  },
  {
    country: "Latvia",
    countryCode: "LV",
    standardRate: 21,
    reducedRates: [12, 5],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2011-01-01"
  },
  {
    country: "Lithuania",
    countryCode: "LT",
    standardRate: 21,
    reducedRates: [9, 5],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2009-09-01"
  },
  {
    country: "Malta",
    countryCode: "MT",
    standardRate: 18,
    reducedRates: [7, 5],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2004-01-01"
  },
  {
    country: "Cyprus",
    countryCode: "CY",
    standardRate: 19,
    reducedRates: [9, 5],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EUR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2014-01-13"
  },

  {
    country: "United States",
    countryCode: "US",
    standardRate: 0,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["No federal VAT - state sales tax varies"],
    currency: "USD",
    lastUpdated: "2024-01-01",
    effectiveDate: "N/A"
  },
  {
    country: "Canada",
    countryCode: "CA",
    standardRate: 5,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "CAD",
    lastUpdated: "2024-01-01",
    effectiveDate: "2008-01-01"
  },
  {
    country: "Mexico",
    countryCode: "MX",
    standardRate: 16,
    reducedRates: [0],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "MXN",
    lastUpdated: "2024-01-01",
    effectiveDate: "2010-01-01"
  },

  {
    country: "Australia",
    countryCode: "AU",
    standardRate: 10,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "AUD",
    lastUpdated: "2024-01-01",
    effectiveDate: "2000-07-01"
  },
  {
    country: "New Zealand",
    countryCode: "NZ",
    standardRate: 15,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "NZD",
    lastUpdated: "2024-01-01",
    effectiveDate: "2010-10-01"
  },
  {
    country: "Japan",
    countryCode: "JP",
    standardRate: 10,
    reducedRates: [8],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "JPY",
    lastUpdated: "2024-01-01",
    effectiveDate: "2019-10-01"
  },
  {
    country: "South Korea",
    countryCode: "KR",
    standardRate: 10,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "KRW",
    lastUpdated: "2024-01-01",
    effectiveDate: "1977-07-01"
  },
  {
    country: "Singapore",
    countryCode: "SG",
    standardRate: 8,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "SGD",
    lastUpdated: "2024-01-01",
    effectiveDate: "2023-01-01"
  },
  {
    country: "Malaysia",
    countryCode: "MY",
    standardRate: 6,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "MYR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2015-04-01"
  },
  {
    country: "Thailand",
    countryCode: "TH",
    standardRate: 7,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "THB",
    lastUpdated: "2024-01-01",
    effectiveDate: "1992-01-01"
  },
  {
    country: "Philippines",
    countryCode: "PH",
    standardRate: 12,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "PHP",
    lastUpdated: "2024-01-01",
    effectiveDate: "1988-01-01"
  },
  {
    country: "Indonesia",
    countryCode: "ID",
    standardRate: 11,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "IDR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2022-04-01"
  },
  {
    country: "Vietnam",
    countryCode: "VN",
    standardRate: 10,
    reducedRates: [5],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "VND",
    lastUpdated: "2024-01-01",
    effectiveDate: "2009-01-01"
  },
  {
    country: "India",
    countryCode: "IN",
    standardRate: 18,
    reducedRates: [12, 5],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "INR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2017-07-01"
  },
  {
    country: "China",
    countryCode: "CN",
    standardRate: 13,
    reducedRates: [9, 6],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "CNY",
    lastUpdated: "2024-01-01",
    effectiveDate: "2019-04-01"
  },

  {
    country: "United Arab Emirates",
    countryCode: "AE",
    standardRate: 5,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "AED",
    lastUpdated: "2024-01-01",
    effectiveDate: "2018-01-01"
  },
  {
    country: "Saudi Arabia",
    countryCode: "SA",
    standardRate: 15,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "SAR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2020-07-01"
  },
  {
    country: "South Africa",
    countryCode: "ZA",
    standardRate: 15,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "ZAR",
    lastUpdated: "2024-01-01",
    effectiveDate: "2018-04-01"
  },
  {
    country: "Egypt",
    countryCode: "EG",
    standardRate: 14,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "EGP",
    lastUpdated: "2024-01-01",
    effectiveDate: "2016-09-01"
  },
  {
    country: "Turkey",
    countryCode: "TR",
    standardRate: 18,
    reducedRates: [8, 1],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "TRY",
    lastUpdated: "2024-01-01",
    effectiveDate: "2015-01-01"
  },
  {
    country: "Israel",
    countryCode: "IL",
    standardRate: 17,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "ILS",
    lastUpdated: "2024-01-01",
    effectiveDate: "2015-10-01"
  },

  {
    country: "Brazil",
    countryCode: "BR",
    standardRate: 17,
    reducedRates: [12, 7],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "BRL",
    lastUpdated: "2024-01-01",
    effectiveDate: "1967-01-01"
  },
  {
    country: "Argentina",
    countryCode: "AR",
    standardRate: 21,
    reducedRates: [10.5],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "ARS",
    lastUpdated: "2024-01-01",
    effectiveDate: "1975-01-01"
  },
  {
    country: "Chile",
    countryCode: "CL",
    standardRate: 19,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "CLP",
    lastUpdated: "2024-01-01",
    effectiveDate: "1975-01-01"
  },
  {
    country: "Colombia",
    countryCode: "CO",
    standardRate: 19,
    reducedRates: [5],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "COP",
    lastUpdated: "2024-01-01",
    effectiveDate: "2017-01-01"
  },
  {
    country: "Peru",
    countryCode: "PE",
    standardRate: 18,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "PEN",
    lastUpdated: "2024-01-01",
    effectiveDate: "2011-03-01"
  },
  {
    country: "Uruguay",
    countryCode: "UY",
    standardRate: 22,
    reducedRates: [10],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "UYU",
    lastUpdated: "2024-01-01",
    effectiveDate: "2007-01-01"
  },
  {
    country: "Ecuador",
    countryCode: "EC",
    standardRate: 12,
    reducedRates: [],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "USD",
    lastUpdated: "2024-01-01",
    effectiveDate: "2000-05-01"
  },

  {
    country: "Switzerland",
    countryCode: "CH",
    standardRate: 7.7,
    reducedRates: [3.7, 2.5],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "CHF",
    lastUpdated: "2024-01-01",
    effectiveDate: "2011-01-01"
  },
  {
    country: "Iceland",
    countryCode: "IS",
    standardRate: 24,
    reducedRates: [11],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "ISK",
    lastUpdated: "2024-01-01",
    effectiveDate: "2007-01-01"
  },
  {
    country: "Russia",
    countryCode: "RU",
    standardRate: 20,
    reducedRates: [10],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "RUB",
    lastUpdated: "2024-01-01",
    effectiveDate: "2019-01-01"
  },
  {
    country: "Ukraine",
    countryCode: "UA",
    standardRate: 20,
    reducedRates: [7],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "UAH",
    lastUpdated: "2024-01-01",
    effectiveDate: "2014-01-01"
  },
  {
    country: "Belarus",
    countryCode: "BY",
    standardRate: 20,
    reducedRates: [10],
    zeroRate: true,
    exemptions: ["Financial services", "Insurance", "Medical services", "Education"],
    currency: "BYN",
    lastUpdated: "2024-01-01",
    effectiveDate: "2009-01-01"
  }
];

export const getVATRateByCountry = (countryCode: string): VATRate | undefined => {
  return internationalVATRates.find(rate => rate.countryCode === countryCode);
};

export const getAllCountries = (): string[] => {
  return internationalVATRates.map(rate => rate.country).sort();
};

export const getCountriesByRegion = () => {
  const regions = {
    'European Union': ['GB', 'DE', 'FR', 'ES', 'IT', 'NL', 'BE', 'AT', 'SE', 'DK', 'FI', 'IE', 'PT', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'GR', 'LU', 'SI', 'SK', 'EE', 'LV', 'LT', 'MT', 'CY'],
    'North America': ['US', 'CA', 'MX'],
    'Asia Pacific': ['AU', 'NZ', 'JP', 'KR', 'SG', 'MY', 'TH', 'PH', 'ID', 'VN', 'IN', 'CN'],
    'Middle East & Africa': ['AE', 'SA', 'ZA', 'EG', 'TR', 'IL'],
    'South America': ['BR', 'AR', 'CL', 'CO', 'PE', 'UY', 'EC'],
    'Other': ['CH', 'IS', 'NO', 'RU', 'UA', 'BY']
  };

  const result: Record<string, VATRate[]> = {};
  
  Object.entries(regions).forEach(([region, countryCodes]) => {
    result[region] = countryCodes.map(code => 
      internationalVATRates.find(rate => rate.countryCode === code)
    ).filter(Boolean) as VATRate[];
  });

  return result;
};

export const searchVATRates = (query: string): VATRate[] => {
  const lowercaseQuery = query.toLowerCase();
  return internationalVATRates.filter(rate => 
    rate.country.toLowerCase().includes(lowercaseQuery) ||
    rate.countryCode.toLowerCase().includes(lowercaseQuery) ||
    rate.currency.toLowerCase().includes(lowercaseQuery)
  );
};

export const getHighestVATRates = (limit: number = 10): VATRate[] => {
  return [...internationalVATRates]
    .sort((a, b) => b.standardRate - a.standardRate)
    .slice(0, limit);
};

export const getLowestVATRates = (limit: number = 10): VATRate[] => {
  return [...internationalVATRates]
    .filter(rate => rate.standardRate > 0)
    .sort((a, b) => a.standardRate - b.standardRate)
    .slice(0, limit);
};
