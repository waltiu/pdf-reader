import { useEffect, useRef, useState } from "react"
import PdfReader from '@/lib/pdf'
import styles from './index.module.less'
import { getUrlParams } from "@/utils/url"
import { InputNumber, Space } from "antd"
import { BackwardOutlined, ForwardOutlined, VerticalLeftOutlined, VerticalRightOutlined } from "@ant-design/icons"
import { VALUE_UNKNOWN } from "@/constant"
import { enumDisplay, turnOptionsType } from "@/constant/type"
import { getRecommendOptions } from "@/lib/pdf/constant"

export const BOOK_CONTAINER_ID = 'book-container'



const Home = () => {
    const [fileUrl, setFileUrl] = useState('')
    const [pages, setPages] = useState<string[]>([])
    const bookRef = useRef<any>(null)
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState<number | string>("")
    const [options, setOptions] = useState<turnOptionsType>({
        display: enumDisplay.double
    })

    const render = async () => {
        bookRef.current = new PdfReader({
            onPageChange: (page: number) => {
                setCurrentPage(page)
            },
        })
        const images = await bookRef.current.read(fileUrl)
        const rOptions = await getRecommendOptions(images[0], BOOK_CONTAINER_ID, options.display)
        const newOptions = {
            ...rOptions,
            ...options
        }
        setOptions(newOptions)
        setLoading(false)
        setPages(images)
        setTimeout(() => {
            bookRef.current.init('#prd-container', newOptions)
        }, 2000);
    }

    const computedStyles=()=>{
        const styles:any={}
        if(currentPage===1&&options.display===enumDisplay.double){
            styles['transform']=`translateX(-25%)`
        }
        return styles
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
        <div className={styles.container} id={BOOK_CONTAINER_ID}  >
            <div id="prd-container" style={computedStyles()}>
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
        <div className={styles.footer}>
            <Space>
                <VerticalRightOutlined />
                <BackwardOutlined onClick={() => bookRef.current.prev()} />
                <span><InputNumber
                    placeholder="请输入页码"
                    onPressEnter={(e: any) => {
                        bookRef.current.jump(Number(e.target.value))
                    }}
                    min={1} max={pages.length} value={currentPage as number} ></InputNumber></span>
                <span>/</span>
                <span>{pages.length || VALUE_UNKNOWN}</span>

                <ForwardOutlined onClick={() => bookRef.current.next()} />
                <VerticalLeftOutlined />
            </Space>
        </div>
    </div>
}
export default Home