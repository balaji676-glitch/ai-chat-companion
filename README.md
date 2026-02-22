# Tech Interview Survival Bot 🤖

## Overview

**Tech Interview Survival Bot** is a desktop-first FAQ chatbot designed to help students and job seekers prepare for technical interviews.
It provides quick guidance on coding interview preparation, HR interview questions, resume building, career decisions, and interview confidence.

This project focuses on delivering a clean AI-style chat interface with a structured FAQ knowledge base, enabling users to get instant answers without needing a backend database or complex AI models.

---

## Features

* Desktop-first professional chatbot UI
* FAQ-based automated responses
* Keyword and fuzzy matching logic
* Coding interview preparation guidance
* HR and behavioral interview tips
* Resume and portfolio advice
* Career and salary negotiation guidance
* Typing indicator and chat animations
* Responsive design for multiple devices

---

## Tech Stack

**Frontend**

* HTML
* CSS
* JavaScript

**Backend**

* Node.js
* Express.js
* string-similarity (for fuzzy matching)
* CORS

---

## Project Structure

```
Tech-Interview-Survival-Bot/
│
├── server.js
├── package.json
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

---

## Installation & Setup

### 1. Clone the Repository

```
git clone <your-repo-link>
cd Tech-Interview-Survival-Bot
```

### 2. Install Dependencies

```
npm install
```

### 3. Run the Server

```
node server.js
```

Server will run on:

```
http://localhost:5000
```

---

## How It Works

1. User sends a question through the chat interface.
2. Backend checks the FAQ knowledge base.
3. Keyword matching is applied first.
4. Fuzzy similarity matching is used if needed.
5. Best-matching answer is returned.
6. If no match is found, a fallback response is shown.

---

## Use Cases

* Students preparing for technical interviews
* Freshers learning interview strategies
* Resume and career guidance assistance
* Quick interview preparation reference tool

---

## Future Improvements

* Database integration for dynamic FAQs
* AI/NLP-based responses
* Voice input support
* Interview mock simulation
* User progress tracking

---

## Author

**Balaji**
AI & Software Enthusiast

---

## License

This project is for educational and internship demonstration purposes.
