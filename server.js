const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;

//Conectar a mongodb
mongo.connect('mongodb://localhost:27017/mongochat', function(err, db) {
    if (err) {
        throw err;
    }

    console.log('!Base de datos conectada!');

    //Conectar el socket
    client.on('connect', function(socket) {
        let chat = db.collection('chats');

        //Función para conocer el estado
        sendStatus = function(s) {
            socket.emit('estado', s);
        }

        //Obtener chats de mongodb
        chat.find().limit(100).sort({ _id: 1 }).toArray(function(err, result) {
            if (err) {
                throw err;
            }
            socket.emit('output', res);
        });

        //Manejando eventos de entrada
        socket.on('entrada', function(data) {
            let name = data.name;
            let message = data.message;

            //Verificar nombre y mensajes
            if (name == '' || message == '') {
                //Enviar estado de error
                sendStatus('Ingresa un nombre y un mensaje');
            } else {
                //Insertar mensaje
                chat.insert({
                    name: name,
                    message: message
                }, function() {
                    client.emit('salida', [data]);

                    //Enviar estado del objeto
                    sendStatus({
                        message: 'Mensaje enviado',
                        clear: true
                    })
                });
            }
        });
        //Botón limpiar
        socket.on('clear', function(data) {
            //Eliminar chats
            chat.remove({}, function() {
                //Notificar que todo se elimino
                socket.emit('cleared');
            })
        });
    });
});