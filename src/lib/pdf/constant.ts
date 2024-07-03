import { enumDisplay } from "@/constant/type"

export const defaultOptions = {
    acceleration: true, //启用硬件加速,移动端有效
    display: 'double', //显示：single=单页，double=双页，默认双页
    duration: 800,
    gradients: true,
    turnCorners: "bl,br",
    autoCenter: true,
}

export const getImgUrlStyle = (url: string) => {
    return new Promise<any>((resolve) => {
        const img = new Image();

        img.onload = function () {
            resolve({
                width: img.width as any,
                height: img.height as any
            })
        };

        img.onerror = function () {
            resolve({
                width: 0,
                height: 0
            })
        };

        img.src = url;
    })
}


export const getRecommendPageStyle = (imgStyle: any, containerStyle: any, display?: enumDisplay) => {
    const showTwoImages = display === enumDisplay.double
    const { width: imageWidth, height: imageHeight } = imgStyle
    let { width: containerWidth, height: containerHeight } = containerStyle
    containerHeight = containerHeight - 32
    let scaleFactorSingle = Math.min(containerWidth / imageWidth, containerHeight / imageHeight);

    // 如果要求展示两张图片，则计算两张图片并排的适应情况
    let scaleFactorDouble;
    if (showTwoImages) {
        // 计算并排放置两张图片时，每张图片的理论宽度
        let doubleImageWidth = containerWidth / 2;
        // 根据理论宽度和图片原始宽度计算缩放比例
        scaleFactorDouble = doubleImageWidth / imageWidth;
        // 确保缩放后的图片高度不超过容器高度
        scaleFactorDouble = Math.min(scaleFactorDouble, containerHeight / imageHeight);
    }

    // 决定使用哪种缩放比例
    let finalScaleFactor = showTwoImages && scaleFactorDouble !== undefined ? scaleFactorDouble : scaleFactorSingle;

    // 计算最终图片的尺寸
    let finalImageWidth = imageWidth * finalScaleFactor;
    let finalImageHeight = imageHeight * finalScaleFactor;

    // 计算能放置的图片数量
    const displayType = showTwoImages && finalImageWidth <= containerWidth / 2 ? enumDisplay.double : enumDisplay.single;

    return {
        pageWidth: finalImageWidth,
        display: displayType,
        width: displayType === enumDisplay.double ? finalImageWidth * 2 : finalImageWidth,
        height: finalImageHeight
    };
}


export const getRecommendOptions = async (imgUrl: string, containerId: string, display: enumDisplay) => {
    let pageStyle: any = {
        width: 0,
        height: 0
    }
    if (imgUrl && containerId) {
        const imgStyle = await getImgUrlStyle(imgUrl)
        const container = document.getElementById(containerId)
        pageStyle = getRecommendPageStyle(imgStyle, { width: container?.clientWidth, height: container?.clientHeight }, display)
    }
    const options = {
        acceleration: true, //启用硬件加速,移动端有效
        display: 'double', //显示：single=单页，double=双页，默认双页
        duration: 800,
        gradients: !0,
        autoCenter: !0,
        elevation: 50,
        width: 595 * 2,
        height: "calc(100% - 32px)",
        ...pageStyle
    }
    return options
}