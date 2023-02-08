import React from 'react'

export default function Button(props) {
    const { children, className } = props
    return (
        <button {...props} className={`px-4 py-2 rounded outline-none duration-300 ${className}`}>{children}</button>
    )
}
