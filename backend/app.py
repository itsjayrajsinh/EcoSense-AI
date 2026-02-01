from flask import Flask, request, jsonify
from flask_cors import CORS
import random

from aqi_live import get_live_aqi
from aqi_estimation import estimate_aqi
from aqi_cache import save_aqi, get_cached
from energy_water import analyze_usage
from waste_ai import classify_waste
from ai_chatbot import ai_chatbot_reply

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "message": "EcoSense AI Backend Running",
        "routes": [
            "/live-aqi",
            "/energy-water",
            "/waste",
            "/chat"
        ]
    })


@app.route("/live-aqi")
def live_aqi():
    city = request.args.get("city", "Ahmedabad")

    aqi = get_live_aqi(city)

    if aqi is not None:
        save_aqi(city, aqi)
        source = "Live"
    else:
        cached = get_cached(city)
        if cached is not None:
            aqi = cached
            source = "Cached"
        else:
            aqi = estimate_aqi(
                random.randint(25, 35),
                random.randint(40, 70)
            )
            source = "Estimated"

    return jsonify({
        "city": city,
        "aqi": aqi,
        "source": source
    })


@app.route("/energy-water", methods=["POST"])
def energy_water():
    data = request.get_json()

    electricity = data.get("electricity")
    water = data.get("water")
    people = data.get("people")

    result = analyze_usage(electricity, water, people)

    return jsonify({
        "analysis": result
    })


@app.route("/waste", methods=["POST"])
def waste():
    data = request.get_json()
    item = data.get("item")

    return jsonify({
        "waste_type": classify_waste(item)
    })


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message")

    return jsonify({
        "reply": ai_chatbot_reply(message)
    })


if __name__ == "__main__":
    app.run(debug=False)
