from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import logging
import os
from typing import List, Dict, Tuple
import numpy as np

# Configuration
class Config:
    CONFIDENCE_THRESHOLD = float(os.getenv('CONFIDENCE_THRESHOLD', 0.2))
    PORT = int(os.getenv('PORT', 5001))  # <-- Changed 5000 → 5001
    DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# FAQ Data Structure
class FAQData:
    def __init__(self):
        self.questions: List[str] = [
            "What is AI internship duration?",
            "How can I contact support?",
            "Will I get a certificate?",
            "Is this internship paid?",
            "How to submit my project?",
            "Give me a 30 day Python roadmap",
            "What is machine learning?",
            "How do I improve coding skills?",
            "What are the prerequisites for this internship?",
            "Can I work remotely?",
            "What projects will I work on?",
            "Is there any age limit?",
            "How many hours per week?",
            "Do I need prior experience?",
            "What programming languages are used?"
        ]
        
        self.answers: List[str] = [
            "The internship duration is one month.",
            "You can contact support via email at support@example.com or WhatsApp at +1234567890.",
            "Yes, you will receive a completion certificate after successfully finishing the internship.",
            "No, this internship is unpaid but offers valuable learning experience and certification.",
            "Submit your project through the official submission form on our website or email it to projects@example.com.",
            "Day 1-5: Python basics. Day 6-10: Practice problems. Day 11-15: OOP concepts. Day 16-20: Libraries like NumPy/Pandas. Day 21-25: Mini projects. Day 26-30: Build one full project.",
            "Machine learning is a branch of AI where systems learn patterns from data to make predictions or decisions without being explicitly programmed.",
            "Practice coding daily (30 mins minimum), build projects, read documentation, solve problems on platforms like LeetCode, and review other developers' code on GitHub.",
            "Basic programming knowledge and enthusiasm to learn are the main prerequisites. No specific degree required.",
            "Yes, this is a completely remote internship. You can work from anywhere.",
            "You'll work on real-world projects including web scraping, data analysis, and building simple ML models.",
            "No age limit. Students and professionals of all ages are welcome to apply.",
            "You need to dedicate approximately 10-15 hours per week for the internship.",
            "No prior experience is needed, but basic computer literacy is expected.",
            "Python is the primary language, but you'll also get exposure to SQL and JavaScript."
        ]
        
        # Add keywords for better matching (optional)
        self.keywords: List[List[str]] = [
            ["internship", "duration", "time", "long", "months"],
            ["contact", "support", "help", "email", "phone", "whatsapp"],
            ["certificate", "certification", "completion", "document"],
            ["paid", "stipend", "money", "payment", "unpaid"],
            ["submit", "project", "upload", "send", "form"],
            ["python", "roadmap", "30 day", "plan", "schedule", "learn"],
            ["machine learning", "ml", "ai", "artificial intelligence"],
            ["coding", "programming", "skills", "improve", "practice", "learn"],
            ["prerequisites", "requirements", "need", "qualifications", "background"],
            ["remote", "work from home", "wfh", "location", "online"],
            ["projects", "work", "tasks", "assignments", "build"],
            ["age", "limit", "old", "young"],
            ["hours", "time", "per week", "dedication", "commitment"],
            ["experience", "prior", "background", "knowledge"],
            ["languages", "programming languages", "python", "tools"]
        ]
        
        # Validate data consistency
        if len(self.questions) != len(self.answers) or len(self.questions) != len(self.keywords):
            raise ValueError("FAQ data lists must have the same length")

# Initialize FAQ data
faq_data = FAQData()

# Initialize vectorizer and transform questions (done once for performance)
vectorizer = TfidfVectorizer(
    lowercase=True,
    strip_accents='unicode',
    stop_words='english',
    ngram_range=(1, 2)  # Use unigrams and bigrams for better matching
)
try:
    questions_tfidf = vectorizer.fit_transform(faq_data.questions)
    logger.info(f"Vectorizer initialized successfully with {len(faq_data.questions)} questions")
except Exception as e:
    logger.error(f"Failed to initialize vectorizer: {str(e)}")
    raise

@app.route("/", methods=["GET"])
def home():
    """Home route to check if server is running"""
    return jsonify({
        "status": "online",
        "message": "FAQ Chatbot Backend Running",
        "version": "1.0",
        "endpoints": {
            "/chat": "POST - Send messages to chatbot",
            "/health": "GET - Health check",
            "/faq": "GET - View all FAQs"
        }
    })

@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "faq_count": len(faq_data.questions)
    })

@app.route("/faq", methods=["GET"])
def get_all_faqs():
    """Get all FAQs (for admin/debugging purposes)"""
    faqs = [
        {"question": q, "answer": a} 
        for q, a in zip(faq_data.questions, faq_data.answers)
    ]
    return jsonify({
        "count": len(faqs),
        "faqs": faqs
    })

@app.route("/chat", methods=["POST"])
def chat():
    """
    Main chat endpoint that processes user messages and returns appropriate responses
    """
    try:
        # Validate request
        data = request.get_json()
        if not data:
            logger.warning("No JSON data in request")
            return jsonify({"error": "No data provided"}), 400
        
        user_question = data.get("message", "").strip()
        if not user_question:
            logger.warning("Empty message received")
            return jsonify({"error": "Message cannot be empty"}), 400
        
        logger.info(f"Processing question: {user_question[:50]}...")
        
        # Transform user question using the same vectorizer
        try:
            user_tfidf = vectorizer.transform([user_question])
        except Exception as e:
            logger.error(f"Error transforming question: {str(e)}")
            return jsonify({"error": "Error processing your question"}), 500
        
        # Calculate similarity scores
        similarity_scores = cosine_similarity(user_tfidf, questions_tfidf).flatten()
        
        # Get best match
        best_match_index = np.argmax(similarity_scores)
        best_score = similarity_scores[best_match_index]
        
        logger.info(f"Best match score: {best_score:.3f} for question: {faq_data.questions[best_match_index][:50]}...")
        
        # Check confidence threshold
        if best_score < Config.CONFIDENCE_THRESHOLD:
            # Provide helpful fallback responses based on question type
            fallback_response = get_fallback_response(user_question)
            if fallback_response:
                return jsonify({
                    "reply": fallback_response,
                    "confidence": float(best_score),
                    "matched": False
                })
            
            return jsonify({
                "reply": "I'm not sure about that. Could you please rephrase your question or contact support at support@example.com for more help?",
                "confidence": float(best_score),
                "matched": False
            })
        
        # Return the best matching answer
        return jsonify({
            "reply": faq_data.answers[best_match_index],
            "confidence": float(best_score),
            "matched": True,
            "matched_question": faq_data.questions[best_match_index]
        })
        
    except Exception as e:
        logger.error(f"Unexpected error in chat endpoint: {str(e)}", exc_info=True)
        return jsonify({
            "error": "An internal server error occurred",
            "reply": "Sorry, I encountered a technical issue. Please try again later."
        }), 500

def get_fallback_response(question: str) -> str:
    """
    Provide contextual fallback responses based on question keywords
    """
    question_lower = question.lower()
    
    # Keyword-based fallback responses
    fallbacks = [
        (["hello", "hi", "hey", "greetings"], 
         "Hello! How can I help you today?"),
        
        (["thank", "thanks", "appreciate"], 
         "You're welcome! Is there anything else I can help with?"),
        
        (["bye", "goodbye", "see you"], 
         "Goodbye! Feel free to come back if you have more questions."),
        
        (["who", "are you", "your name"], 
         "I'm the FAQ Assistant, here to help answer your questions about our programs!"),
        
        (["how are you"], 
         "I'm doing well, thank you for asking! How can I assist you today?"),
        
        (["help", "can you help"], 
         "Of course! I can answer questions about internships, courses, requirements, and more. What would you like to know?"),
    ]
    
    for keywords, response in fallbacks:
        if any(keyword in question_lower for keyword in keywords):
            return response
    
    return None

@app.route("/feedback", methods=["POST"])
def feedback():
    """
    Endpoint for users to provide feedback on responses
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        question = data.get("question", "")
        answer = data.get("answer", "")
        rating = data.get("rating")  # e.g., 1-5 stars
        feedback_text = data.get("feedback", "")
        
        # Here you would typically store this in a database
        logger.info(f"Feedback received - Question: {question[:50]}..., Rating: {rating}")
        
        return jsonify({
            "status": "success",
            "message": "Thank you for your feedback! It helps us improve."
        })
        
    except Exception as e:
        logger.error(f"Error processing feedback: {str(e)}")
        return jsonify({"error": "Failed to process feedback"}), 500

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        "error": "Endpoint not found",
        "available_endpoints": ["/", "/health", "/faq", "/chat", "/feedback"]
    }), 404

@app.errorhandler(405)
def method_not_allowed(error):
    """Handle 405 errors"""
    return jsonify({
        "error": "Method not allowed",
        "message": "Please check the HTTP method used"
    }), 405

if __name__ == "__main__":
    logger.info(f"Starting FAQ Chatbot on port {Config.PORT}")
    logger.info(f"Loaded {len(faq_data.questions)} FAQ entries")
    logger.info(f"Confidence threshold: {Config.CONFIDENCE_THRESHOLD}")
    
    app.run(
        host="0.0.0.0",  # Allow external connections
        port=Config.PORT,
        debug=Config.DEBUG
    )