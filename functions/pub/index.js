const amqp = require('amqplib/callback_api');

exports.handle = function(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;
    amqp.connect('amqp://mwyloeey:gkucxbLGGSbOs_PMWv2hUAwm1sxFjqUi@crocodile.rmq.cloudamqp.com/mwyloeey', function (err, conn) {
        if (err) {
            callback(err);
        }
        conn.createChannel(function (err, ch) {
            if (err) {
                conn.close();
                callback(err);
            }
            try {
                var q = 'hello';
                var ex = 'logs';

                ch.assertExchange(ex, 'direct', {durable: false});
                ch.publish(ex, q, new Buffer('Hello World!'));
                setTimeout(function() {
                    conn.close();
                    callback(null, {message: 'Sent'});
                }, 500);
            } catch (error) {
                conn.close();
                callback(error);
            }
        })
    });
};