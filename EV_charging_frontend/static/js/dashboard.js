document.addEventListener("DOMContentLoaded", () => {
    loadStation();
    loadBookings();
});
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

let allStations = [];

async function  loadStation() {
    const res = await fetch(`${BASE_URL}/station/get_stations`, {
        headers:getHeaders()
    });
    const data = await res.json();
    allStations = data;

    const list = document.getElementById("stations");
    list.innerHTML="";
    data.forEach(station => {
        const div = document.createElement("div");
        div.className = "station-card clickable";

        div.innerHTML = `
            <div class="station-info">
                <h4>${station.name}</h4>
                <p>Click to view slots</p>
            </div>
            <button class="view-slots-btn">View Slots</button>
        `;

        div.querySelector(".view-slots-btn").addEventListener("click", () => {
            window.location.href = `station.html?id=${station.id}&name=${encodeURIComponent(station.name)}`;        });
        list.appendChild(div);
        // const li = document.createElement("li");
        // li.innerHTML = station.name;
        // list.appendChild(li);
        renderStations(data);
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

function renderStations(stations) {
    const list = document.getElementById("stations");
    list.innerHTML = "";
    if (stations.length === 0) {
        list.innerHTML = `<p class="empty-note">No stations found</p>`;
        return;
    }
    stations.forEach(station => {
        const div = document.createElement("div");
        div.className = "station-card";

        div.innerHTML = `
            <div class="station-info">
                <h4>${station.name}</h4>
                <p>Click to view slots</p>
            </div>
            <button class="view-slots-btn">View Slots</button>
        `;

        div.querySelector(".view-slots-btn").addEventListener("click", () => {
            window.location.href = `station.html?id=${station.id}&name=${encodeURIComponent(station.name)}`;
        });

        list.appendChild(div);
    });
}

const searchInput = document.querySelector('input[placeholder="Search location..."]');
searchInput.addEventListener("input", (e)=>{
    const value = e.target.value.toLowerCase();

    const filtered = allStations.filter(
        station=>station.name.toLowerCase().includes(value)
    );
    renderStations(filtered)
});


// async function loadSlots() {
//     try {
//         const params = new URLSearchParams(window.location.search);
//         const stationId = params.get("id");
//         const stationName = params.get("name");

//         document.getElementById("stationTitle").innerText = `⚡ ${stationName}`;




//         const [stationsRes, slotsRes] = await Promise.all([
//             fetch(`${BASE_URL}/station/get_stations`, { headers: getHeaders() }),
//             fetch(`${BASE_URL}/slots/get_slots`, { headers: getHeaders() })
//         ]);

//         const stations = await stationsRes.json();
//         const slots = await slotsRes.json();

//         const list = document.getElementById("slots");
//         list.innerHTML = "";

//         stations.forEach(station => {
//             // Create station container
//             const stationSection = document.createElement("div");
//             stationSection.className = "station-container";
//             stationSection.innerHTML = `<h3>Station: ${station.name}</h3>`;
            
//             const slotList = document.createElement("ul");

//             // Filter slots for this station
//             const stationSlots = slots.filter(s => s.station_id === station.id);

//             if (stationSlots.length === 0) {
//                 slotList.innerHTML = "<li>No slots available</li>";
//             } else {
//                 stationSlots.forEach(slot => {
//                     const li = document.createElement("li");
//                     li.innerHTML = `
//                         <div class="slot-id-badge"><strong>Slot ID: ${slot.id}</strong></div> | 
//                         <span>${formating(slot.start_time)} to ${formating(slot.end_time)}</span>
//                         ${
//                             slot.is_available
//                             ? `<button onclick="this.disabled=true; bookSlot(${slot.id})" class="slot-btn">Book Now</button>`
//                             : `<span style="color:red;" class="status-booked"> [Booked]</span>`
//                         }
//                     `;
//                     slotList.appendChild(li);
//                 });
//             }
            
//             stationSection.appendChild(slotList);
//             list.appendChild(stationSection);
//         });
//     } catch (error) {
//         console.error("Failed to load slots:", error);
//     }
// }

// async function loadSlots(stationId, stationName) {
//     try {
//         // ✅ Get stationId from URL
//         // const params = new URLSearchParams(window.location.search);
//         // const stationId = params.get("id");
//         // const stationName = params.get("name");

//         // Set title
//         document.getElementById("stationTitle").innerText = `⚡ ${stationName}`;

//         // ✅ Fetch ONLY slots for that station
//         const res = await fetch(`${BASE_URL}/slots/get_slot/${stationId}`, {
//             headers: getHeaders()
//         });

//         const slots = await res.json();

//         const container = document.getElementById("slots");
//         container.innerHTML = "";

//         if (slots.length === 0) {
//             container.innerHTML = `<p class="empty-note">No slots available</p>`;
//             return;
//         }

//         // ✅ Render slots
//         slots.forEach(slot => {
//             const div = document.createElement("div");
//             div.className = "slot-card";

//             div.innerHTML = `
//                 <div class="slot-info">
//                     <h4>${formating(slot.start_time)} - ${formating(slot.end_time)}</h4>
//                     <p>Slot ID: ${slot.id}</p>
//                 </div>

//                 ${
//                     slot.is_available
//                     ? `<button class="book-btn">Book Now</button>`
//                     : `<span class="status-booked">Booked</span>`
//                 }
//             `;

//             // ✅ Add booking event
//             if (slot.is_available) {
//                 div.querySelector(".book-btn").addEventListener("click", (e) => {
//                     e.target.disabled = true;
//                     bookSlot(slot.id);
//                 });
//             }

//             container.appendChild(div);
//         });

//     } catch (error) {
//         console.error("Failed to load slots:", error);
//     }
// }

// async function bookSlot(slotId) {
//     const res = await fetch(`${BASE_URL}/bookings/`, {
//         method:"POST",
//         headers:getHeaders(),
//         body:JSON.stringify({slot_id:slotId})
//     });

//     const data = await res.json();

//     if (res.ok) {
//         showToast("✅ Slot booked successfully!");

//         // 🔥 Refresh slots after booking
//         loadSlots();

//     } else {
//         showToast(data.detail || "❌ Booking failed!");
//     }
// }

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