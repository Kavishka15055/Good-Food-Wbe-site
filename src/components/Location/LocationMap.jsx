import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Restaurant configuration
export const restaurantConfig = {
  coordinates: {
    lat: 6.708552,  // Your latitude
    lng: 80.787876   // Your longitude
  },
  address: "#110, Y junction, Belihuloya, Sri Lanka",
  phone: "+94 764325789", // Changed to Sri Lanka format
  hours: "8:00 AM - 10:00 PM",
  zoomLevel: 15
};

const LocationMap = () => {
  const restaurantPosition = [restaurantConfig.coordinates.lat, restaurantConfig.coordinates.lng];

  // Custom restaurant icon
  const restaurantIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <div id="location" className="w-full pt-16 bg-gray-50 relative z-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Visit Our Restaurant
          </h2>
          <p data-aos="fade-up" data-aos-delay="200" className="text-lg text-gray-600 max-w-2xl mx-auto">
            Come and experience the taste of fresh, healthy food at our location in beautiful Belihuloya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Map Section */}
          <div 
            data-aos="fade-right" 
            className="h-[400px] lg:h-[650px] rounded-2xl overflow-hidden shadow-2xl relative z-0"
          >
            <MapContainer
              center={restaurantPosition}
              zoom={restaurantConfig.zoomLevel}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
              className="relative z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={restaurantPosition} icon={restaurantIcon}>
                <Popup className="relative z-0">
                  <div className="text-center">
                    <h3 className="font-bold text-primary text-lg">Good Food Restaurant</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {restaurantConfig.address}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      🕒 Open: {restaurantConfig.hours}
                    </p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Location Details Section */}
          <div data-aos="fade-left" data-aos-delay="300" className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-primary mb-4">Our Location</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-lg">📍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark">Address</h4>
                    <p className="text-gray-600">
                      {restaurantConfig.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-lg">🕒</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark">Opening Hours</h4>
                    <p className="text-gray-600">
                      Monday - Sunday: {restaurantConfig.hours}<br />
                      <span className="text-sm text-green-600">Open 7 days a week</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-lg">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark">Contact Info</h4>
                    <p className="text-gray-600">
                      Phone: {restaurantConfig.phone}<br />
                      Email: info@goodfood.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <a 
                  href={`https://maps.google.com/?q=${restaurantConfig.coordinates.lat},${restaurantConfig.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-primary text-white text-center py-3 px-4 rounded-lg hover:bg-primary/90 transition duration-200 font-semibold"
                >
                  Get Directions
                </a>
                <a 
                  href={`tel:${restaurantConfig.phone}`}
                  className="flex-1 border border-primary text-primary text-center py-3 px-4 rounded-lg hover:bg-primary hover:text-white transition duration-200 font-semibold"
                >
                  Call Now
                </a>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-gradient-to-r from-primary to-primaryDark text-white p-6 rounded-2xl">
              <h4 className="font-bold text-lg mb-3">Why Visit Our Restaurant?</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span>✅</span> Fresh ingredients from local farms
                </li>
                <li className="flex items-center gap-2">
                  <span>✅</span> Breathtaking mountain views
                </li>
                <li className="flex items-center gap-2">
                  <span>✅</span> Cozy and hygienic dining environment
                </li>
                <li className="flex items-center gap-2">
                  <span>✅</span> Family-friendly atmosphere
                </li>
                <li className="flex items-center gap-2">
                  <span>✅</span> Outdoor seating available
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;