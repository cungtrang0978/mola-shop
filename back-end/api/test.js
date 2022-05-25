var cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name: 'huuvan', 
    api_key: '668874124348985', 
    api_secret: 'zEdMrb7LOxalOIcY40zEoiF-gSI' 
  });
  cloudinary.uploader.upload("111.png", function(error, result) {console.log(result, error)});