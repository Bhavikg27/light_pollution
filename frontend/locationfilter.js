document.addEventListener('DOMContentLoaded', function() {
    const locations = [
        "New York, NY, USA", "Los Angeles, CA, USA", "Chicago, IL, USA", "Houston, TX, USA", "Phoenix, AZ, USA",
"Philadelphia, PA, USA", "San Antonio, TX, USA", "San Diego, CA, USA", "Dallas, TX, USA", "San Jose, CA, USA",
"Austin, TX, USA", "Jacksonville, FL, USA", "Fort Worth, TX, USA", "Columbus, OH, USA", "Charlotte, NC, USA",
"San Francisco, CA, USA", "Indianapolis, IN, USA", "Seattle, WA, USA", "Denver, CO, USA", "Washington, D.C., USA",
"Boston, MA, USA", "El Paso, TX, USA", "Nashville, TN, USA", "Detroit, MI, USA", "Oklahoma City, OK, USA",
"Portland, OR, USA", "Las Vegas, NV, USA", "Memphis, TN, USA", "Louisville, KY, USA", "Baltimore, MD, USA",

"London, England, UK", "Edinburgh, Scotland, UK", "Manchester, England, UK", "Birmingham, England, UK", "Glasgow, Scotland, UK",
"Bristol, England, UK", "Liverpool, England, UK", "Sheffield, England, UK", "Leeds, England, UK", "Cardiff, Wales, UK",
"Belfast, Northern Ireland, UK", "Newcastle upon Tyne, England, UK", "Nottingham, England, UK", "Leicester, England, UK", "Brighton, England, UK",

"Toronto, Ontario, Canada", "Montreal, Quebec, Canada", "Vancouver, British Columbia, Canada", "Calgary, Alberta, Canada", "Edmonton, Alberta, Canada",
"Ottawa, Ontario, Canada", "Winnipeg, Manitoba, Canada", "Quebec City, Quebec, Canada", "Hamilton, Ontario, Canada", "Kitchener, Ontario, Canada",
"London, Ontario, Canada", "Victoria, British Columbia, Canada", "Halifax, Nova Scotia, Canada", "Oshawa, Ontario, Canada", "Windsor, Ontario, Canada",

"Sydney, NSW, Australia", "Melbourne, VIC, Australia", "Brisbane, QLD, Australia", "Perth, WA, Australia", "Adelaide, SA, Australia",
"Gold Coast, QLD, Australia", "Canberra, ACT, Australia", "Newcastle, NSW, Australia", "Wollongong, NSW, Australia", "Sunshine Coast, QLD, Australia",
"Hobart, TAS, Australia", "Geelong, VIC, Australia", "Townsville, QLD, Australia", "Cairns, QLD, Australia", "Darwin, NT, Australia",

"Agra, India", "Ahmedabad, India", "Aizawl, India", "Ajmer, India", "Aligarh, India",
"Allahabad, India", "Amravati, India", "Amritsar, India", "Aurangabad, India", "Bangalore, India",
"Baroda, India", "Bhopal, India", "Bhubaneswar, India", "Chandigarh, India", "Chennai, India",
"Coimbatore, India", "Cuttack, India", "Dehradun, India", "Delhi, India", "Dhanbad, India",
"Durgapur, India", "Faridabad, India", "Firozabad, India", "Ghaziabad, India", "Gorakhpur, India",
"Gurgaon, India", "Guwahati, India", "Gwalior, India", "Hyderabad, India", "Indore, India",
"Jabalpur, India", "Jaipur, India", "Jalandhar, India", "Jammu, India", "Jamnagar, India",
"Jamshedpur, India", "Jhansi, India", "Jodhpur, India", "Kannur, India", "Kanpur, India",
"Kochi, India", "Kolkata, India", "Kollam, India", "Kota, India", "Kozhikode, India",
"Ludhiana, India", "Lucknow, India", "Madurai, India", "Malappuram, India", "Mangalore, India",
"Meerut, India","Mohali, India", "Mumbai, India", "Mysore, India", "Nagpur, India", "Nashik, India",
"Navi Mumbai, India", "Noida, India", "Patna, India", "Pimpri-Chinchwad, India", "Pondicherry, India",
"Pune, India", "Raipur, India", "Rajkot, India", "Ranchi, India", "Rourkela, India",
"Salem, India", "Sangli, India", "Shimla, India", "Siliguri, India", "Srinagar, India",
"Surat, India", "Thane, India", "Thiruvananthapuram, India", "Thrissur, India", "Tiruchirappalli, India",
"Tirunelveli, India", "Tirupati, India", "Tirupur, India", "Udaipur, India", "Vadodara, India",
"Varanasi, India", "Vasai-Virar, India", "Vijayawada, India", "Visakhapatnam, India", "Warangal, India",


"Paris, France", "Marseille, France", "Lyon, France", "Toulouse, France", "Nice, France",
"Nantes, France", "Strasbourg, France", "Montpellier, France", "Bordeaux, France", "Lille, France",
"Rennes, France", "Reims, France", "Le Havre, France", "Saint-Étienne, France", "Toulon, France",

"Berlin, Germany", "Hamburg, Germany", "Munich, Germany", "Cologne, Germany", "Frankfurt, Germany",
"Stuttgart, Germany", "Düsseldorf, Germany", "Dortmund, Germany", "Essen, Germany", "Leipzig, Germany",
"Bremen, Germany", "Dresden, Germany", "Hannover, Germany", "Nuremberg, Germany", "Duisburg, Germany",

"Madrid, Spain", "Barcelona, Spain", "Valencia, Spain", "Seville, Spain", "Zaragoza, Spain",
"Málaga, Spain", "Murcia, Spain", "Palma, Spain", "Las Palmas, Spain", "Bilbao, Spain",
"Alicante, Spain", "Córdoba, Spain", "Valladolid, Spain", "Vigo, Spain", "Gijón, Spain",

"Rome, Italy", "Milan, Italy", "Naples, Italy", "Turin, Italy", "Palermo, Italy",
"Genoa, Italy", "Bologna, Italy", "Florence, Italy", "Bari, Italy", "Catania, Italy",
"Venice, Italy", "Verona, Italy", "Messina, Italy", "Padua, Italy", "Trieste, Italy"

        
    ];

    const locationInput = document.getElementById('location');
    const datalist = document.getElementById('locations');

    locationInput.addEventListener('input', function() {
        const inputValue = locationInput.value.toLowerCase();
        datalist.innerHTML = ''; // Clear existing options

        const filteredLocations = locations.filter(location =>
            location.toLowerCase().includes(inputValue)
        );

        filteredLocations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            datalist.appendChild(option);
        });
    });
});
