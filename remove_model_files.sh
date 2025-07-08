#!/bin/bash

echo "🧹 Removing model files from git tracking..."

# Remove model directories from git tracking (but keep them locally)
git rm -r --cached Backend/Service/service/cardiffnlp/ 2>/dev/null || echo "cardiffnlp directory not tracked"
git rm -r --cached Backend/Service/service/saved_model/ 2>/dev/null || echo "saved_model directory not tracked"

# Remove specific model files
git rm --cached Backend/Service/service/Routes/model.h5 2>/dev/null || echo "model.h5 not tracked"

echo "✅ Model files removed from git tracking"
echo "📝 These files will now be downloaded at runtime from HuggingFace"
echo ""
echo "Next steps:"
echo "1. Commit these changes: git add . && git commit -m 'Remove model files, download at runtime'"
echo "2. Push to GitHub: git push origin main"
echo "3. The model will be downloaded automatically when the service starts" 