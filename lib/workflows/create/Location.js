import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import { Helmet } from "react-helmet";
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "leaflet-geosearch/dist/geosearch.css";
import "../../maps.css";


export const Location = ({ workflow }) => {
    const { t } = useTranslation("editors");
    return (
        <>
            <br/>
            <Form.Group>
                <Form.Label>{ t("location") }</Form.Label>
                <div style={{float: "right"}}>
                    <span>{ workflow.location ? workflow.location.name : t("none") }</span>
                    <MapModal
                        id={workflow._id}
                        location={workflow.location}
                    />
                </div>
                <Form.Text>{ t("locationHelp") }</Form.Text>
            </Form.Group>
        </>
    );
};

const MapModal = ({ id, location }) => {
    const { t } = useTranslation("editors");
    const [ show, setShow ] = useState(false);
    return (
        <>
            <Helmet>
                <link rel="stylesheet"
                      href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                      integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                      crossorigin=""
                />
            </Helmet>
            <Button variant="link" onClick={() => setShow(true)}>
                <FontAwesomeIcon icon="map-pin"/>
            </Button>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{ t("location") }</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <MapContainer
                        center={location ? location.latLng : [50.3785, 14.9706]}
                        zoom={4}
                        style={{height: "80vh"}}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Search id={id}/>
                        {
                            location &&
                                <Marker
                                    position={location.latLng}
                                    draggable={true}
                                    eventHandlers={{
                                        dragend: e => {
                                            const { lat, lng } = e.target.getLatLng();
                                            Meteor.call("workflows.update", id, {"location.latLng": [lat, lng]});
                                        }
                                    }}
                                >
                                    <Popup>{ t("workflowLocation") }</Popup>
                                </Marker>
                        }
                    </MapContainer>
                </Modal.Body>
            </Modal>
        </>
    );
};

const Search = ({ id }) => {
    const map = useMap();
    useEffect(() => {
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
            provider,
            showMarker: false,
            retainZoomLevel: true
        });
        map.addControl(searchControl);
        map.on('geosearch/showlocation', e => Meteor.call("workflows.update", id, {
            location: {
                name: e.location.label,
                latLng: [e.location.y, e.location.x]
            }}));
        return () => map.removeControl(searchControl);
    }, []);
    return null;
};