import React, { forwardRef } from 'react'

const InputText = forwardRef((props, ref) => {
    const { className } = props
    return (
        <input ref={ref} {...props} className={`${className} px-4 py-2 rounded outline-none duration-300 border w-full`} />
    )
})

export default InputText