import React, { useEffect, useState } from 'react';
import {
  Circle,
  CircleMarker,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ReactLeafletKml from 'react-leaflet-kml';
import GoogleMapReact from 'google-map-react';
import MedianIncomeKml from './teste_vegetacao_geobee3.kml';

const GOOGLE_API_KEY = 'AIzaSyBw2ecTBOAXIqdmoATVtFhWxOvDCWIz-Qs';

interface MapProps {
  kmlFile: string;
}

export const Map: React.FC<MapProps> = () => {
  const [kml, setKml] = useState();
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [markers] = useState([
    { id: 1, latitude: -2.5142, longitude: -44.2515, title: 'Centro' },
    { id: 2, latitude: -2.5327, longitude: -44.3007, title: 'Renascença' },
    { id: 3, latitude: -2.4972, longitude: -44.2853, title: 'Cohama' },
    { id: 4, latitude: -2.5386, longitude: -44.3033, title: 'Calhau' },
    { id: 5, latitude: -2.5465, longitude: -44.2903, title: 'Ponta D Areia' },
    { id: 6, latitude: -2.529, longitude: -44.2817, title: 'São Raimundo' },
    {
      id: 7,
      latitude: -2.5806,
      longitude: -44.2336,
      title: 'Aeroporto',
    },
    { id: 8, latitude: -2.5388, longitude: -44.2561, title: 'Vinhas' },
    { id: 9, latitude: -2.5151, longitude: -44.2782, title: 'Monte Castelo' },
    { id: 10, latitude: -2.5377, longitude: -44.2989, title: 'Jaracati' },
  ]);

  const onSuccess = (position) => {
    setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
  };

  function error() {
    console.log('Unable to retrieve your location');
  }

  useEffect(() => {
    fetch(
      'https://gist.githubusercontent.com/mesquitadev/e65b39ef2f4108dc56fe7320f3733aea/raw/aa827c95312ee15cc57521fbb49e691bff61be2e/gistfile1.txt',
    )
      .then((res) => res.text())
      .then((kmlText) => {
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, 'text/xml');
        // console.log(kml);
        setKml(kml);
      });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, error);
    } else {
      console.log('Geolocation not supported');
    }
  }, [setKml, setLocation]);

  return (
    <MapContainer
      style={{ height: '100%', width: '100%' }}
      zoom={10}
      center={[location.latitude, location.longitude]}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker) => (
        <>
          <Circle
            key={marker.title}
            center={[location.latitude, location.longitude]}
            radius={2000}
          />
          <CircleMarker key={marker.id} center={[marker.latitude, marker.longitude]}>
            <Popup>
              {marker.title} <br /> {marker.latitude}, {marker.longitude}
            </Popup>
          </CircleMarker>
        </>
      ))}
      {kml && <ReactLeafletKml kml={kml} />}
    </MapContainer>

    // <GoogleMapReact
    //   style={{ width: '100vw', height: '100vh' }}
    //   bootstrapURLKeys={{
    //     key: GOOGLE_API_KEY,
    //     libraries: ['visualization'],
    //   }}
    //   defaultCenter={{
    //     lat: -2.5892112,
    //     lng: -44.2384228,
    //   }}
    //   defaultZoom={10}
    //   yesIWantToUseGoogleMapApiInternals
    //   onGoogleApiLoaded={({ map, maps }) => {
    //     //map.data.loadGeoJson(MedianIncomeGeoJSON);
    //     const kml = new maps.KmlLayer({
    //       url: 'https://gist.githubusercontent.com/mesquitadev/e65b39ef2f4108dc56fe7320f3733aea/raw/aa827c95312ee15cc57521fbb49e691bff61be2e/gistfile1.txt',
    //     });
    //     kml.setMap(map);
    //   }}
    // ></GoogleMapReact>
  );
};
