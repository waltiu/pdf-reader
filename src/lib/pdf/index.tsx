import '../cores/jquery'
import '../cores/turn'
import * as pdfjs from 'pdfjs-dist'
import 'pdfjs-dist/build/pdf.worker.mjs'
import { defaultOptions } from './constant'
import { TurnOptionsType } from './type'
import { enumDisplay } from '@/constant/type'
import { log } from '@/constant'


class PdfReader {
    options: any
    pdf: any
    instance: any
    currentPage: number
    eventCallbackMap: any
    constructor({ onPageChange }: any) {
        this.pdf = null
        this.instance = null
        this.currentPage = 0
        this.eventCallbackMap = {
            onPageChange
        }
    }
    init(container: string, options?: TurnOptionsType) {
        const config = {
            ...defaultOptions,
            ...(options || {})
        };
        this.options = config
        this.instance = $(container) as any
        this.instance.turn(config);
        this.jump(1)
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
    isSingle() {
        return this.options.display === enumDisplay.single
    }
    next() {
        const page = this.currentPage + (this.isSingle() ? 1 : 2)
        this.jump(page)
    }
    prev() {
        const page = this.currentPage - (this.isSingle() ? 1 : 2)
        this.jump(page)

    }
    jump(page: number) {
        let newPage = page
        if (newPage <= 0) {
            newPage = 1
        } else if (newPage > this.pdf._pdfInfo.numPages) {
            newPage = this.pdf._pdfInfo.numPages
        }
        log("当前page：",newPage)
        this.currentPage=newPage
        this.eventCallbackMap?.onPageChange(newPage)
        this.instance.turn('page', newPage);
    }
}
export default PdfReader