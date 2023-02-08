import axios from '../lib/axios'
import React, { useEffect, useState } from 'react'
import AddRoleModal from '../components/AddRoleModal'
import Button from '../components/Button'
import Swal from '../lib/swal'

export default function Role() {
    const [role, setRole] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState({})

    const closeModal = () => {
        setIsOpen(false)
        setSelectedRole({})
    }

    const openModal = () => {
        setIsOpen(true)
    }

    useEffect(() => {
        getRole()
    }, [])

    const handleUpdate = async (role) => {
        setSelectedRole(role)
        openModal()
    }

    const handleDelete = async (id) => {
        let { isConfirmed } = await Swal.fire({
            title: 'Hapus data?',
            text: "Data yang sudah dihapus tidak bisa dikembalikan",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Tutup'
        })

        if (isConfirmed == false) return


        let { data } = await axios.delete(`role/${id}`)
        setRole((role) => {
            return role.filter((dep, index) => {
                return dep.id != id
            })
        })
        Swal.fire({
            title: 'Success',
            text: data.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
        })
    }

    const getRole = async () => {
        let { data } = await axios.get('role')
        setRole(data.data)
        console.log(data)
    }

    return (
        <>
            <div className="flex w-full justify-center">
                <div className='bg-white rounded w-full lg:w-1/2 px-4 py-2 shadow'>
                    <h1 className="my-4 text-2xl">Data Jabatan</h1>
                    <Button className='bg-blue-500 focus:bg-blue-600 hover:bg-blue-600 text-white mb-3' onClick={openModal}>Tambah Data</Button>
                    <table className='min-w-full'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Jabatan</th>
                                <th>Nama Departemen</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {role.map((r, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{r.nama_jabatan}</td>
                                        <td>{r.Department.nama_department}</td>
                                        <td>
                                            <div className='flex justify-center space-x-2'>
                                                <Button onClick={() => handleUpdate(r)} className="bg-blue-500 focus:bg-blue-600 hover:bg-blue-600 text-white">Update</Button>
                                                <Button onClick={() => handleDelete(r.id)} className='bg-red-500 focus:bg-red-600 hover:bg-red-600 text-white'>Hapus</Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {role.length == 0 ? (<div className='h-12 min-w-full flex items-center justify-center'>Tidak ada data</div>) : ''}
                </div>
            </div>
            <AddRoleModal  {...{ isOpen, closeModal, getRole, selectedRole }} />
        </>
    )
}
