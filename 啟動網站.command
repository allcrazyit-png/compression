#!/bin/bash
cd "$(dirname "$0")"
echo "正在啟動 ImagePress..."
echo "請勿關閉此視窗，否則網站將會停止運作。"

# Attempt to open browser after a short delay
(sleep 2 && open http://localhost:5173) &

# Start the dev server
npm run dev
