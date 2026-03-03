import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
            cb(new Error("This file type is not allwoed !"));
            return;
        }
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE }
});
export { multer, storage, upload };
//# sourceMappingURL=multerConfig.js.map