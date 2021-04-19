import { i18n, library, addRoute } from "meteor/citizensay:core";
import { addField } from "meteor/citizensay:workflows";

import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { Areas } from "./lib/Areas";
import { Location } from "./lib/workflows/create/Location";

i18n.addResource("en", "groups", "learn", "Learn")
    .addResources("en", "tiles", {
        map: "Map",
        mapDesc: "Map of consultations"
    })
    .addResources("en", "editors", {
        location: "Assign workflow to a location",
        locationHelp: "Please provide a location for your workflow"
    });

library.add(
    faMapPin
);

addRoute({
    path: "/map",
    component: Areas
});

addField("basic", Location);
