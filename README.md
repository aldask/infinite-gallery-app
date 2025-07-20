# React Typescript Gallery App

A sleek and minimal image gallery built with **React + TypeScript**, styled using **CSS Modules**.

## Stack

- React + TypeScript
- Vite
- CSS Modules
- Vitest
- React Testing Library

## Features

- Fetches images and metadata from the **Pexels API**
- Infinite scrolling for smooth browsing
- Fully typed with **TypeScript**
- Simple and reusable components
- Favorites are saved using **LocalStorage** and can be viewed via a **"Show Favorites" modal**
- Includes basic tests

## Preview

<img src="src/assets/preview.png" alt="Preview">

## Setup

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/aldask/infinite-gallery-app.git
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```
3. **Get your Pexels API key and URL**:

   - Sign up or log in at [Pexels API](https://www.pexels.com/api/)
   - Create an API key (you will receive your personal API key)
   - The base URL for the API is:  ``` https://api.pexels.com/v1/curated ```

4. **Create a ``` .env ``` file in the project root and add your API details:**

   ```VITE_API_URL=https://api.pexels.com/v1/curated```
   
   ```VITE_API_KEY=your_pexels_api_key_here```

5. **OPTIONAL: Run Tests**:

   ```bash
   npm run test
   ```

6. **Run the app**:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## Live View

The app has been deployed and can be accessed at the following URL:

[Live Preview](https://infinite-gallery-indol.vercel.app/)
