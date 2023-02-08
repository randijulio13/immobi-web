import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Template() {
    const menus = [
        { title: 'Departemen', to: '/' },
        { title: 'Jabatan', to: '/role' },
        { title: 'Karyawan', to: '/employee' },
    ];
    return (
        <div className='flex flex-col bg-blue-100 min-h-screen'>
            <div className="fixed flex items-center px-4 w-full h-16 bg-blue-500">
                <div className="flex gap-x-2">
                    {menus.map((menu, index) => {
                        return <Link key={index} className='rounded px-4 py-2 active:scale-110 hover:bg-blue-600 duration-200 outline-none focus:ring focus:bg-blue-600 text-white' to={menu.to}>{menu.title}</Link>
                    })}
                </div>
            </div>
            <div className="mt-16 p-10">
                <Outlet />
            </div>
        </div>
    )
}
