#!/bin/bash

# Check if no arguments provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <package-name>"
    exit 1
fi

# Run npx to add the package
npx shadcn-ui@latest add "$1"