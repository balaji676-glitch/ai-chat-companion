

# AI Internship FAQ Chatbot Interface

## Overview
A sleek, modern chat interface that mimics a real AI assistant conversation experience — clean, minimal, and professional.

## Design & Layout
- **Centered chat container** with max-width, soft shadow, and rounded corners
- **Gradient background** (subtle blue-to-purple or similar modern palette) behind the chat window
- **Chat header** with bot avatar, name ("AI Intern Assistant"), and online status indicator
- **Dark/light professional color scheme** — bot bubbles in a light gray/blue, user bubbles in a vibrant blue/indigo

## Chat Window
- **Message bubbles** — user messages aligned right (colored), bot messages aligned left (neutral) with small avatars
- **Timestamps** on messages
- **Typing indicator** animation (three bouncing dots) when the bot is "thinking"
- **Smooth fade-in and slide-up animations** for new messages appearing
- **Auto-scroll** to the latest message

## Input Area
- Clean input field with placeholder text ("Ask me anything about the internship...")
- Send button with an icon (arrow/send icon)
- Support for sending via Enter key
- Subtle focus animation on the input

## Bot Behavior
- Pre-loaded FAQ knowledge base (hardcoded Q&A pairs covering common internship questions like eligibility, duration, stipend, application process, tech stack, etc.)
- Fuzzy keyword matching to find the best answer
- Friendly fallback response when no match is found
- Welcome message on first load

## Responsive Design
- Full-screen chat on mobile with bottom-anchored input
- Elegant centered card layout on desktop
- Smooth transitions across breakpoints

## Pages
- **Single page app** — the chat interface is the entire experience
- No backend needed — all FAQ data and matching logic lives client-side

