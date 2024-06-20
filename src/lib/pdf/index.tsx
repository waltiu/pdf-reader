import '../cores/jquery'
import '../cores/turn'
import * as pdfjs from 'pdfjs-dist'
import 'pdfjs-dist/build/pdf.worker.mjs'
import { enumDisplay, turnOptionsType } from '@/constant/type'
import { log } from '@/constant'


class PdfReader {
    options: any
    pdf: any
    instance: any
    currentPage: number
    eventCallbackMap: any
    hasInit: boolean
    constructor({ onPageChange }: any) {
        this.pdf = null
        this.instance = null
        this.currentPage = 0
        this.hasInit = false
        this.eventCallbackMap = {
            onPageChange
        }
    }
    
    
    init(container: string) {
        this.instance = $(container) as any
        this.instance.turn(this.options);
        this.jump(1)
        this.hasInit = true
    }



    setOptions(options: turnOptionsType) {
        if (this.hasInit) {
            if (options.display !== this.options.display) {
                this.changeDisplay(options.display)
            }
            if (options.width !== this.options.width || options.height !== this.options.height) {
                this.changeStyle(options.width, options.height)
            }
        }
        this.options = options
    }

    async changeDisplay(type: enumDisplay) {
        this.instance.turn("display", type)
    }

    async changeStyle(width?: number, height?: number) {
        this.instance.turn("size", width, height)
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
    
    // 调整到具体页面，超过最大页码就跳到最后一页
    jump(page: number) {
        let newPage = page
        if (newPage <= 0||newPage > this.pdf._pdfInfo.numPages) {
            newPage = 1
        } 
        log("当前page：", newPage)
        this.currentPage = newPage
        this.eventCallbackMap?.onPageChange(newPage)
        this.instance.turn('page', newPage);
    }
}
export default PdfReader