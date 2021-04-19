import { Groups, Tiles } from "meteor/citizensay:core";

Meteor.startup(() => {

    const group = "learn",
          _id = "map";

    if (!Groups.findOne(group))
        Groups.insert({_id: group});

    if (!Tiles.findOne(_id))
       Tiles.insert({
           _id,
           group,
           icon: "map-pin",
           color: "rgb(21,164,161)",
           size: "xlarge"
       });

});