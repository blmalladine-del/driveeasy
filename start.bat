@echo off
cd /d "%~dp0"
echo Starting car-rental-website dev server...
echo Open http://localhost:3000 in your browser.
echo.
npx next dev -p 3000
pause
