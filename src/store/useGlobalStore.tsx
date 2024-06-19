import { create } from 'zustand'
interface globalState {
    isLogin: boolean
    increase: (by: boolean) => void
}

const useGloBalStore = create<globalState>((set) => ({
    isLogin: true,
    increase: (value) => {
        set(() => ({
           isLogin:value
        }))
    }
}))

export default useGloBalStore