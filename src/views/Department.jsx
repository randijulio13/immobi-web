import axios from '../lib/axios'
import React, { useEffect, useState } from 'react'
import AddDepartmentModal from '../components/AddDepartmentModal'
import Button from '../components/Button'
import Swal from '../lib/swal'

export default function Department() {
    const [department, setDepartment] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedDep, setSelectedDep] = useState({})

    const closeModal = () => {
        setSelectedDep({})
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    useEffect(() => {
        getDepartment()
    }, [])

    const handleUpdate = async (department) => {
        setSelectedDep(department)
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


        let { data } = await axios.delete(`department/${id}`)
        setDepartment((department) => {
            return department.filter((dep, index) => {
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

    const getDepartment = async () => {
        let { data } = await axios.get('department')
        setDepartment(data.data)
    }

    return (
        <>
            <div className="flex w-full justify-center">
                <div className='bg-white rounded w-full lg:w-1/2 px-4 py-2 shadow'>
                    <h1 className="my-4 text-2xl">Data Departemen</h1>
                    <Button className='bg-blue-500 focus:bg-blue-600 hover:bg-blue-600 text-white mb-3' onClick={openModal}>Tambah Data</Button>
                    <table className='min-w-full'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Departemen</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {department.map((d, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='text-center'>{index + 1}</td>
                                        <td>{d.nama_department}</td>
                                        <td>
                                            <div className='flex justify-center space-x-2'>
                                                <Button onClick={() => handleUpdate(d)} className="bg-blue-500 focus:bg-blue-600 hover:bg-blue-600 text-white">Update</Button>
                                                <Button onClick={() => handleDelete(d.id)} className='bg-red-500 focus:bg-red-600 hover:bg-red-600 text-white'>Hapus</Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {department.length == 0 ? (<div className='h-12 min-w-full flex items-center justify-center'>Tidak ada data</div>) : ''}
                </div>
            </div>
            <AddDepartmentModal  {...{ isOpen, closeModal, getDepartment, selectedDep }} />
        </>
    )
}
