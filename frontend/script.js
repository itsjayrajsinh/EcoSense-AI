/* =========================
   CITY AUTOCOMPLETE (AQI)
   ========================= */

const cities = ["Delhi", "Mumbai", "Ahmedabad", "Pune", "Bengaluru", "Chennai"];

window.onload = () => {
  const list = document.getElementById("cityList");
  if (!list) return;

  cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    list.appendChild(option);
  });
};

/* =========================
   AIR QUALITY MODULE
   ========================= */

function getAQI() {
  const cityInput = document.getElementById("city");
  const cityName = cityInput?.value || "Ahmedabad";

  fetch(`http://127.0.0.1:5000/live-aqi?city=${cityName}`)
    .then(res => res.json())
    .then(data => {
      let color = "green";
      let label = "Good";

      if (data.pm25 > 150) {
        color = "red";
        label = "Poor";
      } else if (data.pm25 > 80) {
        color = "orange";
        label = "Moderate";
      }

      const result = document.getElementById("aqiResult");
      if (result) {
        result.innerHTML = `
          <b style="color:${color}">
            PM2.5: ${data.pm25} (${label})
          </b><br>
          Source: ${data.source}
        `;
      }
    })
    .catch(() => {
      const result = document.getElementById("aqiResult");
      if (result) {
        result.innerText = "Unable to fetch AQI data.";
      }
    });
}

/* =========================
   ENERGY & WATER MODULE
   ========================= */

function checkUsage() {
  const electricity = Number(document.getElementById("electricity")?.value);
  const water = Number(document.getElementById("water")?.value);
  const people = Number(document.getElementById("people")?.value);

  const result = document.getElementById("usageStatus");

  if (!electricity || !water || !people) {
    result.innerText = "Please fill all fields.";
    result.style.color = "#facc15";
    return;
  }

  fetch("http://127.0.0.1:5000/energy-water", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ electricity, water, people })
  })
    .then(res => res.json())
    .then(data => {
      result.innerHTML = data.analysis.join("<br>");
      result.style.color = "#4ade80";
    })
    .catch(() => {
      result.innerText = "Unable to analyze usage.";
      result.style.color = "#ef4444";
    });
}

/* =========================
   WASTE MANAGEMENT MODULE
   ========================= */

function classifyWaste() {
  const itemInput = document.getElementById("wasteItem");
  const result = document.getElementById("wasteResult");
  const item = itemInput?.value.toLowerCase();

  // Reset all foreground bins
  document.querySelectorAll(".bin").forEach(bin =>
    bin.classList.remove("active")
  );

  // Reset all background bins (SVG)
  document.querySelectorAll("svg path.bg-bin").forEach(bin =>
    bin.classList.remove("active")
  );

  if (!item) {
    result.innerText = "Please enter a waste item.";
    result.style.color = "#facc15";
    return;
  }

  if (item.includes("plastic") || item.includes("bottle") || item.includes("paper")) {
    result.innerText = "Recyclable ♻️ – Put it in the recycling bin.";
    result.style.color = "#4ade80";

    document.getElementById("bin-recycle")?.classList.add("active");
    document.getElementById("bg-bin-recycle")?.classList.add("active");
  }
  else if (item.includes("food") || item.includes("banana") || item.includes("vegetable")) {
    result.innerText = "Wet waste 🌱 – Compost it if possible.";
    result.style.color = "#22c55e";

    document.getElementById("bin-wet")?.classList.add("active");
    document.getElementById("bg-bin-wet")?.classList.add("active");
  }
  else if (item.includes("battery") || item.includes("chemical") || item.includes("medicine")) {
    result.innerText = "Hazardous ☠️ – Dispose at a special facility.";
    result.style.color = "#ef4444";

    document.getElementById("bin-hazardous")?.classList.add("active");
    document.getElementById("bg-bin-hazardous")?.classList.add("active");
  }
  else {
    result.innerText = "Dry waste 🗑️ – Dispose responsibly.";
    result.style.color = "#e5e7eb";

    document.getElementById("bin-dry")?.classList.add("active");
    document.getElementById("bg-bin-dry")?.classList.add("active");
  }
}

/* =========================
   CHATBOT MODULE
   ========================= */

function sendChat() {
  const input = document.getElementById("chatInput");
  const box = document.getElementById("chatBox");
  const message = input?.value;

  if (!message) return;

  box.innerHTML += `<div><b>You:</b> ${message}</div>`;

  fetch("http://127.0.0.1:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  })
    .then(res => res.json())
    .then(data => {
      box.innerHTML += `<div><b>Bot:</b> ${data.reply}</div>`;
    })
    .catch(() => {
      box.innerHTML += `<div><b>Bot:</b> Error connecting.</div>`;
    });

  input.value = "";
}
