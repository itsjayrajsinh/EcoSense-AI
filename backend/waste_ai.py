def classify_waste(item):
    item = item.lower()

    wet = ["food", "banana", "vegetable"]
    dry = ["plastic", "paper", "bottle"]
    hazardous = ["battery", "medicine"]

    if item in wet:
        return "Wet Waste 🟢"
    elif item in dry:
        return "Dry Waste 🔵"
    elif item in hazardous:
        return "Hazardous Waste 🔴"
    else:
        return "Unknown – please check manually"
