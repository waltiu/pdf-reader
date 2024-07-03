import { useEffect, useRef, useState } from "react"
import PdfReader from '@/lib/pdf'
import styles from './index.module.less'
import { getUrlParams } from "@/utils/url"
import { InputNumber, Popover, Space } from "antd"
import { BackwardOutlined, ForwardOutlined, HolderOutlined, VerticalLeftOutlined, VerticalRightOutlined } from "@ant-design/icons"
import { VALUE_UNKNOWN } from "@/constant"
import { enumDisplay, turnOptionsType } from "@/constant/type"
import { getRecommendOptions } from "@/lib/pdf/constant"
import Oper from "./oper"

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
            ...options,
        }
        changeOptions(newOptions)
        setPages(images)
        setTimeout(() => {
            if (bookRef.current) {
                bookRef.current.init('#prd-container', options)
        setLoading(false)

            }
        }, 1000);

    }

    const changeOptions = (params: turnOptionsType) => {
        const newOptions = {
            ...options,
            ...params
        }
        bookRef.current.setOptions(newOptions)
        setOptions(newOptions)
    }

    const computedStyles = () => {
        const styles: any = {}
        if (currentPage === 1 && options.display === enumDisplay.double) {
            styles['transform'] = `translateX(-25%)`
        }
        return styles
    }

    const changeDisplayMode = async (type: enumDisplay) => {
        const rOptions = await getRecommendOptions(pages[0], BOOK_CONTAINER_ID, type)
        const newOptions = {
            ...rOptions,
            display: type
        }
        changeOptions(newOptions)

    }

    useEffect(() => {
        const url = getUrlParams(window.location.href, 'path')
        setFileUrl(url)
    }, [])



    useEffect(() => {
        render()
    }, [fileUrl])

    return <div className={styles.pdf} >
        <div className={styles.header}>
            <Popover placement="bottomLeft" title={"更多操作"} content={<Oper options={options} changeOptions={(params) => {
                setOptions({
                    ...options,
                    ...params
                })
            }}
                changeDisplayMode={changeDisplayMode}
            />}>
                <HolderOutlined className={styles.more} />
            </Popover>
        </div>
        <div className={styles.container} id={BOOK_CONTAINER_ID}  >
            {
                loading&&<img src="https://p4.itc.cn/q_70/images03/20210826/76e6f5094908419fb24523196e60235f.gif" />
            }
            <div id="prd-container" style={computedStyles()}>
                        {
                            pages.map(item => {
                                return <div key={item} style={{opacity:loading?0:1}}>
                                    <img src={item} />
                                </div>
                            })
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