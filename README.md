# Object Storage NodeJS App

La aplicación es una demostración del uso de un Object Storage mediante una aplicación en NodeJS, podrá cargar, ver y eliminar archivos en un Cloud Object Storage.

Para ejecutar la aplicación en el puerto 3000 ingrese en la carpeta **server** y ejecute:

```
npm install
npm start
```

Para vincular el bucket de su COS modifique el archivo **localdev-config.json** con sus credenciales; si no tiene unas ingrese a su instancia de COS y dirijase a la pesataña **Credenciales de servicio** una vez allí cree una nueva credencial y no olvide seleccionar **Incluir credenciales HMAC** dentro de las configuraciones adicionales. El valor de **cos_endpoint** lo encontrará al ingresar a su bucket dentro de la pestaña **configuración**, recuerde tomar el valor público. A continuación un ejemplo del contenido del archivo:

```
{
  "cos_original_bucket": "bucketdemo",
  "cos_normalized_bucket": "bucketdemo",
  "cos_api_key": "8lvhV3tIGbqW0c4SKPTVPrVtG4ns0-x6YTUJyq9RU-hr",
  "cos_endpoint": "s3.us-south.cloud-object-storage.appdomain.cloud",
  "iam_apikey_description": "Auto-generated for key e258174a-305e-4dbb-9bb9-14dfb790fc31",
  "iam_apikey_name": "Credenciales de servicio-1",
  "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
  "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/7c3c53c1245d449bb3791b9611571ce3::serviceid:ServiceId-c04cc1dc-c6fe-45cc-97e1-cd9b0193b9a8",
  "cos_service_instance_id": "crn:v1:bluemix:public:cloud-object-storage:global:a/7c3c53c1245d449bb3791b9611571ce3:a51c5e3f-01a9-40d7-9a68-267e0cf48a0e::",
  "access_key_id": "1363961ee950445c8c8c97a8683009d4",
  "secret_access_key": "9f59697a79c43b0566e0cc3adab02f47721d506f6500efe8"
}
```
