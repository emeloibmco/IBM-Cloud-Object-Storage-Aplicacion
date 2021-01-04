# Object Storage NodeJS App

La aplicación es una demostración del uso de un Object Storage mediante una aplicación en NodeJS, podrá cargar, ver y eliminar archivos en un Cloud Object Storage.

Para ejecutar la aplicación en el puerto 3000 ingrese en la carpeta **server** y ejecute:

```
npm install
npm start
```

Para vincular el bucket de su COS modifique el archivo **localdev-config.json** con sus credenciales; si no tiene unas ingrese a su instancia de COS y dirijase a la pesataña **Credenciales de servicio** una vez allí cree una nueva credencial y no olvide seleccionar **Incluir credenciales HMAC** dentro de las configuraciones adicionales. El valor de **cos_endpoint** lo encontrará al ingresar a su bucket dentro de la pestaña **configuración**, recuerde tomar el valor público.
