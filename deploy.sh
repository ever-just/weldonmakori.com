#!/usr/bin/env bash
# Manual deploy for when GitHub Actions can't run (billing lock).
# Builds site/out, pushes it to the gh-pages branch, and requests a Pages build.
# Usage: ./deploy.sh
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
WORK=/tmp/weldon-gh-deploy

cd "$REPO_ROOT/site"
npm ci --silent
npm run build

rm -rf "$WORK"
git clone -q "$REPO_ROOT" "$WORK"
cd "$WORK"
git remote set-url origin https://github.com/ever-just/weldonmakori.com.git
if git ls-remote --exit-code origin gh-pages >/dev/null 2>&1; then
  git fetch -q origin gh-pages
  git checkout -q -B gh-pages FETCH_HEAD
else
  git checkout -q --orphan gh-pages
fi
git rm -rf . -q
cp -R "$REPO_ROOT/site/out/." .
git add -A
git -c user.email="158243242+devin-ai-integration[bot]@users.noreply.github.com" \
    -c user.name="Devin" commit -qm "Deploy static site to gh-pages" || true
git push -q origin gh-pages

gh api repos/ever-just/weldonmakori.com/pages/builds -X POST -q .status 2>/dev/null || true
echo "Deployed. https://weldon.lol"
