import * as fs from 'fs'

export function readDir(dir: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, content) => {
            if (err) return reject(err)
            resolve(content)
        })
    })
}

export function readFile(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(url, 'utf-8', (err, content) => {
            if (err) return reject(err)
            resolve(content)
        })
    })
}

export function getFileFormat(fileName: string): string {
    const fileFormat = fileName.split('.')
    return fileFormat[fileFormat.length - 1]
}

export function unlink(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, err => {
            if (err) return resolve(err)
            resolve()
        })
    })
}
