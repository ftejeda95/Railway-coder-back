# User Profile API

## Configuración

Primero debemos crear un archivo en la raiz proyecto con el nombre `.env` con el siguiente contenido
```
NODE_PORT=8080
NODE_ENV=local
MONGO_URL=paraSession
mongoDB=para mensajes
```
Acá estamos configurando una variable de entorno para nuestro proyecto, en este caso el puerto que usará el servidor.

## Ejecutar en producción


```sh
npm start
```

## Ejecutar en desarrollo con NODEMON


```sh
npm run dev:wait
```
Se encuentra archivo para ejecucion en POSTMAN.

## Entrega EJS
La ejecucion con el Motor de EJS es con PORT=8080 se ejecuta sobre el Home "/" y se cargan los productos en la ruta "/productos". Se elige el presente motor por ser a mi parecer el mas completo y mas usado pudiendo ejecutar con facilidad codigo JavaScript.


## Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
## NODEMON
FORK ✅ nodemon server.js -p 8081 -m fork
CLUSTER ✅ nodemon server.js -p 8082 -m cluster
## Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
## FOREVER
FORK ✅ forever -w start server.js -p 8081 -m fork
CLUSTER ✅ forever -w start server.js -p 8082 -m cluster

LISTAR - forever list
## Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo. Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.
DESDE CMD (en windows)
FORK ✅ pm2 start --name="instance-01" server.js --watch -- -p 8081
CLUSTER ✅  pm2 start --name="instance-02" server.js --watch -i max -- -p 8082

LISTAR - pm2 monit
## Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera: Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster. El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
Correr nginx.exe desde la carpeta NGINX adjunta.

pm2 start --name="i01" server.js -- -p 8081 -m cluster
pm2 start --name="i02" server.js -- -p 8080

FINALIZAR - pm2 delete all
