var galleryController = function(title) {
    //Carga de modulos
    var AWS = require('ibm-cos-sdk');
    var util = require('util');
    const sleep = util.promisify(setTimeout);
    var multer = require('multer');
    var multerS3 = require('multer-s3');
    var ejs = require('ejs');
    var myBucket = 'bucketappdemo';
    const IBMCloudEnv = require("ibm-cloud-env");
    IBMCloudEnv.init();
    const s3function = require('./S3Functions');
    const request = require('request-promise');
    //Credenciales del servicio de object storage
    var config = {
        endpoint: IBMCloudEnv.getString("cos_endpoint"),
        apiKeyId: IBMCloudEnv.getString("cos_api_key"),
        ibmAuthEndpoint: 'https://iam.ng.bluemix.net/oidc/token',
        serviceInstanceId: IBMCloudEnv.getString("cos_service_instance_id"),
        credentials: new AWS.Credentials(IBMCloudEnv.getString("access_key_id"), IBMCloudEnv.getString("secret_access_key"), sessionToken = null),
        signatureVersion: 'v4'
    };

    var s3 = new AWS.S3(config);
    var imageUrlList = new Array();
    var imageUrlListRecycle = new Array();
    var imageName = new Array();
    var namedel = '';
    var nameproject = '';
    var bucketgallery ='bucketappdemo';
    var bucketrecycle ='papeleraappdemo';

    var downGralleryDocs = async function(req, res){
        namedel = req.body.nameKey;
        var data = await s3.getSignedUrl('getObject',{Bucket:bucketgallery, Key: namedel});
        console.log(data);
        res.redirect(data);
    }

    var downRecycleDocs = async function(req, res){
        namedel = req.body.nameKey;
        var data = await s3.getSignedUrl('getObject',{Bucket:bucketrecycle, Key: namedel});
        console.log(data);
        res.redirect(data);
    }

    var uploadGalleryDocs = function(req, res, next){
        console.log('recibiendo file');
        s3function.uploadOnBucket(bucketgallery,req,res);
    }

    var upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: myBucket,
            key: function (req, file, cb) {
                cb(null, file.originalname);
            }
        })
    });

    var restoreRecycleDocs = async function(req, res){
        console.log(req.body);
        namedel = req.body.nameKey;
        id = req.params.id;
        id_asset = req.body.id_asset;
        await s3function.copyItem(bucketgallery,bucketrecycle,namedel);
        await s3function.deleteItem(bucketrecycle,namedel);
        sleep(200);
        res.redirect('/gallery');
    }
    
    //Obtener los objetos del ICOS
    var listGalleryDocs = function (req, res) {
        var params = {Bucket: myBucket};
        imageUrlList=[];
        s3.listObjects(params, function (err, data) {
            if(data) {
                var bucketContents = data.Contents;
                for (var i = 0; i < bucketContents.length; i++) {
                        console.log(bucketContents[i].Key);
                        var urlParams = {Bucket: myBucket, Key: bucketContents[i].Key};
                        var url = s3.getSignedUrl('getObject', urlParams);
                        imageUrlList[i] = url;  
                        imageName[i]=bucketContents[i].Key;        
                }
            }
            res.render('galleryView', {
                title: title,
                imageUrls: imageUrlList,
                imageNames: imageName
            });
        });
    };

    var GalleryRecycle = function (req, res) {
        console.log('Papelera de reciclaje ejecutandose');
        imageUrlListRecycle=[];
        s3.listObjects({Bucket: bucketrecycle}, function (err, data) {
            if(data) {
                var bucketContents = data.Contents;
                for (var i = 0; i < bucketContents.length; i++) {
                        var urlParams = {Bucket:bucketrecycle, Key: bucketContents[i].Key};
                        var url = s3.getSignedUrl('getObject', urlParams);
                        imageUrlListRecycle[i] = url;  
                        imageName[i]=bucketContents[i].Key;
                        console.log(imageUrlListRecycle);     }}
            res.render('galleryRecycle', {
                title: title,
                imageUrls: imageUrlListRecycle,
                imageNames: imageName
            });
        });
    };

    var deleteGralleryDocs =  async function(req, res){
        namedel = req.body.nameKey;
        id = req.params.id;
        id_asset = req.body.id_asset;
        console.log(req);
        console.log(req.params);
        await s3function.copyItem(bucketrecycle,bucketgallery,namedel);
        await s3function.deleteItem(bucketgallery,namedel);
        sleep(200);
        res.redirect('/gallery');
    }

    var deleteRecycleDocs =  async function(req, res){
        namedel = req.body.nameKey;
        id = req.params.id;
        id_asset = req.body.id_asset;
        console.log(req);
        console.log(req.params);
        await s3function.deleteItem(bucketrecycle,namedel);
        sleep(200);
        res.redirect('/recyclebin');
    }
    
    var crearproyecto = async function(req,res){
        request.post({url:'http://localhost:4000/New-Project', form:{name_project: req.body.name_project, description: req.body.description}}).promise()
        .then(async function (body) {
            nameproject = body;
            console.log('El id del proyecto es' +nameproject)
            await s3function.createBucket('project'+nameproject);
            await s3function.createBucket('trash'+nameproject);
            //Crear registro del proyecto de la dB
            res.send("peticion realizada");
        })
        .catch(function (err) {
        // Request failed due to technical reasons...
        });
        //nameproject = req.body.name.toLowerCase();
        //nameproject = nameproject.replace(/ /g, '');
    }

    return {
        listGalleryDocs: listGalleryDocs,
        upload: upload,
        GalleryRecycle, GalleryRecycle,
        crearproyecto, crearproyecto,
        uploadGalleryDocs, uploadGalleryDocs,
        deleteGralleryDocs, deleteGralleryDocs,
        deleteRecycleDocs, deleteRecycleDocs,
        downGralleryDocs, downGralleryDocs,
        downRecycleDocs,downRecycleDocs,
        restoreRecycleDocs, restoreRecycleDocs,
    };
};

module.exports = galleryController;
