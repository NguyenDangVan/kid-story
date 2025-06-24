# Kid Story – AI Children's Story Generator

Generate personalized children's stories and illustrated covers using AI (Gemini API) based on user input. Save, view, and flip through stories with an interactive book interface.

## Live Demo

[https://kid-story.vercel.app/create-story](https://kid-story.vercel.app/create-story)

## Project Overview

This project is a fullstack web application that allows users to:
- Generate unique children's stories using Gemini AI based on age group, story type, image style, and subject.
- Automatically create illustrated story covers with Gemini's image generation model.
- Save and view stories with a flipbook interface.
- Store generated images in Firebase Storage and story data in PostgreSQL (via Drizzle ORM).
- Enjoy a seamless, interactive UI built with Next.js, React, and TailwindCSS.

## Tech Stack

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **TailwindCSS**
- **Gemini API (Text & Image Generation)**
- **Firebase Storage**
- **PostgreSQL**
- **Drizzle ORM**
- **Vercel**

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd kid-story
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your Gemini API key, Firebase config, and database URL.

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Resources and Links

- [Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs)
- [Firebase Storage Documentation](https://firebase.google.com/docs/storage)

## Features

- Dynamic prompt engineering for story and image generation
- Interactive flipbook for story viewing
- Persistent storage for stories and images
- Modern, responsive UI

---

Feel free to contribute or fork this project for your own creative AI-powered storybook platform!
