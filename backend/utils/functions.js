import fs from 'fs'
import multer from 'multer';

const createUploadsDirectory = () => {
    const directory = 'uploads';
    
    if (!fs.existsSync(directory)) {

        fs.mkdirSync(directory);
        console.log(`Directory '${directory}' created successfully.`);
    } else {
        console.log(`Connecting to '${directory}' directory.`);
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // save directory
    },
    filename: function (req, file, cb) {
        console.log(file.originalname);
        cb(null, Date.now() + '-' + file.originalname) // Creating unique file names
    }
});
createUploadsDirectory();


export const upload = multer({ storage: storage });


