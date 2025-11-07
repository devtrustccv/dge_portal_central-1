"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type MapSectionProps = {
    locations: string[];
    names: string[];
    height?: string;
    width?: string;
};

const customIcon = new L.Icon({
    iconUrl: "/marker-icon-2x-blue.png",
    iconSize: [24, 24],
    iconAnchor: [16, 32],
    popupAnchor: [0, -82],
});

const MapaEntidades: React.FC<MapSectionProps> = ({
  locations,
  names,
  height = "100%",
  width = "100%",
}) => {
    const validLocations = locations
        ?.filter((loc) => typeof loc === "string" && loc.includes(","))
        .map((loc) => loc.split(",").map(Number) as [number, number]);

    const bounds = validLocations.length > 0 ? new L.LatLngBounds(validLocations) : undefined;
    const center: [number, number] = validLocations.length > 0
        ? validLocations[0] as [number, number]
        : [16.0022, -24.0132];


    return (
        <section style={{ height, width }}>
            <MapContainer
                className="rounded-2xl w-full"
                bounds={bounds}
                center={center}
                zoom={7}
                style={{ height: "100%", width: "100%", zIndex: 0 }}
            >
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                />
                {validLocations.map(([lat, lng], index) => (
                    <Marker key={index} position={[lat, lng]} icon={customIcon}>
                        <Popup>{names[index]}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </section>
    );
};

export default MapaEntidades;
