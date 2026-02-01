import requests

def get_live_aqi(city="Ahmedabad"):
    try:
        url = "https://api.openaq.org/v2/latest"
        params = {
            "limit": 1,
            "city": city,
            "parameter": "pm25"
        }

        response = requests.get(url, params=params, timeout=5)
        data = response.json()

        if "results" in data and len(data["results"]) > 0:
            measurements = data["results"][0].get("measurements", [])
            for m in measurements:
                if m.get("parameter") == "pm25":
                    return round(m.get("value", 0), 2)

        return "Data not available"

    except Exception as e:
        return "API error"
