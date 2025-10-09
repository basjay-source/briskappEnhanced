#!/bin/bash

# Comprehensive script to enforce navy blue on ALL text elements

echo "Enforcing navy blue on all headings, labels, and text elements..."

find pages/modules components -name "*.tsx" -type f | while read file; do
    # Add explicit navy blue to any h1, h2, h3, h4 without color class
    perl -i -pe 's/<(h[1-4])\s+className="([^"]*?)(?<!text-\[#001f3f\])(?<!text-)([^"]*)"/<$1 className="$2 text-[#001f3f] $3"/g unless /text-\[#001f3f\]/' "$file"
    
    # Add navy blue to span elements without explicit color
    perl -i -pe 's/<span\s+className="([^"]*)"(?![^>]*text-[^>]*)>/<span className="$1 text-[#001f3f]">/g' "$file"
    
    # Add navy blue to div with font styling but no color
    perl -i -pe 's/<div\s+className="([^"]*font[^"]*)"(?![^>]*text-\[#)/<div className="$1 text-[#001f3f]">/g' "$file"
    
    # Fix any remaining default text in modals
    sed -i 's/className="text-sm"/className="text-sm text-[#001f3f]"/g' "$file"
    sed -i 's/className="text-xs"/className="text-xs text-[#001f3f]"/g' "$file"
    sed -i 's/className="text-lg"/className="text-lg text-[#001f3f]"/g' "$file"
    sed -i 's/className="font-semibold"/className="font-semibold text-[#001f3f]"/g' "$file"
    sed -i 's/className="font-bold"/className="font-bold text-[#001f3f]"/g' "$file"
    sed -i 's/className="font-medium"/className="font-medium text-[#001f3f]"/g' "$file"
    
    # Remove duplicate text-[#001f3f] classes
    sed -i 's/text-\[#001f3f\] text-\[#001f3f\]/text-[#001f3f]/g' "$file"
    sed -i 's/text-\[#001f3f\] text-\[#001f3f\] text-\[#001f3f\]/text-[#001f3f]/g' "$file"
done

echo "Navy blue enforcement complete!"
