// Initialize Icons
lucide.createIcons();

// Mock Data
const alerts = [
    { id: 'BIN-001', type: 'High', message: 'Bin approaching maximum capacity', time: 'about 10 hours ago', severity: 'danger' },
    { id: 'BIN-005', type: 'High', message: 'Bin has exceeded safe capacity level', time: 'about 15 hours ago', severity: 'danger' },
    { id: 'BIN-004', type: 'High', message: 'Bin fill level critical - immediate attention required', time: 'about 15 hours ago', severity: 'danger' },
    { id: 'BIN-008', type: 'Medium', message: 'Low battery warning - 45% remaining', time: 'about 17 hours ago', severity: 'warning' }
];

const attentionBins = [
    { id: 'BIN-001', location: 'Silver Park - Mira Road', fillLevel: 92, battery: 85, temp: 28, time: '1 day' },
    { id: 'BIN-004', location: 'Maxus Mall - Bhayandar', fillLevel: 88, battery: 65, temp: 29, time: '1 day' },
    { id: 'BIN-008', location: 'MBMC Office Area', fillLevel: 85, battery: 45, temp: 30, time: '2 days' }
];

// Initialize Map
const streetLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO'
});
const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri'
});

const map = L.map('map', {
    center: [19.2952, 72.8544],
    zoom: 13,
    layers: [streetLayer]
});

// Add Layer Control Feature
L.control.layers({
    "Light Theme (Street)": streetLayer,
    "Dark Theme (Satellite)": satelliteLayer
}).addTo(map);

// Add some mock markers
const markerStyle = `
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    width: 24px;
    height: 24px;
`;

const createIcon = (color) => {
    return L.divIcon({
        html: `<div style="${markerStyle}"><div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${color}"></div></div>`,
        className: 'custom-div-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
};

const colors = {
    normal: 'var(--primary-color)',
    warning: 'var(--warning-color)',
    critical: 'var(--danger-color)'
};

const mapPoints = [
    { id: 'BIN-002', lat: 19.2952, lng: 72.8544, status: 'critical', fillLevel: 94 },
    { id: 'BIN-015', lat: 19.3000, lng: 72.8500, status: 'warning', fillLevel: 75 },
    { id: 'BIN-007', lat: 19.2900, lng: 72.8600, status: 'normal', fillLevel: 32 },
    { id: 'BIN-012', lat: 19.3100, lng: 72.8450, status: 'normal', fillLevel: 45 },
    { id: 'BIN-009', lat: 19.2850, lng: 72.8580, status: 'critical', fillLevel: 89 },
    { id: 'BIN-003', lat: 19.2980, lng: 72.8650, status: 'warning', fillLevel: 81 }
];

mapPoints.forEach(point => {
    const marker = L.marker([point.lat, point.lng], { icon: createIcon(colors[point.status] || '#ccc') }).addTo(map);

    // Add interactive popup tooltips
    marker.bindPopup(`
        <div style="font-family: 'Inter', sans-serif; text-align: center;">
            <strong>${point.id}</strong><br>
            Status: <span style="color: ${colors[point.status]}; text-transform: capitalize;">${point.status}</span><br>
            Fill Level: ${point.fillLevel}%
        </div>
    `);
});

// Live Garbage Truck Tracking (Fleet)
const truckIconHtml = `<div style="background-color: var(--primary-color); border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 8px rgba(0,0,0,0.3); border: 2px solid white; transition: all 0.3s ease;">
                           <i data-lucide="truck" style="width: 18px; height: 18px;"></i>
                       </div>`;

const truckMarkerIcon = L.divIcon({
    html: truckIconHtml,
    className: 'custom-div-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

// Create 4 distinct trucks with dedicated structural road paths
const route1 = [
    [19.2952, 72.8544], [19.2965, 72.8546], [19.2980, 72.8550], [19.3000, 72.8552], [19.3020, 72.8540], [19.3000, 72.8552], [19.2980, 72.8550], [19.2965, 72.8546]
];
const route2 = [
    [19.3000, 72.8500], [19.2990, 72.8520], [19.2980, 72.8540], [19.2970, 72.8560], [19.2980, 72.8540], [19.2990, 72.8520]
];
const route3 = [
    [19.2850, 72.8580], [19.2870, 72.8585], [19.2890, 72.8590], [19.2910, 72.8590], [19.2890, 72.8590], [19.2870, 72.8585]
];
const route4 = [
    [19.3100, 72.8450], [19.3080, 72.8470], [19.3060, 72.8490], [19.3040, 72.8500], [19.3060, 72.8490], [19.3080, 72.8470]
];

const fleet = [
    { id: 'TRK-01', lat: route1[0][0], lng: route1[0][1], driver: 'Ramesh', speed: 25, route: route1, rIdx: 1, marker: null },
    { id: 'TRK-02', lat: route2[0][0], lng: route2[0][1], driver: 'Suresh', speed: 18, route: route2, rIdx: 1, marker: null },
    { id: 'TRK-03', lat: route3[0][0], lng: route3[0][1], driver: 'Prakash', speed: 30, route: route3, rIdx: 1, marker: null },
    { id: 'TRK-04', lat: route4[0][0], lng: route4[0][1], driver: 'Amit', speed: 22, route: route4, rIdx: 1, marker: null }
];

fleet.forEach(truck => {
    truck.marker = L.marker([truck.lat, truck.lng], { icon: truckMarkerIcon, zIndexOffset: 1000 }).addTo(map);
    truck.marker.bindPopup(`<strong>Garbage Truck ${truck.id}</strong><br>Driver: ${truck.driver}<br>Status: Active Route<br>Speed: ${truck.speed} km/h`);
});

// Toast Notification System
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let iconName = 'check-circle';
    if (type === 'error') iconName = 'x-circle';
    if (type === 'warning') iconName = 'alert-triangle';

    toast.innerHTML = `
        <div class="toast-icon">
            <i data-lucide="${iconName}"></i>
        </div>
        <div class="toast-message">${message}</div>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}


// Initialize Chart
const ctx = document.getElementById('weeklyChart').getContext('2d');
const gradientGreen = ctx.createLinearGradient(0, 0, 0, 400);
gradientGreen.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
gradientGreen.addColorStop(1, 'rgba(16, 185, 129, 0)');

const gradientYellow = ctx.createLinearGradient(0, 0, 0, 400);
gradientYellow.addColorStop(0, 'rgba(245, 158, 11, 0.2)');
gradientYellow.addColorStop(1, 'rgba(245, 158, 11, 0)');

const chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Fill Levels',
                data: [65, 70, 68, 85, 82, 60, 65],
                borderColor: '#f59e0b',
                backgroundColor: gradientYellow,
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 0
            },
            {
                label: 'Collections',
                data: [20, 15, 25, 18, 30, 15, 20],
                borderColor: '#10b981',
                backgroundColor: gradientGreen,
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 0
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                grid: {
                    color: '#f3f4f6'
                },
                border: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                },
                border: {
                    display: false
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
    }
});


// Render Alerts
const alertsList = document.getElementById('alertsList');
alerts.forEach(alert => {
    const icon = alert.severity === 'danger' ? 'triangle-alert' : 'battery-warning';

    alertsList.innerHTML += `
        <div class="alert-item ${alert.severity}">
            <div class="alert-content">
                <div class="alert-icon">
                    <i data-lucide="${icon}"></i>
                </div>
                <div class="alert-text">
                    <h4>${alert.id} <span class="alert-badge">${alert.type}</span></h4>
                    <p>${alert.message}</p>
                    <p style="font-size: 0.75rem; margin-top: 0.25rem;">${alert.time}</p>
                </div>
            </div>
            <div class="alert-action" onclick="showToast('Alert resolved successfully!', 'success'); this.parentElement.style.opacity = '0.5';">
                <i data-lucide="check-circle" style="cursor: pointer;"></i>
            </div>
        </div>
    `;
});

// Render Bins Needing Attention
const attentionListEl = document.getElementById('attentionList');
attentionBins.forEach(bin => {
    attentionListEl.innerHTML += `
        <div class="attention-item">
            <div class="attention-item-header">
                <h4>${bin.id}</h4>
                <div style="width: 8px; height: 8px; border-radius: 50%; background-color: var(--danger-color); margin-top: 6px;"></div>
            </div>
            <div class="attention-item-location">
                <i data-lucide="map-pin"></i> ${bin.location}
            </div>
            
            <div class="progress-container">
                <div class="progress-label">
                    <span>Fill Level</span>
                    <span id="label-${bin.id}">${bin.fillLevel}%</span>
                </div>
                <div class="progress-bar-bg">
                    <div id="bar-${bin.id}" class="progress-bar-fill" style="width: ${bin.fillLevel}%; transition: width 0.5s ease-in-out;"></div>
                </div>
            </div>
            
            <div class="attention-item-footer">
                <span><i data-lucide="battery"></i> ${bin.battery}%</span>
                <span><i data-lucide="thermometer"></i> ${bin.temp}°C</span>
                <span><i data-lucide="clock"></i> ${bin.time}</span>
            </div>
            <button class="btn btn-outline" style="margin-top: 1rem; width: 100%; border-color: var(--primary-color); color: var(--primary-color);" onclick="showToast('Collection scheduled for ${bin.id}', 'success')">Schedule Collection</button>
        </div>
    `;
});

// Interactive Button Bindings
document.querySelectorAll('.btn-outline').forEach(btn => {
    if (!btn.hasAttribute('onclick')) {
        btn.addEventListener('click', (e) => {
            if (e.target.innerText === 'Export') {
                showToast('Report export initiated...', 'success');
            } else if (e.target.innerText === 'Schedule All') {
                showToast('Scheduled 3 high priority bins for collection', 'success');
            }
        });
    }
});

// SPA View Routing System
const formatViewId = (text) => {
    // Strip out newlines and numbers (for the Alerts 4 badge)
    let cleanText = text.replace(/[\n\r0-9]/g, '').trim();
    if (cleanText === 'All Bins') return 'view-bins';
    if (cleanText === 'Map View') return 'view-map';
    return `view-${cleanText.toLowerCase()}`;
};

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        // Handle Sidebar UI State
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        // Handle View Switching
        const targetViewId = formatViewId(item.textContent);
        const allViews = document.querySelectorAll('.page-view');

        allViews.forEach(view => {
            view.classList.remove('active');
            view.style.display = 'none'; // Force hide
        });

        const targetView = document.getElementById(targetViewId);
        if (targetView) {
            if (targetViewId === 'view-map') {
                targetView.style.display = 'flex'; // Fix Map View flex collapse bug
            } else {
                targetView.style.display = 'block';
            }
            setTimeout(() => targetView.classList.add('active'), 10);

            // Fix map rendering if Map View is clicked
            if (targetViewId === 'view-map') {
                setTimeout(() => { if (typeof mapWide !== 'undefined') mapWide.invalidateSize(); }, 300);
            } else if (targetViewId === 'view-dashboard') {
                setTimeout(() => { map.invalidateSize(); }, 300);
            }
        }
    });
});

// Theme Toggle Switch handler
const themeToggle = document.getElementById('themeToggleCheckbox');
if (themeToggle) {
    themeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.classList.add('dark-theme');
            showToast('Dark theme enabled!', 'success');
            map.addLayer(satelliteLayer);
            map.removeLayer(streetLayer);
        } else {
            document.body.classList.remove('dark-theme');
            showToast('Light theme enabled!', 'success');
            map.addLayer(streetLayer);
            map.removeLayer(satelliteLayer);
        }
    });
}

// Live Data Simulation
setInterval(() => {
    // Randomize chart data a bit to look real-time
    const data1 = chartInstance.data.datasets[0].data;
    const data2 = chartInstance.data.datasets[1].data;

    // Slight jitter to the last point
    data1[data1.length - 1] = Math.max(0, Math.min(100, data1[data1.length - 1] + (Math.random() * 4 - 2)));
    chartInstance.update();

    // Randomize fill level for attention list
    attentionBins.forEach(bin => {
        if (Math.random() > 0.6) {
            const newLevel = Math.min(100, bin.fillLevel + (Math.random() * 2));
            bin.fillLevel = parseFloat(newLevel.toFixed(1));

            const bar = document.getElementById(`bar-${bin.id}`);
            const label = document.getElementById(`label-${bin.id}`);

            if (bar && label) {
                bar.style.width = `${bin.fillLevel}%`;
                label.innerText = `${bin.fillLevel}%`;

                // If it hits 100%, show warning
                if (bin.fillLevel > 98) {
                    showToast(`${bin.id} is at critical capacity!`, 'warning');
                }
            }
        }
    });

    // Simulate realistic road tracking for fleet
    fleet.forEach(truck => {
        const target = truck.route[truck.rIdx];
        const distLat = target[0] - truck.lat;
        const distLng = target[1] - truck.lng;
        const dist = Math.sqrt(distLat * distLat + distLng * distLng);

        // If within 20 meters of waypoint, acquire next target waypoint
        if (dist < 0.0003) {
            truck.rIdx = (truck.rIdx + 1) % truck.route.length;
        } else {
            // Move linearly towards the waypoint on structural road map
            const moveStep = 0.0002;
            truck.lat += (distLat / dist) * moveStep;
            truck.lng += (distLng / dist) * moveStep;
        }

        truck.marker.setLatLng([truck.lat, truck.lng]);
    });

}, 3000);

// Additional UI Interactions
// Notification Bell
document.querySelector('.notification-btn').addEventListener('click', () => {
    showToast('You have 4 unread alerts!', 'warning');
});

// Profile Area
document.querySelector('.user-profile').addEventListener('click', () => {
    showToast('Opening Admin Settings...', 'success');
});

// View Full Map link
document.querySelector('.header-link').addEventListener('click', (e) => {
    e.preventDefault();
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer.style.height === '500px') {
        mapContainer.style.height = '350px';
        e.target.innerHTML = `View Full Map <i data-lucide="arrow-right"></i>`;
    } else {
        mapContainer.style.height = '500px';
        e.target.innerHTML = `Minimize Map <i data-lucide="arrow-down"></i>`;
    }
    // Re-trigger Leaflet map resize to fix layout
    setTimeout(() => { map.invalidateSize(); }, 300);
    lucide.createIcons();
});

// Responsive Search Bar Filter for Alerts and Bins
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const alertItems = document.querySelectorAll('.alert-item');

        alertItems.forEach(item => {
            const textContent = item.textContent.toLowerCase();
            if (textContent.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        // Also filter the All Bins table if we are on that view
        const binRows = document.querySelectorAll('#binsTableBody tr');
        binRows.forEach(row => {
            const rowTargetHTML = row.innerHTML.toLowerCase(); // Check innerHTML for robust scanning
            if (rowTargetHTML.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Re-initialize icons for dynamically added content
lucide.createIcons();

// --- Mobile Menu Toggle --- //
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.querySelector('.sidebar');
if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar.classList.contains('open') && !sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });
}

// --- NEW FULL SPA VIEW LOGIC --- //

// 1. Initialize Wide Map Context
const mapWide = L.map('mapWide', {
    center: [19.2952, 72.8544],
    zoom: 14,
    layers: [L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png')]
});

const wideFleetMarkers = [];
fleet.forEach(truck => {
    let m = L.marker([truck.lat, truck.lng], { icon: truckMarkerIcon, zIndexOffset: 1000 }).addTo(mapWide);
    m.bindPopup(`<strong>Garbage Truck ${truck.id}</strong><br>Driver: ${truck.driver}`);
    wideFleetMarkers.push({ id: truck.id, marker: m });
});

setInterval(() => {
    wideFleetMarkers.forEach(wf => {
        const correspondingTruck = fleet.find(t => t.id === wf.id);
        if (correspondingTruck) wf.marker.setLatLng([correspondingTruck.lat, correspondingTruck.lng]);
    });
}, 3000);

// 2. All Bins Directory Table Data
const allBinsData = [
    { id: 'BIN-001', loc: 'Silver Park - Mira Road', level: 92, status: 'Critical', hw: '85% / 28°C' },
    { id: 'BIN-002', loc: 'Mira Road East Stn', level: 45, status: 'Normal', hw: '99% / 24°C' },
    { id: 'BIN-003', loc: 'GCC Club Area', level: 81, status: 'Warning', hw: '65% / 29°C' },
    { id: 'BIN-004', loc: 'Maxus Mall - Bhayandar', level: 88, status: 'Warning', hw: '65% / 29°C' },
    { id: 'BIN-005', loc: 'Golden Nest Circle', level: 12, status: 'Normal', hw: '100% / 22°C' },
    { id: 'BIN-006', loc: 'Kanakia Police Station', level: 25, status: 'Normal', hw: '88% / 23°C' },
    { id: 'BIN-007', loc: 'Pleasant Park', level: 32, status: 'Normal', hw: '55% / 27°C' },
    { id: 'BIN-008', loc: 'MBMC Office Area', level: 85, status: 'Warning', hw: '45% / 30°C' },
    { id: 'BIN-009', loc: 'Bhayandar West Stn', level: 89, status: 'Critical', hw: '30% / 32°C' },
    { id: 'BIN-010', loc: 'Indralok Phase 3', level: 55, status: 'Normal', hw: '90% / 25°C' }
];

const tbody = document.getElementById('binsTableBody');
if (tbody) {
    allBinsData.forEach(bin => {
        let badgeColor = bin.status === 'Critical' ? 'var(--danger-color)' : (bin.status === 'Warning' ? 'var(--warning-color)' : 'var(--primary-color)');
        let badgeBg = bin.status === 'Critical' ? 'rgba(220,38,38,0.1)' : (bin.status === 'Warning' ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)');

        tbody.innerHTML += `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 1rem; font-weight: 500;">${bin.id}</td>
                <td style="padding: 1rem;">${bin.loc}</td>
                <td style="padding: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="flex: 1; height: 6px; background: var(--bg-main); border-radius: 3px;">
                            <div style="width: ${bin.level}%; height: 100%; background: ${badgeColor}; border-radius: 3px;"></div>
                        </div>
                        <span style="font-size: 0.8rem; min-width: 30px;">${bin.level}%</span>
                    </div>
                </td>
                <td style="padding: 1rem;"><span style="background: ${badgeBg}; color: ${badgeColor}; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">${bin.status}</span></td>
                <td style="padding: 1rem; color: var(--text-secondary); font-size: 0.85rem;">${bin.hw}</td>
                <td style="padding: 1rem; text-align: right;">
                    <button class="btn btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" onclick="showToast('Dispatching to ${bin.id}', 'success')">Dispatch</button>
                    <i data-lucide="more-vertical" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; cursor: pointer; color: var(--text-secondary); margin-left: 0.5rem;"></i>
                </td>
            </tr>
        `;
    });
}

// 3. Analytics Dummy Charts
if (document.getElementById('compositionChart')) {
    new Chart(document.getElementById('compositionChart').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Organic (45%)', 'Recyclable (30%)', 'Hazardous (5%)', 'Mixed Waste (20%)'],
            datasets: [{
                data: [45, 30, 5, 20],
                backgroundColor: ['#10b981', '#3b82f6', '#ef4444', '#f59e0b'],
                borderWidth: 0
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }
    });
}

if (document.getElementById('monthlyChart')) {
    new Chart(document.getElementById('monthlyChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            datasets: [{
                label: 'Tons Collected',
                data: [420, 380, 510, 490, 460, 505],
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
                borderRadius: 4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// 4. Team Directory Grid
const teamMembers = [
    { name: 'Ramesh Singh', role: 'Senior Driver - Route A', status: 'On Duty' },
    { name: 'Suresh Kumar', role: 'Driver - Route B', status: 'On Duty' },
    { name: 'Prakash Rao', role: 'Driver - Route C', status: 'On Break' },
    { name: 'Amit Patel', role: 'Fleet Manager', status: 'Available' },
    { name: 'Vikram Joshi', role: 'Maintenance Tech', status: 'Available' },
    { name: 'Neha Sharma', role: 'City Operations Coordinator', status: 'Do Not Disturb' }
];

const teamGrid = document.getElementById('teamGrid');
if (teamGrid) {
    teamMembers.forEach(member => {
        let dotColor = member.status === 'On Duty' || member.status === 'Available' ? 'var(--primary-color)' : (member.status === 'On Break' ? 'var(--warning-color)' : 'var(--danger-color)');
        let initials = member.name.split(' ').map(n => n[0]).join('');

        teamGrid.innerHTML += `
            <div class="profile-card">
                <div class="profile-avatar">${initials}</div>
                <h3 style="font-size: 1rem; margin-bottom: 0.25rem;">${member.name}</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${member.role}</p>
                <div style="font-size: 0.75rem; display: flex; align-items: center; justify-content: center; gap: 0.35rem; margin-bottom: 1.25rem;">
                    <span style="width: 8px; height: 8px; border-radius: 50%; background: ${dotColor};"></span>
                    ${member.status}
                </div>
                <button class="btn btn-outline" style="width: 100%; border-color: var(--border-color);" onclick="showToast('Messaging ${member.name}...', 'success')">
                    <i data-lucide="message-square" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 0.25rem;"></i> Send Message
                </button>
            </div>
        `;
    });
}

// 5. Route Optimization List
const routesData = [
    { id: 'Route Alpha: North CBD', driver: 'Ramesh', time: '06:00 AM - 02:00 PM', eff: '94%' },
    { id: 'Route Beta: Harbor District', driver: 'Suresh', time: '08:00 AM - 04:00 PM', eff: '88%' },
    { id: 'Route Gamma: West Res', driver: 'Prakash', time: '10:00 AM - 06:00 PM', eff: '91%' }
];

window.loadRouteDetails = (id, driver) => {
    showToast(`Loading optimal path for ${id}`, 'success');
    const detailView = document.getElementById('routeDetailView');
    if (detailView) {
        detailView.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; flex-direction: column; text-align: left;">
                <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">${id}</h3>
                <div style="flex: 1; min-height: 250px; background: var(--bg-surface); border: 2px dashed var(--border-color); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-secondary); margin-bottom: 1.5rem;">
                    <i data-lucide="map-pinned" style="width: 48px; height: 48px; opacity: 0.5; margin-bottom: 1rem;"></i>
                    <p>AI generated path preview loads here</p>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color);">
                    <div>
                        <p style="font-size: 0.85rem; color: var(--text-secondary);">Assigned Driver</p>
                        <p style="font-weight: 600;">${driver}</p>
                    </div>
                    <button class="btn green-card" style="border: none; background: var(--primary-color); color: white;" onclick="showToast('Route Dispatched to ${driver}', 'success')">Dispatch Route</button>
                </div>
            </div>
        `;
        setTimeout(() => lucide.createIcons(), 100);
    }
};

const routeList = document.getElementById('routeList');
if (routeList) {
    routesData.forEach(route => {
        routeList.innerHTML += `
            <div class="route-item" onclick="loadRouteDetails('${route.id}', '${route.driver}')">
                <div>
                    <h4>${route.id}</h4>
                    <p>Driver: ${route.driver} &bull; ${route.time}</p>
                </div>
                <div style="text-align: right;">
                    <span style="color: var(--primary-color); font-weight: 600; font-size: 0.9rem;">${route.eff}</span>
                    <p style="font-size: 0.7rem;">Efficiency</p>
                </div>
            </div>
        `;
    });
}

// Ensure icons in newly appended DOM elements are rendered
setTimeout(() => lucide.createIcons(), 500);
