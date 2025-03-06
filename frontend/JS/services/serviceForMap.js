import L from 'leaflet'

/**
 * IKKE RENAME (konflikt med leaflet.js)
 */

export const serviceForMap = {
  map: null,

  initMap() {

    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);


    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const accuracy = pos.coords.accuracy;
      const marker = L.marker([lat, lng]).addTo(this.map);
      const circle = L.circle([lat, lng], {radius: accuracy}).addTo(this.map);
      this.map.fitBounds(circle.getBounds());
    }

    const error = err => {
      if(err.code === 1) {
        alert("Vennligst tillat geolocation")
      } else {
        alert("Fant ikke posisjonen din")
      }
    }
    
    navigator.geolocation.watchPosition(success, error);
  }
};
