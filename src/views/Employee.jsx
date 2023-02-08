import axios from '../lib/axios'
import React, { useEffect, useState } from 'react'
import AddEmployeeModal from '../components/AddEmployeeModal'
import Button from '../components/Button'
import Swal from '../lib/swal'
import moment from 'moment'

export default function Employee() {
    const date = moment();
    const [employee, setEmployee] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState({})

    const closeModal = () => {
        setSelectedEmployee({})
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    useEffect(() => {
        getEmployee()
    }, [])

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


        let { data } = await axios.delete(`employee/${id}`)
        setEmployee((employee) => {
            return employee.filter((dep, index) => {
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

    const handleUpdate = async (employee) => {
        setSelectedEmployee(employee)
        openModal()
    }

    const getEmployee = async () => {
        let { data } = await axios.get('employee')
        setEmployee(data.data)
    }

    return (
        <>
            <div className="flex w-full justify-center">
                <div className='bg-white rounded w-full px-4 py-2 shadow'>
                    <h1 className="my-4 text-2xl">Data Karyawan</h1>
                    <Button className='bg-blue-500 focus:bg-blue-600 hover:bg-blue-600 text-white mb-3' onClick={openModal}>Tambah Data</Button>
                    <table className='min-w-full'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Karyawan</th>
                                <th>Jabatan</th>
                                <th>Umur</th>
                                <th>Gender</th>
                                <th>Tanggal Lahir</th>
                                <th>Alamat</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.map((d, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='text-center'>{index + 1}</td>
                                        <td>{d.name}</td>
                                        <td>{d.Role.nama_jabatan}</td>
                                        <td>{d.age}</td>
                                        <td>{d.gender == 'L' ? 'Laki-Laki' : 'Perempuan'}</td>
                                        <td>{d.tanggal_lahir}</td>
                                        <td>{d.alamat}</td>
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
                    {employee.length == 0 ? (<div className='h-12 min-w-full flex items-center justify-center'>Tidak ada data</div>) : ''}
                </div>
            </div>
            <AddEmployeeModal  {...{ isOpen, closeModal, getEmployee, selectedEmployee }} />
        </>
    )
}
