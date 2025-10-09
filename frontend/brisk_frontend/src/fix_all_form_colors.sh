#!/bin/bash

# Comprehensive script to ensure ALL form elements use navy blue

echo "Fixing form dialog and input element colors..."

# Process all TypeScript files
find . -name "*.tsx" -type f | while read file; do
    # Fix DialogTitle that might not have color
    sed -i 's/<DialogTitle>/<DialogTitle className="text-[#001f3f]">/g' "$file"
    sed -i 's/<DialogTitle className="/<DialogTitle className="text-[#001f3f] /g' "$file"
    sed -i 's/className="text-\[#001f3f\] text-\[#001f3f\]/className="text-[#001f3f]/g' "$file" # remove duplicates
    
    # Fix DialogDescription
    sed -i 's/<DialogDescription>/<DialogDescription className="text-[#001f3f]">/g' "$file"
    sed -i 's/<DialogDescription className="/<DialogDescription className="text-[#001f3f] /g' "$file"
    sed -i 's/className="text-\[#001f3f\] text-\[#001f3f\]/className="text-[#001f3f]/g' "$file"
    
    # Fix Label elements
    sed -i 's/<Label className="text-sm/<Label className="text-sm text-[#001f3f]/g' "$file"
    sed -i 's/<Label htmlFor="\([^"]*\)">/<Label htmlFor="\1" className="text-[#001f3f]">/g' "$file"
    sed -i 's/className="text-\[#001f3f\] text-\[#001f3f\]/className="text-[#001f3f]/g' "$file"
    
    # Fix any remaining text color classes in dialogs/forms to use navy blue
    sed -i 's/className="\([^"]*\)text-blue-700/className="\1text-[#001f3f]/g' "$file"
    sed -i 's/className="\([^"]*\)text-blue-600/className="\1text-[#001f3f]/g' "$file"
    sed -i 's/className="\([^"]*\)text-gray-700/className="\1text-[#001f3f]/g' "$file"
    sed -i 's/className="\([^"]*\)text-slate-700/className="\1text-[#001f3f]/g' "$file"
    
done

echo "Form color fixes completed!"
