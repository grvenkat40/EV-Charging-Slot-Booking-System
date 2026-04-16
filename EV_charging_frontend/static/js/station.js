BASE_URL = "http://127.0.0.1:8000";

// Store these globally so we can refresh without losing context
let currentStationId = null;
let currentStationName = null;

function getHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
    };
}

function showToast(message) {
    const toastContainer = document.getElementById("notification-container");
    if (!toastContainer) return; // Guard clause

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => { toast.remove(); }, 500);
    }, 3000);
}

function formatTime(time) {
    if (!time) return "N/A";
    const dateObj = new Date(time);
    
    const timeString = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });

    return `<span class="date">${dateString}</span> <span class="time">${timeString}</span>`;
}

async function loadSlots(stationId, stationName) {
    // Save state for refresh
    if (stationId) currentStationId = stationId;
    if (stationName) currentStationName = stationName;

    try {
        document.getElementById("stationTitle").innerText = `⚡ ${currentStationName}`;

        const res = await fetch(`${BASE_URL}/slots/get_slot/${currentStationId}`, {
            headers: getHeaders()
        });

        const slots = await res.json();
        const container = document.getElementById("slots");
        container.innerHTML = "";

        if (!slots || slots.length === 0) {
            container.innerHTML = `<p class="empty-note">No slots available</p>`;
            return;
        }

        slots.forEach(slot => {
            const div = document.createElement("div");
            div.className = "slot-card";

            div.innerHTML = `
                <div class="slot-info">
                    <h4>${formatTime(slot.start_time)} - ${formatTime(slot.end_time)}</h4>
                    <p>Slot ID: ${slot.id}</p>
                </div>
                ${
                    slot.is_available
                    ? `<button class="book-btn">Book Now</button>`
                    : `<span class="status-booked">Booked</span>`
                }
            `;

            if (slot.is_available) {
                div.querySelector(".book-btn").addEventListener("click", (e) => {
                    const btn = e.target;
                    btn.disabled = true;
                    btn.innerText = "Booking...";
                    bookSlot(slot.id);
                });
            }

            container.appendChild(div);
        });

    } catch (error) {
        console.error("Failed to load slots:", error);
        showToast("❌ Error loading slots.");
    }
}

async function bookSlot(slotId) {
    try {
        const res = await fetch(`${BASE_URL}/bookings/`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ slot_id: slotId })
        });

        const data = await res.json();

        if (res.ok) {
            showToast("✅ Slot booked successfully!");
            // Now refresh works because currentStationId is stored globally
            loadSlots(); 
        } else {
            showToast(data.detail || "❌ Booking failed!");
            // Re-load to sync state in case slot was taken by someone else
            loadSlots();
        }
    } catch (err) {
        showToast("❌ Network error occurred.");
    }
}