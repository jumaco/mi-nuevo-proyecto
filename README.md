# LOGGERS Y GZIP

### Ruta /api/random con y sin compression

### `npm i compression`

`'/api/randoms'`

```
randoms	200	document	Otros	12.6 kB	4.43 s

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 12401
ETag: W/"3071-IpmvqrJ8nGR/Xm7Y3DKulkxTy7M"
Date: Mon, 28 Feb 2022 00:00:37 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

`'/api/randomsGzip'`
```
randomsGzip	200	document	Otros	4.7 kB	4.63 s

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
ETag: W/"3088-3zuSa9DMYyTuHoU1maiAQbC9YfA"
Vary: Accept-Encoding
Content-Encoding: gzip
Date: Mon, 28 Feb 2022 00:00:28 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked
```

## LOGGER WINSTON 
`npm i winston`

## ARTILLERY
### `npm i -g artillery` (global)
<br>

### Ejecutamos el Servidor en modo profiler
### ``node --prof ./src/server.js``
<br>

### En otro terminal ejecutamos ARTILLERY
#### *para la ruta '/info' comentamos en el codigo la linea bloqueante 'console.log(info)'
`artillery quick --count 50 -n 20 http://localhost:8080/info > result_info_NoBloq.txt`


```javascript
router.get('/', (req, res) => {
	logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: response success`);
	
    ...
    ...

	// console.log(info)

	res.json(info)
})
```
### REALIZAMOS EL PROFILING
``node --prof-process NoBloq-v8.log > result_prof-nobloq.txt``
```
Statistical profiling result from NoBloq-v8.log, (2309 ticks, 0 unaccounted, 0 excluded).

 [Shared libraries]:
   ticks  total  nonlib   name
   2107   91.3%          C:\Windows\SYSTEM32\ntdll.dll
    196    8.5%          C:\Program Files\nodejs\node.exe
      1    0.0%          C:\Windows\System32\KERNEL32.DLL

 [JavaScript]:
   ticks  total  nonlib   name
      1    0.0%   20.0%  LazyCompile: *stat internal/modules/cjs/loader.js:132:14
      1    0.0%   20.0%  LazyCompile: *resolve path.js:130:10
      1    0.0%   20.0%  LazyCompile: *normalizeString path.js:52:25
      1    0.0%   20.0%  LazyCompile: *nextPart fs.js:1635:31
      1    0.0%   20.0%  LazyCompile: *dirname path.js:582:10

 [C++]:
   ticks  total  nonlib   name

 [Summary]:
   ticks  total  nonlib   name
      5    0.2%  100.0%  JavaScript
      0    0.0%    0.0%  C++
      9    0.4%  180.0%  GC
   2304   99.8%          Shared libraries

 [C++ entry points]:
   ticks    cpp   total   name
```


#### *para la ruta '/info' DEScomentamos en el codigo la linea bloqueante 'console.log(info)'
`artillery quick --count 50 -n 20 http://localhost:8080/info > result_info_Bloq.txt`
```javascript
router.get('/', (req, res) => {
	logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: response success`);
	
    ...
    ...

	console.log(info)

	res.json(info)
})
```
### REALIZAMOS EL PROFILING
``node --prof-process Bloq-v8.log > result_prof-bloq.txt``
```
Statistical profiling result from Bloq-v8.log, (1853 ticks, 0 unaccounted, 0 excluded).

 [Shared libraries]:
   ticks  total  nonlib   name
   1444   77.9%          C:\Windows\SYSTEM32\ntdll.dll
    401   21.6%          C:\Program Files\nodejs\node.exe
      1    0.1%          C:\Windows\System32\KERNELBASE.dll
      1    0.1%          C:\Windows\System32\KERNEL32.DLL

 [JavaScript]:
   ticks  total  nonlib   name
      3    0.2%   50.0%  LazyCompile: *resolve path.js:130:10
      1    0.1%   16.7%  LazyCompile: *processTicksAndRejections internal/process/task_queues.js:65:35
      1    0.1%   16.7%  LazyCompile: *dirname path.js:582:10
      1    0.1%   16.7%  LazyCompile: *<anonymous> E:\20610-programaci├│n-backend-20210906T233257Z-001\mi-nuevo-proyecto\node_modules\yargs-parser\build\index.cjs:696:48

 [C++]:
   ticks  total  nonlib   name

 [Summary]:
   ticks  total  nonlib   name
      6    0.3%  100.0%  JavaScript
      0    0.0%    0.0%  C++
     12    0.6%  200.0%  GC
   1847   99.7%          Shared libraries

 [C++ entry points]:
   ticks    cpp   total   name
```

# AUTOCANNON Y 0X


<br>

# EJECUTAR SERVIDORES NODE
### Vista info GET `/info`
<br>

```json
{
    "date": "18/2/2022 19:13:59",
    "arguments": [
        "1 => -p",
        "2 => 8080",
        "3 => -m",
        "4 => FORK"
    ],
    "argumentsYargs": {
        "port": 8080,
        "mode": "FORK",
        "env": "development",
        "debug": false,
        "storage": "file",
        "$0": "C:\\Users\\Juan\\AppData\\Roaming\\npm\\node_modules\\pm2\\lib\\ProcessContainerFork.js",
        "otros": []
    },
    "folder": "E:\\20610-programación-backend-20210906T233257Z-001\\mi-nuevo-proyecto",
    "plataform": "win32",
    "pid": 7452,
    "node": "14.16.1",
    "title": "node",
    "path": "C:\\Program Files\\nodejs\\node.exe",
    "memoria": "70.58 MB rss",
    "cpus": 8
}
```
# Servidor + nodemon 
### MODO FORK p8080 <span style="color:orange">(DEFAULT)</span>
### `nodemon -r esm ./src/server.js` 
```
Servidor corriendo en: http://localhost:8080, ENTORNO: development, STORAGE: file, PID WORKER 16300, MODO: FORK
```
### MODO <span style="color:Aquamarine">CLUSTER</span> p8080
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
***
<br>

# Ejecutar servidor mediante <span style="color:Aquamarine">FOREVER</span>
___
### Instalar FOREVER en forma global
`npm i -g forever`
## MODO <span style="color:Aquamarine">FORK</span> p8080 (<span style="color:orange">DEFAULT</span>)
### `forever start ./src/server.js`
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


## MODO <span style="color:Aquamarine">CLUSTER</span> (p8080)
### `forever start ./src/server.js -m CLUSTER` 
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
___
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

# Iniciar servidor modo <span style="color:Aquamarine">WATCH</span> (p8080, FORK)
`forever start -w ./src/server.js`
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
********************************
<br>

# Ejecutar servidor mediante <span style="color:Aquamarine">PM2</span>
### Intsalar PM2 en forma global
`npm i -g pm2`

## Procesos por PM2 FORK p8080 <span style="color:orange">(Default))</span>
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
│ 0   │ server    │ default     │ 1.0.0   │ fork    │ 11748    │ 0s     │ 0    │ online    │ 0%       │ 39.1mb   │ Juan     │ disabled │
└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

```
 `pm2 list`
 ```
$ pm2 list
┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ server    │ default     │ 1.0.0   │ fork    │ 11748    │ 33s    │ 0    │ online    │ 0%       │ 64.9mb   │ Juan     │ disabled │
└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
 ```

### Procesos por SO
```
Nombre de imagen               PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe                     10928 Console                    1    33.328 KB
node.exe                     11748 Console                    1    66.332 KB
PS E:\20610-programación-backend-20210906T233257Z-001\mi-nuevo-proyecto> 
```
```
$ pm2 stop default
[PM2] Applying action stopProcessId on app [default](ids: [ 0 ])
[PM2] [server](0) ✓
┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ server    │ default     │ 1.0.0   │ fork    │ 0        │ 0      │ 0    │ stopped   │ 0%       │ 0b       │ Juan     │ disabled │
└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

$ pm2 delete default
[PM2] Applying action deleteProcessId on app [default](ids: [ 0 ])
[PM2] [server](0) ✓
┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

___
## Procesos por PM2 <span style="color:Aquamarine">NAME</span> + <span style="color:Aquamarine">CLUSTER</span> + <span style="color:Aquamarine">WATCH</span> p8080
___
`pm2 start --name="cluster-dev" -w -i max ./src/server.js`

```
$ pm2 start --name="cluster-dev" --watch -i max ./src/server.js
[PM2] Starting E:\20610-programación-backend-20210906T233257Z-001\mi-nuevo-proyecto\src\server.js in cluster_mode (0 instance)
[PM2] Done.
┌─────┬────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name           │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ cluster-dev    │ default     │ 1.0.0   │ cluster │ 17052    │ 6s     │ 0    │ online    │ 40.6%    │ 98.3mb   │ Juan     │ enabled  │
│ 1   │ cluster-dev    │ default     │ 1.0.0   │ cluster │ 16736    │ 6s     │ 0    │ online    │ 70.4%    │ 97.9mb   │ Juan     │ enabled  │
│ 2   │ cluster-dev    │ default     │ 1.0.0   │ cluster │ 16156    │ 5s     │ 0    │ online    │ 82.8%    │ 96.1mb   │ Juan     │ enabled  │
│ 3   │ cluster-dev    │ default     │ 1.0.0   │ cluster │ 8364     │ 5s     │ 0    │ online    │ 82.8%    │ 95.7mb   │ Juan     │ enabled  │
│ 4   │ cluster-dev    │ default     │ 1.0.0   │ cluster │ 11840    │ 4s     │ 0    │ online    │ 78.1%    │ 94.9mb   │ Juan     │ enabled  │
│ 5   │ cluster-dev    │ default     │ 1.0.0   │ cluster │ 2480     │ 4s     │ 0    │ online    │ 79.8%    │ 89.8mb   │ Juan     │ enabled  │
│ 6   │ cluster-dev    │ default     │ 1.0.0   │ cluster │ 16748    │ 4s     │ 0    │ online    │ 79.7%    │ 86.6mb   │ Juan     │ enabled  │
│ 7   │ cluster-dev    │ default     │ 1.0.0   │ cluster │ 5652     │ 3s     │ 0    │ online    │ 78.2%    │ 72.1mb   │ Juan     │ enabled  │
└─────┴────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

```
## Número de procesos tomados por node
___
### `tasklist /fi "imagename eq node.exe"`
```
Nombre de imagen               PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe                     10928 Console                    1    46.692 KB
node.exe                      6236 Console                    1    51.532 KB
node.exe                     17548 Console                    1    67.228 KB
node.exe                      9908 Console                    1    67.492 KB
node.exe                      2192 Console                    1    67.724 KB
node.exe                      8920 Console                    1    66.828 KB
node.exe                     15888 Console                    1    67.108 KB
node.exe                     17172 Console                    1    68.624 KB
node.exe                     16872 Console                    1    67.156 KB
node.exe                     16724 Console                    1    67.788 KB
```

<br>

# <span style="color:Aquamarine">NGINX</span>

### Inicio NGINX
``./enginex.exe``
### Redirijo las req hacia /api/randoms > port 8081
#### path "./enginx1.221.6/conf/nginx.config"
```nginx
    http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    # upstream balance_app {
    #     # server 127.0.0.1:8081;
    #     # server 127.0.0.1:8082 weight=3;
    #     server 127.0.0.1:8082;
    #     server 127.0.0.1:8083;
    #     server 127.0.0.1:8084;
    #     server 127.0.0.1:8085;
    # }

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        # location / {
        #     root   html;
        #     index  index.html index.htm;
        # }

        location / {
            proxy_pass http://localhost:8080;
        }

        location /api/randoms {
            proxy_pass http://localhost:8081;
            # proxy_pass http://balance_app;
        }
```
## Ejecuto servidor <span style="color:Aquamarine">CLUSTER NATIVO</span> 

### Todas las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080 FORK
``pm2 start ./src/server.js --name="forkNode" -- -p 8080 -m FORK``
```
$ pm2 start ./src/server.js --name="forkNode" -- -p 8080 -m FORK
[PM2] Starting E:\20610-programación-backend-20210906T233257Z-001\mi-nuevo-proyecto\src\server.js in fork_mode (1 instance)
[PM2] Done.
┌─────┬─────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name        │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼─────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ forkNode    │ default     │ 1.0.0   │ fork    │ 7452     │ 0s     │ 0    │ online    │ 0%       │ 38.6mb   │ Juan     │ disabled │
└─────┴─────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

----------------------------------------------------------------
### Las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081

``pm2 start ./src/server.js --name="clusterNode" -- -p 8081 -m CLUSTER``
```
$ pm2 start ./src/server.js --name="clusterNode" -- -p 8081 -m CLUSTER
[PM2] Starting E:\20610-programación-backend-20210906T233257Z-001\mi-nuevo-proyecto\src\server.js in fork_mode (1 instance)
[PM2] Done.
┌─────┬────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name           │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 1   │ clusterNode    │ default     │ 1.0.0   │ fork    │ 10308    │ 0s     │ 0    │ online    │ 0%       │ 40.7mb   │ Juan     │ disabled │
│ 0   │ forkNode       │ default     │ 1.0.0   │ fork    │ 7452     │ 61s    │ 0    │ online    │ 0%       │ 64.0mb   │ Juan     │ disabled │
└─────┴────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```


## <span style="color:Aquamarine">BALANCEADOR</span> NGINX
``./enginex.exe``
### Redirijo las req hacia /api/randoms equitativamente a los puertos 8082, 8083, 8084, 8085
#### path "./enginx1.221.6/conf/nginx.config"
```nginx
    http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    upstream balance_app {
        # server 127.0.0.1:8081;
        # server 127.0.0.1:8082 weight=3;
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
        server 127.0.0.1:8084;
        server 127.0.0.1:8085;
    }

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        # location / {
        #     root   html;
        #     index  index.html index.htm;
        # }

        location / {
            proxy_pass http://localhost:8080;
        }

        location /api/randoms {
            # proxy_pass http://localhost:8081;
            proxy_pass http://balance_app;
        }
```
## Ejecuto nuevas instancias de servidor FORK en nuevos puertos

``pm2 start ./src/server.js --name="forkNode2" -- -p 8082 -m FORK``

``pm2 start ./src/server.js --name="forkNode3" -- -p 8083 -m FORK``

``pm2 start ./src/server.js --name="forkNode4" -- -p 8084 -m FORK``

``pm2 start ./src/server.js --name="forkNode5" -- -p 8085 -m FORK``

```
$ pm2 ls
┌─────┬────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name           │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 1   │ clusterNode    │ default     │ 1.0.0   │ fork    │ 10308    │ 40m    │ 0    │ online    │ 0%       │ 68.8mb   │ Juan     │ disabled │
│ 0   │ forkNode       │ default     │ 1.0.0   │ fork    │ 7452     │ 41m    │ 0    │ online    │ 0%       │ 72.9mb   │ Juan     │ disabled │
│ 2   │ forkNode2      │ default     │ 1.0.0   │ fork    │ 1948     │ 13m    │ 0    │ online    │ 0%       │ 70.6mb   │ Juan     │ disabled │
│ 3   │ forkNode3      │ default     │ 1.0.0   │ fork    │ 10696    │ 13m    │ 0    │ online    │ 0%       │ 69.4mb   │ Juan     │ disabled │
│ 4   │ forkNode4      │ default     │ 1.0.0   │ fork    │ 15136    │ 12m    │ 0    │ online    │ 0%       │ 69.5mb   │ Juan     │ disabled │
│ 5   │ forkNode5      │ default     │ 1.0.0   │ fork    │ 4016     │ 12m    │ 0    │ online    │ 0%       │ 70.2mb   │ Juan     │ disabled │
└─────┴────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

```

## COMANDOS NGINX
---
 ### Apagado rápido.
 `./nginx.exe -s stop`  
 ### Cierre más elegante.
 ``./nginx.exe -s quit``  
 ### Reiniciar el servidor al cambiar la configuración, iniciar nuevos procesos de trabajo con una nueva configuración, cierre elegante de los procesos de trabajo antiguos. 
 ``./nginx.exe -s reload``  
 ### Reabrir logs de archivos.
 ``./nginx.exe -s reopen`` 
 
 <br>





# <span style="color:Aquamarine">INICIO</span>
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

