const got = require('got');
const geolib = require('geolib');
const delaySeconds = 3;
const url = 'http://api.open-notify.org/iss-now.json';
const myPosition = { latitude: 43.038902, longitude: -87.906474 };
function loop() {
  got(url, { json: true })
    .then(iss => {
      const position = iss.body.iss_position;
      const distanceFromIss = geolib.getDistance(myPosition, position);
      const distanceFromIssMiles = geolib.convertUnit(
    'mi', distanceFromIss, 2);
      console.log(`${distanceFromIssMiles} miles`);
    })
    .catch(error => {
      console.log(error.response.body);
    });
  setTimeout(loop, delaySeconds * 1000);
}
loop();
