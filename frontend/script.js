mapboxgl.accessToken = 'pk.eyJ1IjoicGFydWwtMTEiLCJhIjoiY2x5aDZjZWx0MDBwOTJpcGFheTFkMXNkbSJ9.PtneVsJLynZreVsKlgsrUQ';

$(document).ready(function() {
    const defaultCoordinates = [76.785944, 30.767442]; // Longitude, Latitude
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: defaultCoordinates,
        zoom: 8
    });

    // Add a default marker to the map
    const marker = new mapboxgl.Marker()
        .setLngLat(defaultCoordinates)
        .addTo(map);
    $('#location-form').on('submit', function(event) {
        event.preventDefault();
        const location = $('#location').val();
        $('#visibility-percentage').text('Loading...');
        
        // Call backend API to get visibility percentage and coordinates
        $.ajax({
            url: '/api/visibility', // Call to backend API
            method: 'GET',
            data: { location },
            success: function(data) {
                if (data.coordinates) {
                    $('#visibility-percentage').text(`Visibility: ${data.visibility}%`);
                    $('#weather').text(`weather: ${data.weather} `);
                    $('#clouds').text(`Clouds: ${data.clouds}%`);
                    $('#wind-speed').text(`Wind Speed: ${data.windSpeed} m/s`);
                    const coordinates = data.coordinates; // Get coordinates from API response
                    updateMap(coordinates);
                } else {
                    showToast('Location not found. Please enter a valid location.');
                }
            },
            error: function() {
                showToast('Error fetching visibility data.');
            }
        });
    });

    function updateMap(coordinates) {
        // Update map view and marker position
        map.setCenter(coordinates);
        marker.setLngLat(coordinates);
    }
    function showToast(message) {
        const toastEl = document.getElementById('toast');
        const toastBody = toastEl.querySelector('.toast-body');
        toastBody.textContent = message;
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const numDots = 500; // Number of dots
    const dotSizes = [0.7, 1, 1.2]; // Array of different dot sizes in pixels
    const body = document.querySelector('body');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';

        // Randomly select a size from dotSizes array
        const size = dotSizes[Math.floor(Math.random() * dotSizes.length)];
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;

        // Random opacity between 0 and 1
        const opacity = Math.random() * 1;
        dot.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;

        dot.style.position = 'absolute';
        dot.style.top = `${Math.random() * 40}%`; // Random top position
        dot.style.left = `${Math.random() * 100}%`; // Random left position
        dot.style.borderRadius = '50%'; // Make it round

        fragment.appendChild(dot);
    }

    body.appendChild(fragment);
});

// Change nav button based on login status
document.addEventListener('DOMContentLoaded', function() {
    const navButton = document.getElementById('nav-button');
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    
    if (token) {
        navButton.innerHTML = `<img src="user_icon.png" alt="profile" style="width: 24px; height: 24px;">`;
        navButton.href = 'profile.html';
    } else {
        navButton.innerText = 'Log-in';
        navButton.href = 'login.html';
    }
});

// Toggle legend box
document.getElementById('legend-button').addEventListener('click', function() {
    const legendBox = document.getElementById('legend-box');
    if (legendBox.style.display === 'none' || legendBox.style.display === '') {
        legendBox.style.display = 'block';
    } else {
        legendBox.style.display = 'none';
    }
});