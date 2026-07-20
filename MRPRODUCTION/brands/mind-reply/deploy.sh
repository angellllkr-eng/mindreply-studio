#!/usr/bin/env bash
# MindReply Shell - Cloudflare Pages Deployment Script
# This script deploys Shell to Cloudflare Pages automatically

set -e

echo "╔════════════════════════════════════════╗"
echo "║  MindReply Shell Deployment Script     ║"
echo "║  Cloudflare Pages                      ║"
echo "╚════════════════════════════════════════╝"

# Step 1: Check for wrangler
echo ""
echo "🔍 Checking Wrangler CLI..."
if ! command -v wrangler &> /dev/null; then
    echo "⚠️  Wrangler not installed. Installing globally..."
    npm install -g @cloudflare/wrangler
fi
echo "✅ Wrangler ready"

# Step 2: Navigate to shell
echo ""
echo "📁 Navigating to shell directory..."
cd "$(dirname "$0")/shell" || exit 1
echo "✅ In $(pwd)"

# Step 3: Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Step 4: Build
echo ""
echo "🔨 Building Shell..."
npm run build

# Step 5: Deploy
echo ""
echo "🚀 Deploying to Cloudflare Pages..."
echo "   Project name: mindreply-shell"
wrangler pages deploy dist --project-name mindreply-shell

echo ""
echo "╔════════════════════════════════════════╗"
echo "║  ✅ DEPLOYMENT SUCCESSFUL              ║"
echo "╠════════════════════════════════════════╣"
echo "║  URL: https://mindreply-shell.pages.dev║"
echo "║                                        ║"
echo "║  Next: Add CNAME in Cloudflare DNS:   ║"
echo "║  Name: shell                           ║"
echo "║  Target: mindreply-shell.pages.dev    ║"
echo "╚════════════════════════════════════════╝"
