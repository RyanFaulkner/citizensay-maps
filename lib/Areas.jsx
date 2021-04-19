import React from "react";

import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import { useWindowDimensions } from 'meteor/citizensay:core';

import { useTracker } from "meteor/react-meteor-data";
import { Workflows } from "meteor/citizensay:workflows";

import { Helmet } from "react-helmet";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from 'react-bootstrap';

export const Areas = () => {
    const { t } = useTranslation("maps");

    const history = useHistory();

    const { height } = useWindowDimensions();

    const { workflows } = useTracker(() => {
        Meteor.subscribe("workflows");
        return {
            workflows: Workflows.find({
                location: {
                    $ne: null
                }
            },{
                $fields: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    location: 1
                }
            }).fetch()
        }
    });

    return (
        <>

            <Helmet>
                <title>{ t('tiles:map') } | CitizenSay</title>
                <link rel="stylesheet"
                      href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                      integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                      crossorigin=""
                />
            </Helmet>

            <h4>{ t("tiles:mapDesc") }</h4>

            <MapContainer
                center={[54.5260, 15.2551]}
                zoom={4}
                scrollWheelZoom={false}
                style={{height: height-200}}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    workflows.map(w =>
                        Array.isArray(w.location.latLng) &&
                            <Marker
                                key={w._id}
                                position={w.location.latLng}
                            >
                                <Popup>
                                    <strong>{ w.title }</strong>
                                    <p>{ w.description }</p>
                                    <Button onClick={() => history.push("/active/" + w._id)}>
                                        { t('participate') }
                                    </Button>
                                </Popup>
                            </Marker>
                    )
                }
            </MapContainer>

        </>
    );
};