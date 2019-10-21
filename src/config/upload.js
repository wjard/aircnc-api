const multer = require('multer');
const path = require('path');

//path.resolve(__dirname, '..', '..', 'uploads') = configura o local da pasta
// independente do sistem de arquivos ou SO usado.
module.exports = {    
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, callback)=>{
            console.log(`${file.fieldname} - ${file.originalname}`);
            const ext = path.extname(file.originalname);
            const filename = path.basename(file.originalname, ext);

            callback(null, 
                `${filename}-${Date.now()}${ext}`);
        }
    })
};