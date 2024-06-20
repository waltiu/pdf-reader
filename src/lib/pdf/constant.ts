

export const calcFlipbookSize = () => {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const height =  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const ratio = width / height
    const width_ = 600
    const height_ = 600 / ratio
    return {
        width: width_,
        height: height_,
        scale: 1,
        margin: 0,
        zoom: 1,
        flipbookWidth: width_,
        flipbookHeight: height_,
    }
}

export const defaultOptions = {
    acceleration: true, //启用硬件加速,移动端有效
    display: 'double', //显示：single=单页，double=双页，默认双页
    duration: 800,
    gradients: !0,
    autoCenter: !0,
    elevation: 50,
    width:595*2,
    height:841
}