const admin = require('firebase-admin');

const serviceAccount =
    {
        "project_id": "earthack2017",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDnQ5vDbaSv/pE8\n6CrgDrIF5O6chTcrY+4P7a+BB2zmICJ1yU85pl0a7Mnj8Thvm+gTllSpCmyn9j4T\n8gRvr52P5eWTYVdSnAEU3sO1ecCEPW2aMFhBybtdKrnbllRPdsfjlGDwLBPc01n+\nw3sg5G2InHwGAOGZ55CDDQhP2sVC4r45fBVD1ahaOL4xmYEP2WhknTBAlgjw/KOT\n1VFIhDjwFHCk0OSjifIsm8d/BSO+Saa6dT4QTBn3kegadjAg9bmZP8HnAsenLMT8\nlWM7xNuexacu5lo6KL9wN1I6RED0iY0E/uz8WzoV9daGHNk+2KGxV5meaibxdUiZ\n0O+HkxvrAgMBAAECggEACGJjG0q2Vcsc6OBh7Y2a1qveGr6ZqXEOCHXNjxf90roH\nhc2umaB2b6t2BlWQfjtgxpUErLw8BDrhNUfo8UOkqrri/9zflZciUudgoQuw9xpj\nBtwJ1xjBOjd6VYO1usvLo2yVtx9h+PeQo7PimuatMe66cF1H0JScoKOwUXTVAf+0\n0ReUskYHGM0qGIHFHb5MEwUPF6a1M1NSWfMW6DvdD3ZHxWkaoN7uaL9b3vFOYfAU\n5BwHp+Buz55DxJockNtSkU+DsDQslHIwAeyZ4raET7/6C1vEwE9nDZIvQ2eYHdKS\nJ9vrHF20nYscWXepf9fBl+nUlAwti+51AFE1X6xVwQKBgQD1M6+G4b3Bh8HTp7iB\nSY37Zms/qufCBJa9b/OT8vcSMYUBcK8ChnV4qzGOU/3KMW4kMWDTUlVfH7RXVGkZ\nHN/jr9iooCPa/U4o5m3p2qXQi/LqZkHAFkikDvqj4ar+o27NdlHhfEg36mj8Q8d9\nr6gugS3mx/g/PKIkZNwQztKnpQKBgQDxcssSD+oSC8GYCsFc6v2ndr8SjikDeNcQ\nq3vv1NJmK6sZeP6J+0u3mcpDscwpyxVjDbik7xXmzBz8NXi1S6OwWTt2Zep59P4F\nqendcJfSXxMwyb2WQLv5OlDY123IMqWGaBh4E2FXJ0UbRjYB+DZUMYSU5eDs3cRj\nQvDPHI3gTwKBgHZRonlrpK0mXRlM7XM1kxWkrkvipEKzBCoVQ2w46ZAV5SB0x35o\nc3bu5NLRJL3UbFl6mkZejGOCYPti9/PuQvsTd3CnFaYuZPDHgHI/15NydJ03CrMu\nDY9cywUZd/G321e5qHkuB4szycUwz6qOgJEwNH4QMHITSApXwPk7U9shAoGBAMH9\nOBkP/kF3fpiY85ijGR9mccgHvf4TJcA390DPHiiGp1a09tWHuOMPxgmznVRq3YkT\nKioiCdfAYP1mPNB0sFRsrTDIW6aW501HoiWPY/va9YE6ZX+GDUEF0JUYKRUzU/h0\nREydTZUHcSejtprIgWYNzvcO5zOITlRuISpWR8tTAoGBAMN6yVR61hOd/1IVSK7e\ni6zxrwQZPulmfz9JN7Yj3Mn+mAjnfCeJZKF/nCHPl9BzzYfupKGC3ONpbvnoOOtT\nKQpjWvIS5fvUTXklng8GleqI673Vu+vuBXMkTvQ9K+sXwaaGFQmEhtxlp3dtZi2N\ngvo1T9E+AkXUYTZfb4GjEdQY\n-----END PRIVATE KEY-----\n",
        "client_email": "earthack2017@appspot.gserviceaccount.com"
    };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://earthack2017.firebaseio.com'
});

const db = admin.database();
const ref = db.ref('/');
const sensorRef = ref.child('accelerometer');

exports.handle = function(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  var newSensorRef = sensorRef.push();
  newSensorRef.set({
      x: event.x,
      y: event.y,
      z: event.z
  }, function(error) {
    if (error) {
        callback(error);
    } else {
        callback(null, { message: 'success' });
    }
  });
};
