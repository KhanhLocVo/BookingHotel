import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

export default function mapbox() {
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 16
    });
  return (
    <ReactMapGL 
        {...viewport} 
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => setViewport(viewport)}
        mapboxAccessToken="pk.eyJ1Ijoidm9raGFuaGxvYyIsImEiOiJjbGZtY21zcTMwMHRlM3dwNXZucm52MDJtIn0.Ll-k8O7RLJwNvU4DKn69eA">
    </ReactMapGL>
  )
}
