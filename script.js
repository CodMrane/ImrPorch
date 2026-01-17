// --- 1. THE DATA (More Info) ---
const carData = {
    "911": {
        name: "911 Carrera",
        subtitle: "The Timeless Machine",
        desc: "The silhouette: iconic. The design: timeless. The technology: inspired by great racing victories and always one step ahead. The 8th generation of the 911 is the sum of its predecessors – and therefore a reflection of the past and a vision of the future.",
        specs: [
            { label: "Engine", value: "3.0L Twin-Turbo Flat-6" },
            { label: "Power", value: "379 hp @ 6500 rpm" },
            { label: "0-60 mph", value: "4.0 sec" },
            { label: "Top Speed", value: "182 mph" },
            { label: "Torque", value: "331 lb-ft" },
            { label: "Weight", value: "3,354 lbs" }
        ]
    },
    "taycan": {
        name: "Taycan Turbo S",
        subtitle: "Pure Electric Performance",
        desc: "The soul has many aspects. It is variable and constantly changing. When viewing the Porsche Taycan, it reveals itself by a smile that expresses total delight. Or by the urge for freedom at the wheel of the new Taycan Cross Turismo.",
        specs: [
            { label: "Battery", value: "93.4 kWh Performance Plus" },
            { label: "Power (Overboost)", value: "750 hp" },
            { label: "0-60 mph", value: "2.6 sec" },
            { label: "Range", value: "278 miles (WLTP)" },
            { label: "Charging", value: "270 kW DC Fast Charge" },
            { label: "Drivetrain", value: "All-Wheel Drive" }
        ]
    },
    "gt3": {
        name: "911 GT3",
        subtitle: "Born in Flacht",
        desc: "The new 911 GT3 with touring package sets the performance tone – but with discretion. It is intended for those who prefer to set the tone on the road rather than merely showing off.",
        specs: [
            { label: "Engine", value: "4.0L Naturally Aspirated" },
            { label: "Redline", value: "9,000 rpm" },
            { label: "0-60 mph", value: "3.2 sec" },
            { label: "Top Speed", value: "197 mph" },
            { label: "Downforce", value: "880 lbs @ 125mph" },
            { label: "Transmission", value: "7-Speed PDK" }
        ]
    }
};

// --- 2. MODAL LOGIC ---
const modal = document.getElementById("carModal");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        const carId = this.getAttribute('data-car');
        const data = carData[carId];

        // Fill Data
        document.getElementById('modalTitle').innerText = data.name;
        document.getElementById('modalSubtitle').innerText = data.subtitle;
        document.getElementById('modalDescription').innerText = data.desc;

        // Fill Specs Grid
        const specsContainer = document.getElementById('modalSpecs');
        specsContainer.innerHTML = ''; // Clear previous info

        data.specs.forEach(spec => {
            const div = document.createElement('div');
            div.className = 'spec-item';
            div.innerHTML = `
                <span class="spec-label">${spec.label}</span>
                <span class="spec-value">${spec.value}</span>
            `;
            specsContainer.appendChild(div);
        });

        modal.style.display = "flex";
    });
    
    // --- 3. 3D TILT LOGIC (The "3D" part) ---
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse position inside card
        const y = e.clientY - rect.top;
        
        // Calculate center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate tilt
        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Reset when mouse leaves
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
    });
});

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; }