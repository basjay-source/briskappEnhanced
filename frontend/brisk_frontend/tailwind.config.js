/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--brisk-background))',
  			foreground: 'hsl(var(--brisk-foreground))',
  			muted: {
  				DEFAULT: 'hsl(var(--brisk-muted))',
  				foreground: 'hsl(var(--brisk-muted-foreground))'
  			},
  			border: 'hsl(var(--brisk-border))',
  			input: 'hsl(var(--brisk-input))',
  			ring: 'hsl(var(--brisk-ring))',
  			brisk: {
  				primary: '#0B5FFF',
  				accent: '#FF7A00',
  				'primary-50': '#EBF2FF',
  				'primary-100': '#D6E4FF',
  				'primary-500': '#0B5FFF',
  				'primary-600': '#0A54E6',
  				'primary-700': '#0948CC',
  				'primary-900': '#062F80',
  				'accent-50': '#FFF4EB',
  				'accent-100': '#FFE9D6',
  				'accent-500': '#FF7A00',
  				'accent-600': '#E66D00',
  				'accent-700': '#CC6100',
  				'accent-900': '#804000'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'logo-draw': {
  				'0%': {
  					'stroke-dasharray': '0 100',
  					'stroke-dashoffset': '0'
  				},
  				'50%': {
  					'stroke-dasharray': '100 100',
  					'stroke-dashoffset': '0'
  				},
  				'100%': {
  					'stroke-dasharray': '100 100',
  					'stroke-dashoffset': '0',
  					'fill': '#FF7A00'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'logo-draw': 'logo-draw 0.8s ease-out forwards'
  		}
  	}
  },
  plugins: [import("tailwindcss-animate")],
}

