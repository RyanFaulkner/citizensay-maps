import L from 'leaflet';

export const LeafletMarkerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    /*
     iconSize: [],
     shadowSize: [],
     iconAnchor: [],
     shadowAnchor: [],
     popupAnchor: []
    */
});

export const MarkerIcon = L.icon({
    iconUrl: '/packages/citizensay_maps/lib/icons/marker.png',
    iconSize: [18.8, 25.6]
});

export const Bench = L.icon({
    iconUrl: '/packages/citizensay_maps/lib/icons/bench.png'
});

export const Tree = L.icon({
    iconUrl: '/packages/citizensay_maps/lib/icons/tree.png'
});

export const N4C = L.icon({
    iconUrl: '/packages/citizensay_maps/lib/icons/n4c.png'
});