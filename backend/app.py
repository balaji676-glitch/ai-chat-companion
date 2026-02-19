from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

# FAQ Questions
questions = [
    "What is AI internship duration?",
    "How can I contact support?",
    "Will I get a certificate?",
    "Is this internship paid?",
    "How to submit my project?",
    "Give me a 30 day Python roadmap",
    "What is machine learning?",
    "How do I improve coding skills?"
]

# FAQ Answers (same order as questions)
answers = [
    "The internship duration is one month.",
    "You can contact support via email or WhatsApp.",
    "Yes, you will receive a completion certificate.",
    "No, this internship is unpaid.",
    "Submit your project through the official submission form.",
    "Day 1-5: Python basics. Day 6-10: Practice problems. Day 11-15: OOP concepts. Day 16-20: Libraries like NumPy/Pandas. Day 21-25: Mini projects. Day 26-30: Build one full project.",
    "Machine learning is a branch of AI where systems learn patterns from data to make predictions or decisions.",
    "Practice coding daily, build projects, read documentation, solve problems, and review other developers' code."
]

# Optional homepage to avoid 404 confusion
@app.route("/")
def home():
    return "FAQ Chatbot Backend Running"

# Chat API
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_question = data["message"]

    vectorizer = TfidfVectorizer()
    tfidf = vectorizer.fit_transform(questions + [user_question])

    similarity = cosine_similarity(tfidf[-1], tfidf[:-1])
    index = similarity.argmax()

    # Confidence threshold check
    if similarity.max() < 0.3:
        return jsonify({"reply": "Sorry, I don't know that yet."})

    return jsonify({"reply": answers[index]})


if __name__ == "__main__":
    app.run(port=5000, debug=True)
