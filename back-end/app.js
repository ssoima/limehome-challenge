const express = require("express");
const cors = require('cors');
const request = require('request');
var locations = require('./locations.json');
const app = express();
var bookings = [];

var GOOGLE_PLACES_API_KEY = "AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A";

app.use(cors());

//Returns the property around Lat/Lon
// Endpoint: properties?at=LAT,LONG
app.get("/properties", (req, res, next) => {
    query = "https://maps.googleapis.com/maps/api/place/nearbysearch/json" +
        "?location=" + req.query.at +
        "&radius=3000" +
        "&type=lodging" +
        "&key=" + GOOGLE_PLACES_API_KEY;

    request(query, { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        console.log(body.results);
        console.log (body.results.map(place => {
            return {
                id: place.id,
                name: place.name,
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
                rating: place.rating,
                photoUrl: ("https://maps.googleapis.com/maps/api/place/photo" +
                    "?photoreference=" + place.photos[0].photo_reference +
                    "&sensor=false&maxheight=2000&maxwidth=3000" +
                    "&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A")
            }
        }));
        res.json(
            body.results
                .filter(place => place.id != null
                    && place.name != null
                    && place.geometry.location.lat != null
                    && place.geometry.location.lng != null
                    && place.rating != null
                    && place.photos.length > 0)
                .map(place => {
                    return {
                        id: place.id,
                        name: place.name,
                        lat: place.geometry.location.lat,
                        lng: place.geometry.location.lng,
                        rating: place.rating,
                        photoUrl: ("https://maps.googleapis.com/maps/api/place/photo" +
                            "?photoreference=" + place.photos[0].photo_reference +
                            "&sensor=false&maxheight=2000&maxwidth=3000" +
                            "&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A")
                    }
                })
        );
    });
});

//Creates a booking for a property
app.post("/bookings", (req, res, next) => {
    bookings.push(req.body);
    res.json();
    //locations.push(
});

// Returns the bookings for a property
// Endpoint:
app.get("/properties/:property_id/bookings", (req, res, next) => {
    res.json(req.params.property_id);
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
