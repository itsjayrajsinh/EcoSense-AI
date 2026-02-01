cache = {}

def save_aqi(city, value):
    cache[city.lower()] = value

def get_cached(city):
    return cache.get(city.lower())
