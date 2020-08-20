const Host = "127.0.0.1" // host donde correra la aplicación de Front
const Port = 8092 // puerto donde correra la aplicación de Front
const ServerHost = "127.0.0.1" // host donde correra la aplicación de Back
const ServerPort = 8080 // puerto donde correra la aplicación de Back
const tg = 'http://'+ServerHost+':'+ServerPort

module.exports = { 
    devServer: {
        host: Host, // host donde correra la aplicación de Front
        port: Port, // puerto donde correra la aplicación de Front
        proxy: {    // configuracion para acceso a la aplicacion de back
            '/api': { // definicion de ruta base
                target: tg,    // ruta de acceso al servidor de back
                ws: true,
                changeOrigin: true,
            }
        },
    }
};

