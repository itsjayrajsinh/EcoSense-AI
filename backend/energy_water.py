def analyze_usage(electricity, water, people):
    result = []

    if electricity > (people * 80):
        result.append("High electricity usage detected")

    if water > (people * 150):
        result.append("High water usage detected")

    if not result:
        result.append("Usage is within sustainable limits")

    return result
