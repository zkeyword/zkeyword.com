import * as multer from 'koa-multer'

export const FILE_UPLOAD_OPTIONS = {
    storage: multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
            cb(undefined, `${__dirname}/../../public/upload/`)
        },
        filename: (req: any, file: any, cb: any) => {
            cb(undefined, file.originalname)
        }
    })
}