import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ReactLeafletKml from 'react-leaflet-kml';

interface MapProps {
  kmlFile: string;
}

export const Map: React.FC<MapProps> = () => {
  const [kml, setKml] = useState();
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log('Geolocation not supported');
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  function error() {
    console.log('Unable to retrieve your location');
  }

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/aviklai/react-leaflet-kml/master/src/assets/example1.kml',
    )
      .then((res) => res.text())
      .then((kmlText) => {
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, 'text/xml');
        setKml(kml);
      });
    handleLocationClick();
  }, [handleLocationClick]);

  return (
    <MapContainer
      style={{ height: '100%', width: '100%' }}
      zoom={10}
      center={[location.longitude, location.latitude]}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {kml && <ReactLeafletKml kml={kml} />}
    </MapContainer>
  );
};
