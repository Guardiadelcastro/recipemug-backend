# passport-node-mongodb
# Metodo de uso 
Hacer`npm install` al proyecto.

Iniciar la base de datos con docker, la ruta tiene que estar creada si no el docker no se quedara inicado. 

```bash
docker run -d -p 27017:27017  -v $(pwd)/../mongo-data:/data/db mongo`
```
