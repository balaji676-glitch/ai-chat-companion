# AI FAQ Chatbot 🤖

## 📌 Project Overview

This project is an AI-based FAQ chatbot developed as part of an Artificial Intelligence internship task. It uses Natural Language Processing (NLP) techniques to match user questions with the most relevant stored answers and respond through a modern chat interface.

The chatbot has a **React frontend** and a **Flask backend** connected through an API, creating a full-stack AI chatbot system.

---

## 🚀 Features

* Interactive chatbot UI (React + Tailwind CSS)
* Flask backend API for handling chat requests
* NLP-based FAQ matching using TF-IDF similarity
* Real-time message exchange between frontend and backend
* Clean responsive chat interface
* Easy to extend FAQ dataset

---

## 🛠️ Technologies Used

**Frontend**

* React (Vite)
* TypeScript
* Tailwind CSS

**Backend**

* Python Flask
* Scikit-learn (TF-IDF similarity)
* Flask-CORS

---

## 📂 Project Structure

```
ai-chat-companion/
│
├── backend/
│   └── app.py
│
├── src/
│   ├── components/
│   ├── pages/
│   └── ...
│
└── package.json
```

---

## ▶️ How to Run the Project

### 1. Start Backend

Go to backend folder:

```
cd backend
python app.py
```

Backend runs at:

```
http://127.0.0.1:5000
```

---

### 2. Start Frontend

Go to project root:

```
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:8080
```

---

## 💡 How It Works

1. User sends a message through the chat interface.
2. React frontend sends the message to Flask backend API.
3. Backend compares the question with stored FAQs using TF-IDF similarity.
4. Best matching answer is returned and displayed in chat.

---

## 📈 Future Improvements

* Add generative AI API integration
* Database-based FAQ storage
* Conversation memory
* Deployment to cloud platform

---

## 👨‍💻 Author

Balaji
AI Internship Project – FAQ Chatbot
