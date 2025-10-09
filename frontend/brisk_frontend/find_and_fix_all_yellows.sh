#!/bin/bash

# Comprehensive script to find and replace ALL yellow-like colors with navy blue

echo "Searching for any remaining yellow/gold/amber colors..."

# Search for Tailwind color classes we might have missed
find src -name "*.tsx" -o -name "*.ts" | while read file; do
    # Replace any remaining yellow/gold/amber variants
    sed -i 's/text-yellow-/text-[#001f3f]-/g' "$file"
    sed -i 's/bg-yellow-/bg-blue-/g' "$file"
    sed -i 's/border-yellow-/border-[#001f3f]-/g' "$file"
    sed -i 's/text-gold-/text-[#001f3f]-/g' "$file"
    sed -i 's/bg-gold-/bg-blue-/g' "$file"
    sed -i 's/text-amber-/text-[#001f3f]-/g' "$file"
    sed -i 's/bg-amber-/bg-blue-/g' "$file"
    sed -i 's/border-amber-/border-[#001f3f]-/g' "$file"
    
    # Fix any accidental double replacements
    sed -i 's/text-\[#001f3f\]-/text-[#001f3f]/g' "$file"
    sed -i 's/border-\[#001f3f\]-/border-[#001f3f]/g' "$file"
done

# Search for hex color codes that might be yellow
find src -name "*.tsx" -o -name "*.ts" | while read file; do
    # Common yellow hex codes
    sed -i 's/#FFD700/#001f3f/gi' "$file"  # Gold
    sed -i 's/#FFFF00/#001f3f/gi' "$file"  # Yellow
    sed -i 's/#FFA500/#001f3f/gi' "$file"  # Orange
    sed -i 's/#FF8C00/#001f3f/gi' "$file"  # Dark Orange
    sed -i 's/#FFC107/#001f3f/gi' "$file"  # Amber
    sed -i 's/#FFEB3B/#001f3f/gi' "$file"  # Yellow Material
    sed -i 's/#F59E0B/#001f3f/gi' "$file"  # Amber-500
    sed -i 's/#EAB308/#001f3f/gi' "$file"  # Yellow-500
done

echo "Completed yellow removal!"
