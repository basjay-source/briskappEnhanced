#!/bin/bash

# Fix orange active menu states to use navy blue

echo "Fixing orange menu active states..."

find . -name "*.tsx" -type f | while read file; do
    # Replace orange gradient backgrounds with navy blue gradients
    sed -i 's/from-orange-500 to-orange-600/from-[#001f3f] to-[#003366]/g' "$file"
    sed -i 's/from-orange-400 to-orange-500/from-[#001f3f] to-[#003366]/g' "$file"
    sed -i 's/from-orange-600 to-orange-700/from-[#001f3f] to-[#003366]/g' "$file"
    sed -i 's/border-orange-300/border-[#001f3f]/g' "$file"
    sed -i 's/border-orange-400/border-[#001f3f]/g' "$file"
    sed -i 's/border-orange-500/border-[#001f3f]/g' "$file"
done

echo "Orange menu states fixed!"
