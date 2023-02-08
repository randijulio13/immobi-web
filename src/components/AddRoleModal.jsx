import { useForm } from 'react-hook-form';
import Button from './Button'
import InputText from './InputText'
import Modal from './Modal'
import axios from '../lib/axios'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

export default function AddRoleModal({ isOpen, closeModal, getRole, selectedRole }) {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [department, setDepartment] = useState([])

    const onSubmit = async (data) => {

        const { name, departmentId } = data
        let res;
        let opt = { nama_jabatan: name, id_department: departmentId }
        if (selectedRole.id) {
            res = await axios.put(`role/${selectedRole.id}`, opt)
        } else {
            res = await axios.post('role', opt)
        }
        getRole()
        Swal.fire({
            title: 'Success',
            text: res.data.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
        })
        closeModal()
    }

    const getDepartment = async () => {
        let { data } = await axios.get('department')
        setDepartment(data.data)
    }

    useEffect(() => {
        getDepartment()
    }, [])

    useEffect(() => {
        reset();
    }, [isOpen]);

    return (
        <>
            <Modal {...{ isOpen, closeModal }}>
                <Modal.Title>Tambah Data Departemen</Modal.Title>
                <Modal.Body>
                    <form className='flex flex-col space-y-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-2 flex flex-col space-y-3">
                            <label htmlFor="name">Nama Jabatan</label>
                            <InputText {...register('name', { required: "Nama Jabatan harus diisi", value: selectedRole.nama_jabatan })} id="name" name="name" className="focus:ring focus:ring-blue-300" placeholder="Masukkan nama departemen" />
                            {errors.name && (
                                <span className="text-red-500">{errors.name.message}</span>
                            )}
                        </div>
                        <div className="mb-2 flex flex-col space-y-3">
                            <label htmlFor="departmentId">Departemen</label>
                            <select {...register('departmentId', { required: "Department harus diisi", value: selectedRole.id_department })} name="departmentId" id="departmentId" className='px-4 py-2 rounded outline-none border focus:ring ring-blue-300 bg-white duration-300'>
                                {department.map((d, index) => {
                                    return <option key={index} value={d.id}>{d.nama_department}</option>
                                })}
                            </select>
                            {errors.departmentId && (
                                <span className="text-red-500">{errors.departmentId.message}</span>
                            )}
                        </div>
                        <div>
                            <Button className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white">{selectedRole.id ? 'Update' : 'Submit'}</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
