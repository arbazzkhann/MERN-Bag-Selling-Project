import express from 'express';
import bagController from '../controllers/bag.controller.js';
import multer from 'multer';


const router = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage});

router.post('/add', upload.single("image"), bagController.addBag);
router.get('/list', bagController.listBag);
router.delete('/remove', bagController.removeBag);

export default router;