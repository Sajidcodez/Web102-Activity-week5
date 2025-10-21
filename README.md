# Cap - Website Screenshot App 📸

A React application that captures screenshots of any website using the APIFlash API.

## Features

- 🌐 Take screenshots of any website by entering its URL
- 🎨 Customize screenshot format, dimensions, and display options
- 📸 View current screenshot in real-time
- 🖼️ Gallery to save and view all previous screenshots
- 🎯 Live query status display
- ✨ Beautiful gradient UI with smooth animations

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file and add your APIFlash access key:
```
VITE_APP_ACCESS_KEY=your_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## How to Use

1. Enter a website URL (without `https://`)
2. Optionally customize format, size, and other settings
3. Click "Take that Pic! 🎞"
4. View your screenshot and watch it get added to the gallery!

## Technologies Used

- React + Vite
- APIFlash API
- Flexbox for responsive layouts
- CSS animations and gradients

## Notes

- Do not include `https://` in the URL input - it's added automatically
- Empty fields will use default values (jpeg, 1920x1080, no ads/banners)
