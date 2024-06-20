import { enumDisplay, turnOptionsType } from "@/constant/type"
import { FC } from "react"

type OperPropsType={
    options:turnOptionsType,
    changeOptions:(params:OperPropsType['options'])=>void,
    changeDisplayMode:(type:enumDisplay)=>void
}

const Oper:FC<OperPropsType> = ({ changeDisplayMode }) => {



    return (
        <div>
            <div onClick={() => {
                changeDisplayMode(enumDisplay.single)
              
            }}>单页模式</div>
            <div onClick={() => {
                changeDisplayMode(enumDisplay.double)
            }} >双页模式</div>

        </div>
    )
}
export default Oper