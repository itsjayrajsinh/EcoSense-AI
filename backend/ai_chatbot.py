from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

questions = [
    "is air pollution dangerous",
    "how can i save electricity",
    "how to save water",
    "how to segregate waste",
    "where to throw batteries",
    "what is wet waste",
    "what is dry waste"
]

answers = [
    "High air pollution can cause breathing problems. Avoid outdoor exposure.",
    "Use LEDs, reduce AC usage, and turn off unused devices.",
    "Fix leaks, use buckets, and reuse water where possible.",
    "Wet waste goes in green bins and dry waste in blue bins.",
    "Batteries must be disposed of as hazardous waste.",
    "Wet waste includes food scraps and biodegradable items.",
    "Dry waste includes plastic, paper, and metals."
]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(questions)

def ai_chatbot_reply(user_input):
    vec = vectorizer.transform([user_input])
    sim = cosine_similarity(vec, X)
    idx = sim.argmax()

    if sim[0][idx] < 0.25:
        return "I can help with air quality, energy, water, and waste topics."

    return answers[idx]
