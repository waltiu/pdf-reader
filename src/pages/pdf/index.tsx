import { useEffect, useState } from "react"
import PdfReader from '@/lib/pdf'
import styles from './index.module.less'
import { getUrlParams } from "@/utils/url"


const Home = () => {
    const [fileUrl, setFileUrl] = useState('')
    const [pages, setPages] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const render = async () => {
        const pdfReader = new PdfReader()
        const images = await pdfReader.read(fileUrl)
        setLoading(false)
        setPages(images)
        setTimeout(() => {
            pdfReader.init('#prd-container')
        }, 2000);
    }
    useEffect(() => {
        const url = getUrlParams(window.location.href, 'path')
        setFileUrl(url)
    }, [])

    useEffect(() => {
        render()
    }, [fileUrl])

    return <div className={styles.pdf} >
        <div className={styles.header}></div>
        <div className={styles.container} >
            <div id="prd-container">
                {
                    loading ? <img src="https://p4.itc.cn/q_70/images03/20210826/76e6f5094908419fb24523196e60235f.gif" /> : <>
                        {
                            pages.map(item => {
                                return <div key={item}>
                                    <img src={item} />
                                </div>
                            })
                        }
                    </>
                }

            </div>
        </div>
        <div className={styles.footer}></div>

    </div>
}
export default Home