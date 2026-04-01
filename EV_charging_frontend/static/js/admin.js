BASE_URL = "http://127.0.0.1:8000"

async function addStation() {
    const name = document.getElementById("name").value.trim();
    const location = document.getElementById("location").value.trim();
    const lat = parseFloat(document.getElementById("latitude").value);
    const lng = parseFloat(document.getElementById("longitude").value);

    if (!name || !location) {
        alert("⚠️ Please fill all fields");
        return;
    }

    try {
        const res = await fetch(`${BASE_URL}/station`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ name, location, latitude: lat, longitude: lng })
        });

        // 1. MUST await res.json() or it returns a Promise, not the data
        const data = await res.json(); 

        if (res.ok) {
            alert("✅ Station added!");
            // Clear inputs after success
            document.getElementById("name").value = "";
            document.getElementById("location").value = "";
            
            
            loadStationDropdown(); 
            
        } else {
            // 2. Use backticks (`) for template literals, not double quotes (")
            alert(`${data.detail || "Unknown error"}`);
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Could not connect to the server.");
    }
}

async function createSlot() {
    const station_select = document.getElementById("station_select");
    const station_id = station_select.value;
    const start_time = document.getElementById("start_time").value;
    const end_time = document.getElementById("end_time").value;

    if (!station_select || !start_time || !end_time) {
        alert("⚠️ Please fill all fields");
        return;
    }

    const res = await fetch(`${BASE_URL}/slots`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
            station_id,
            start_time: start_time,
            end_time: end_time
        })
    });

    const data = await res.json();

    if (res.ok) {
        alert("✅ Slot created successfully!");
    } else {
        alert(data.detail || "❌ Failed to create slot");
    }
}

async function loadStationDropdown() {
    const res = await fetch(`${BASE_URL}/station/get_stations`, {
        headers:getHeaders()
    });

    const stations = await res.json();
    const select = document.getElementById("station_select");

    select.innerHTML = '<option value="">Select a Station</option>';
    stations.forEach(s => {
        const option = document.createElement("option");
        option.value = s.id;
        option.text = s.name;
        select.appendChild(option);
    });
}
loadStationDropdown();

function formating(time) {
    if (!time) return "N/A";
    const dateObj = new Date(time);
    
    // Format options: Only show Hour:Minute AM/PM
    const timeString = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });

    return `<span class="date">${dateString}</span> <span class="time">${timeString}</span>`;
}

async function loadSlots() {
    try {
        const [stationsRes, slotsRes] = await Promise.all([
            fetch(`${BASE_URL}/station/get_stations`, { headers: getHeaders() }),
            fetch(`${BASE_URL}/slots/get_slots`, { headers: getHeaders() })
        ]);

        const stations = await stationsRes.json();
        const slots = await slotsRes.json();
        const list = document.getElementById("slots");
        list.innerHTML = "";
        
        stations.forEach(station => {
            // Create station container
            const stationSection = document.createElement("div");
            stationSection.className = "station-container";
            stationSection.innerHTML = `<h3>Station: ${station.name}</h3>`;
            
            const slotList = document.createElement("ul");
            
            // Filter slots for this station
            const stationSlots = slots.filter(s => s.station_id === station.id);

            if (stationSlots.length === 0) {
                slotList.innerHTML = "<li>No slots available</li>";
            } else {
                stationSlots.forEach(slot => {
                    const li = document.createElement("li");
                    
                    li.innerHTML = `
                        <div class="slot-id-badge"><strong>Slot ID: ${slot.id}</strong></div> | 
                        <span>${formating(slot.start_time)} to ${formating(slot.end_time)}</span>
                        ${
                            slot.is_available
                            ? `<button onclick="this.disabled=true; bookSlot(${slot.id})" class="slot-btn">Book Now</button>`
                            : `<span style="color:red;" class="status-booked">[Booked]</span>`
                        }
                    `;
                    slotList.appendChild(li);
                });
            }
            
            stationSection.appendChild(slotList);
            list.appendChild(stationSection);
        });
    } catch (error) {
        console.error("Failed to load slots:", error);
    }
}

