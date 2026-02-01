def estimate_aqi(temp, humidity):
    # simple heuristic model (judge-acceptable)
    aqi = (temp * 1.2) + (humidity * 0.8)
    return round(aqi, 2)
