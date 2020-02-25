const express = require("express");
const cors = require('cors');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();
var bookings = [];

var GOOGLE_PLACES_API_KEY = "AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A";

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../front-end/dist/front-end'));


//Returns the property around Lat/Lon
// Endpoint: properties?at=LAT,LONG
app.get("/api/properties", (req, res, next) => {
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

// Used just for the demo, to get all bookings at once
app.get("/api/bookings", (req, res, next) => {
    return res.json(bookings);
});

//Creates a booking for a property
app.post("/api/bookings", (req, res, next) => {
    if (req.body.id != null && req.body.start != null && req.body.end != null) {
        let newBooking = { id: req.body.id, start: new Date(req.body.start), end: new Date(req.body.end)};
        for (const booking of bookings) {
            console.log(newBooking.id,newBooking.start, newBooking.end, booking.id, booking.start, booking.end, newBooking.id === booking.id,
                booking.start <= newBooking.start && newBooking.start < booking.end,
                booking.start < newBooking.end && newBooking.end <= booking.end,
                booking.start <= newBooking.start && newBooking.end <= booking.end
            );
            if ( newBooking.id === booking.id
                && ((booking.start <= newBooking.start && newBooking.start < booking.end)
                    || (booking.start < newBooking.end && newBooking.end <= booking.end)
                    || (booking.start <= newBooking.start && newBooking.end <= booking.end)
                    || (newBooking.start >= booking.end))
                ) {
                return res.status(403).json({response: "there is a conflict with another booking"});
            }
        }
        bookings.push(newBooking);
        console.log(bookings);
        res.json(req.body);
    }
    else { return res.status(400).json(); }
});

// Returns the bookings for a property
// Endpoint:
app.get("/api/properties/:property_id/bookings", (req, res, next) => {
    return res.json(bookings.filter(booking => booking.id === req.params.property_id));
});

app.get('/*', function(req,res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/../front-end/dist/front-end/index.html'));
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
