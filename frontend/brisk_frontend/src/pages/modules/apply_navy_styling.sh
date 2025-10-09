#!/bin/bash

# Apply consistent navy blue styling across all module files

for file in *.tsx; do
    if [[ "$file" != "Bookkeeping.tsx.backup" ]]; then
        echo "Processing $file..."
        
        # Replace various border colors with navy blue 2px borders
        sed -i 's/border-blue-900/border-[#001f3f]/g' "$file"
        sed -i 's/border-blue-800/border-[#001f3f]/g' "$file"
        sed -i 's/border-blue-700/border-[#001f3f]/g' "$file"
        sed -i 's/border-blue-600/border-[#001f3f]/g' "$file"
        sed -i 's/border-gray-300/border-[#001f3f]/g' "$file"
        sed -i 's/border-gray-200/border-[#001f3f]/g' "$file"
        
        # Ensure 2px borders on cards and containers
        sed -i 's/border border-/border-2 border-/g' "$file"
        sed -i 's/border-2-2/border-2/g' "$file" # fix double application
        
        # Replace heading colors with navy blue
        sed -i 's/text-blue-900/text-[#001f3f]/g' "$file"
        sed -i 's/text-blue-800/text-[#001f3f]/g' "$file"
        sed -i 's/text-blue-700/text-[#001f3f]/g' "$file"
        sed -i 's/text-gray-900/text-[#001f3f]/g' "$file"
        sed -i 's/text-gray-800/text-[#001f3f]/g' "$file"
        
        # Replace any remaining yellow/orange colors
        sed -i 's/text-yellow-600/text-[#001f3f]/g' "$file"
        sed -i 's/text-yellow-700/text-[#001f3f]/g' "$file"
        sed -i 's/text-yellow-800/text-[#001f3f]/g' "$file"
        sed -i 's/text-yellow-900/text-[#001f3f]/g' "$file"
        sed -i 's/bg-yellow-50/bg-blue-50/g' "$file"
        sed -i 's/bg-yellow-100/bg-blue-100/g' "$file"
        
        # Ensure rounded corners (rounded-[2px] is already common, but add where missing)
        sed -i 's/rounded-sm/rounded-[2px]/g' "$file"
        sed -i 's/rounded-md/rounded-[2px]/g' "$file"
        
        echo "Completed $file"
    fi
done

echo "All modules updated with navy blue styling!"
