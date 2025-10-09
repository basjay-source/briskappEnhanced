#!/bin/bash

# Restore orange active menu states that were incorrectly changed to navy blue

echo "Restoring orange active menu states..."

find pages/modules -name "*.tsx" -type f | while read file; do
    # Change navy blue gradients back to orange gradients for active menu states
    sed -i 's/from-\[#001f3f\] to-\[#003366\]/from-orange-500 to-orange-600/g' "$file"
    sed -i 's/border-\[#001f3f\] shadow-md font-semibold/border-orange-300 shadow-md font-semibold/g' "$file"
done

echo "Orange menu states restored!"
