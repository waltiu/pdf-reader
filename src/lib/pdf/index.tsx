import '../cores/jquery'
import '../cores/turn'
import * as pdfjs from 'pdfjs-dist'
import 'pdfjs-dist/build/pdf.worker.mjs'
import { defaultOptions } from './constant'
import { TurnOptionsType } from './type'


class PdfReader {
    pdf: any
    constructor() {
        this.pdf = null
    }
    init(container: string, options?: TurnOptionsType) {
        const config = {
            ...defaultOptions,
            ...(options || {})
        };
        ($(container) as any).turn(config);
    }

    

    async load(url: string) {
        return new Promise((resolve) => {
            const loadingTask = pdfjs.getDocument(url);
            loadingTask.promise.then(res => {
                resolve(res)
            })
        })
    }

    async read(url: string) {
        this.pdf = await this.load(url)
        console.log(this.pdf,'pdf')
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const pdfPicturePath = []
        // 循环将pdf每一页转成图片后放入图片列表
        for (let i = 1; i <= this.pdf._pdfInfo.numPages; i++) {
            const page = await this.pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1 });
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };
            await page.render(renderContext).promise;
            const imgUrl = canvas.toDataURL('image/png')
            pdfPicturePath.push(imgUrl)
        }


        return pdfPicturePath
    }

}
export default PdfReader