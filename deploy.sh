#!/usr/bin/env sh

# Make sure the script throws errors encountered
set -e

# Generate static files

npm run build

# Enter the generated folder
cd docs/.vuepress/dist

# If it is published to a custom domain name
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# If you post to https://<fmfe>.github.io/<genesis-docs-en>
git push -f git@github.com:anish2690/genesis-docs-en.git master:gh-pages

cd -