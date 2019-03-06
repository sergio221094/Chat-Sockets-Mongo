// =======================
// Puerto
// =======================

process.env.PORT = process.env.PORT || 4000;

// ============================
//  Entorno
// ============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// =======================
// Base de datos
// =======================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/mongochat';
} else {
    urlDB = 'mongodb+srv://sergio941022:<weWepieSMlu9Fm20>@cluster0-msopc.mongodb.net/test?retryWrites=true';
}
process.env.URLDB = urlDB;