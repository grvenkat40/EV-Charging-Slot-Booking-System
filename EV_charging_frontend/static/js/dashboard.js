
BASE_URL = "http://127.0.0.1:8000"

function getHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
    };
}

function showToast(message){
    const toastContainer = document.getElementById("notification-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = message;

    toastContainer.appendChild(toast);

    setTimeout(
        () => {
            toast.style.opacity = '0';
            setTimeout(() => {toast.remove();}, 500);
        }, 3000
    );
}

async function  loadStation() {
    const res = await fetch(`${BASE_URL}/station/get_stations`, {
        headers:getHeaders()
    });
    const data = await res.json();

    const list = document.getElementById("stations");
    list.innerHTML="";
    data.forEach(station => {
        const li = document.createElement("li");
        li.innerHTML = station.name;
        list.appendChild(li);
    });
}

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
                            : `<span style="color:red;" class="status-booked"> [Booked]</span>`
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

async function bookSlot(slotId) {
    const res = await fetch(`${BASE_URL}/bookings/`, {
        method:"POST",
        headers:getHeaders(),
        body:JSON.stringify({slot_id:slotId})
    });

    const data = await res.json();

    if (res.ok) {
        showToast("✅ Slot booked successfully!");

        // 🔥 Refresh slots after booking
        loadSlots();

    } else {
        showToast(data.detail || "❌ Booking failed!");
    }
}

async function loadBookings() {

    const [bookingsRes, stationsRes] = await Promise.all([
        fetch(`${BASE_URL}/bookings/get_my_bookings`, { headers: getHeaders() }),
        fetch(`${BASE_URL}/station/get_stations`, { headers: getHeaders() })
    ]);

    const bookings = await bookingsRes.json();
    const stations = await stationsRes.json();

    // 🔥 Create map: station_id → name
    const stationMap = {};
    stations.forEach(s => {
        stationMap[s.id] = s.name;
    });

    const list = document.getElementById("bookings");
    list.innerHTML = "";

    bookings.forEach(b => {
        const li = document.createElement("li");

        const stationName = stationMap[b.slot.station_id] || "Unknown";

        li.innerHTML = `📍 <strong>${stationName}</strong> → Slot ${b.slot.slot_id}`;

        list.appendChild(li);
    });
}