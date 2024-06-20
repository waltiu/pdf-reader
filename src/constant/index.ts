export const VALUE_UNKNOWN = '--'

export const log = (...arg: any) => {
    console.log('\x1b[43m pdf-reader', ...arg)
}