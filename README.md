# EJECUTAR SERVIDORES NODE
### vista info `/info`
```
{
    "date": "13/2/2022 18:58:33",
    "arguments": [
        "1 => -m",
        "2 => CLUSTER"
    ],
    "argumentsYargs": {
        "mode": "CLUSTER",
        "env": "development",
        "port": 8080,
        "debug": false,
        "storage": "file",
        "$0": "src\\server.js",
        "otros": []
    },
    "folder": "E:\\20610-programación-backend-20210906T233257Z-001\\mi-nuevo-proyecto",
    "plataform": "win32",
    "pid": 15624,
    "node": "14.16.1",
    "title": "MINGW64:/e/20610-programación-backend-20210906T233257Z-001/mi-nuevo-proyecto",
    "path": "C:\\Program Files\\nodejs\\node.exe",
    "memoria": "155.392 MB rss",
    "cpus": 8
}
```
# Servidor nodemon 
### MODO FORK (DEFAULT)
### `nodemon -r esm ./src/server.js` 
```
Servidor corriendo en: http://localhost:8080, ENTORNO: development, STORAGE: file, PID WORKER 16300, MODO: FORK
```
### MODO CLUSTER
### `nodemon -r esm ./src/server.js -m CLUSTER` 
```
Cantidad de procesadores: 8
Servidor corriendo en: http://localhost:8080, ENTORNO: development, STORAGE: file, PID MASTER 18660, MODO: CLUSTER
Servidor corriendo en: http://localhost:8080, ENTORNO: development, STORAGE: file, PID WORKER 11204, MODO: CLUSTER
Servidor corriendo en: http://localhost:8080, ENTORNO: development, STORAGE: file, PID WORKER 10512, MODO: CLUSTER
Servidor corriendo en: http://localhost:8080, ENTORNO: development, STORAGE: file, PID WORKER 16268, MODO: CLUSTER
Servidor corriendo en: http://localhost:8080, ENTORNO: development, STORAGE: file, PID WORKER 4928, MODO: CLUSTER
Servidor corriendo en: http://localhost:8080, ENTORNO: development, STORAGE: file, PID WORKER 14680, MODO: CLUSTER
Servidor corriendo en: http://localhost:8080, ENTORNO: development, STORAGE: file, PID WORKER 19016, MODO: CLUSTER
Servidor corriendo en: http://localhost:8080, ENTORNO: development, STORAGE: file, PID WORKER 16560, MODO: CLUSTER
Servidor corriendo en: http://localhost:8080, ENTORNO: development, STORAGE: file, PID WORKER 2272, MODO: CLUSTER
```
## Número de procesos tomados por node
### `tasklist /fi "imagename eq node.exe"`
```
Nombre de imagen               PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe                     11228 Console                    1    26.628 KB
node.exe                     19720 Console                    1   112.980 KB
node.exe                      5752 Console                    1   112.660 KB
node.exe                      6764 Console                    1   111.580 KB
node.exe                      8700 Console                    1   112.352 KB
node.exe                     15852 Console                    1   112.188 KB
node.exe                     21728 Console                    1   112.980 KB
node.exe                     15832 Console                    1   111.048 KB
node.exe                     18644 Console                    1   111.628 KB
node.exe                     21120 Console                    1   110.640 KB
```

# Ejecutar servidor mediante Forever
### Intsalar FOREVER en forma global
`npm i -g forever`

### MODO FORK (DEFAULT)
### `forever start -c "node -r esm" ./src/server.js`
```
warn:    --minUptime not set. Defaulting to: 1000ms
warn:    --spinSleepTime not set. Your script will exit if it does not stay up for at least 1000ms
info:    Forever processing file: ./src/server.js
(node:16668) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:16668) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
```
```
$ forever list
(node:16552) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:16552) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
info:    Forever processes running
data:    uid       command       script          forever pid   id       logfile                    uptime
data:    [0] 5T_o  node -r esm   ...\server.js   8540          12368    ...\.forever\5T_o.log      0:0:4:35.613999999999976 
```

```
$ forever stopall
(node:16152) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:16152) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
info:    Forever stopped processes:
data:    uid        command       script          forever pid    id       logfile                   uptime
data:    [0] 5T_o   node -r esm   ...\server.js   8540           12368    ...\.forever\5T_o.log     0:0:11:48.495000000000005
```


### MODO CLUSTER
### `forever start -c "node -r esm" ./src/server.js -m CLUSTER` 
```
warn:    --minUptime not set. Defaulting to: 1000ms
warn:    --spinSleepTime not set. Your script will exit if it does not stay up for at least 1000ms
info:    Forever processing file: ./src/server.js
(node:18328) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:18328) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
```
```
$ forever list
(node:22136) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:22136) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
info:    Forever processes running
data:        uid  command     script                  forever pid   id       logfile                  uptime
data:    [0] kKtc node -r esm ..\server.js -m CLUSTER 16716         18420    ...\.forever\kKtc.log    0:0:1:44.986999999999995
```
## Número de procesos tomados por node
### `tasklist /fi "imagename eq node.exe"`
```
Nombre de imagen               PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe                     16716 Console                    1    31.504 KB
node.exe                     18420 Console                    1   112.876 KB
node.exe                     20428 Console                    1   112.784 KB
node.exe                     16392 Console                    1   112.456 KB
node.exe                     21764 Console                    1   112.252 KB
node.exe                     22008 Console                    1   111.828 KB
node.exe                     20136 Console                    1   111.720 KB
node.exe                      2784 Console                    1   112.624 KB
node.exe                     17768 Console                    1   115.480 KB
node.exe                      4448 Console                    1   113.348 KB
```
```
$ forever stop 18420
(node:3080) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:3080) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
info:    Forever stopped process:
    uid    command       script                    forever pid   id       logfile                  uptime
[0] kKtc   node -r esm   ...\server.js -m CLUSTER  16716         18420    ...\.forever\kKtc.log    0:0:19:56.19100000000003

```
```
$ forever list
(node:18780) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:18780) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
info:    No forever processes running
```

## Iniciar servidor modo watch
`forever start -w -c "node -r esm" ./src/server.js`
```
$ forever start -w -c "node -r esm" ./src/server.js
warn:    --minUptime not set. Defaulting to: 1000ms
warn:    --spinSleepTime not set. Your script will exit if it does not stay up for at least 1000ms
info:    Forever processing file: ./src/server.js
(node:16628) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:16628) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
```

```
$ forever list
(node:22448) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:22448) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
info:    Forever processes running
data:        uid  command     script                                                                             forever pid   id logfile                         uptime      
data:    [0] WikH node -r esm E:\20610-programación-backend-20210906T233257Z-001\mi-nuevo-proyecto\src\server.js 19504   22492    C:\Users\Juan\.forever\WikH.log 0:0:0:8.793
```

```
$ forever stopall
(node:22100) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:22100) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
info:    Forever stopped processes:
data:        uid  command     script                                                                             forever pid   id logfile                         uptime
data:    [0] WikH node -r esm E:\20610-programación-backend-20210906T233257Z-001\mi-nuevo-proyecto\src\server.js 19504   11576    C:\Users\Juan\.forever\WikH.log 0:0:0:45.773
```
# Ejecutar servidor mediante PM2
### Intsalar PM2 en forma global
`npm i -g pm2`

## Procesos por PM2 FORK
`pm2 start ./src/server.js`
```
$ pm2 start ./src/server.js
[PM2] Spawning PM2 daemon with pm2_home=C:\Users\Juan\.pm2
[PM2] PM2 Successfully daemonized
[PM2] Starting E:\20610-programación-backend-20210906T233257Z-001\mi-nuevo-proyecto\src\server.js in fork_mode (1 instance)
[PM2] Done.
┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ server    │ default     │ 1.0.0   │ fork    │ 5988     │ 0      │ 1    │ stopped   │ 0%       │ 0b       │ Juan     │ disabled │
└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

```
 `pm2 list`
 ```
 $ pm2 list
┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ server    │ default     │ 1.0.0   │ fork    │ 0        │ 0      │ 15   │ errored   │ 0%       │ 0b       │ Juan     │ disabled │
└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
 ```

## Procesos por SO
```
Nombre de imagen               PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe                      2868 Console                    1    33.740 KB
```

## Procesos por PM2 CLUSTER + WATCH
`pm2 start --name="cluster-dev"-w -i max ./src/server.js -m CLUSTER`




# Motores de plantillas
## Primera entrega Proyecto Final

### En el directorio del proyecto, ejecutar:

### `npm i`

### Enciendo el server

### `npm start` (nodemon)
### `node server.js`

# ENDPOINTS EJS


# ENDPOINTS EXPRESS
GET `'/'` -> endpoint Inicial

## API Productos 

GET `'/api/productos'` -> devuelve todos los productos.

GET `'/api/productos/:id'` -> devuelve un producto según su id.

POST `'/api/productos'` -> recibe y agrega un producto, y lo devuelve con su id asignado.

PUT `'/api/productos/:id'` -> recibe y actualiza un producto según su id.

DELETE `'/api/productos/:id'` -> elimina un producto según su id.
### EXTRA
GET `'/api/productosRandom'` -> Devuelve un producto al azar

GET `'/api/consulta?1clave=valor&2clave=valor'` -> devuelve la consulta.


## API Carrito

POST `'/api/carrito'` -> Crea un carrito y devuelve su id.

DELETE: `'/api/carrito/:id'` - Elimina un carrito por su id.

GET: `'/api/carrito/:id/productos'` - Me permite listar todos los productos guardados en el carrito.

POST: `'/api/carrito/:id/productos'` - Para incorporar productos al carrito por su id.

DELETE: `'/api/carrito/:id/productos/:id_prod'` - Eliminar un producto del carrito por su id de carrito y de producto.
### EXTRA
GET `'/api/carrito'` -> devuelve todos los carritos.

GET `'/api/carrito/:id'` -> devuelve un carritos según su id.

POST `'/api/carrito'` -> recibe y agrega un carrito, y lo devuelve con su id asignado.

PUT `'/api/carrito/:id'` -> recibe y actualiza un carrito según su id.

