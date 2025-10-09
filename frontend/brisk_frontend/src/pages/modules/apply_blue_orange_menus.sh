#!/bin/bash

# Apply blue inactive / orange active menu styling to ALL modules

echo "Applying blue inactive / orange active menu styling..."

for file in *.tsx; do
  echo "Processing $file..."
  
  # Replace bg-brisk-primary text-white with orange gradient for active state
  # Replace text-[#001f3f] or similar inactive states with bg-blue-600 text-white
  
  sed -i "s/bg-brisk-primary text-white/bg-gradient-to-r from-orange-500 to-orange-600 text-white/g" "$file"
  
  # Replace various inactive state patterns with blue background
  sed -i "s/: 'text-\[#001f3f\] hover:bg-gray-100'/: 'bg-blue-600 text-white hover:bg-blue-700'/g" "$file"
  sed -i "s/: 'text-blue-900 hover:bg-gray-100'/: 'bg-blue-600 text-white hover:bg-blue-700'/g" "$file"
  sed -i "s/: 'text-gray-900 hover:bg-gray-100'/: 'bg-blue-600 text-white hover:bg-blue-700'/g" "$file"
  
done

echo "Menu styling update complete!"
