import { useForm } from 'react-hook-form';
import Button from './Button'
import InputText from './InputText'
import Modal from './Modal'
import axios from '../lib/axios'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

export default function AddEmployeeModal({ isOpen, closeModal, getEmployee, selectedEmployee }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [roles, setRoles] = useState([])

    const onSubmit = async (data) => {
        const { name, roleId, birthDate, gender, address } = data
        let res;



        let opt = {
            name, id_jabatan: roleId, gender, tanggal_lahir: birthDate, alamat: address, age: getAge(birthDate)
        }
        if (selectedEmployee.id) {
            res = await axios.put(`employee/${selectedEmployee.id}`, opt)
        } else {
            console.log(opt)
            res = await axios.post('employee', opt)
        }
        getEmployee()
        Swal.fire({
            title: 'Success',
            text: res.data.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
        })
        closeModal()
    }

    const getAge = (birthday) => {
        let today = new Date();
        birthday = new Date(birthday)
        let year = 0;
        if (today.getMonth() < birthday.getMonth()) {
            year = 1;
        } else if ((today.getMonth() == birthday.getMonth()) && today.getDate() < birthday.getDate()) {
            year = 1;
        }
        let age = today.getFullYear() - birthday.getFullYear() - year;

        if (age < 0) {
            age = 0;
        }
        return age;
    }

    const getRoles = async () => {
        let { data } = await axios.get('role')
        setRoles(data.data)
    }

    useEffect(() => {
        getRoles()
    }, [])

    useEffect(() => {
        reset();
    }, [isOpen]);

    const gender = [
        { title: 'Laki-laki', value: 'L' },
        { title: 'Perempuan', value: 'P' },
    ]

    return (
        <>
            <Modal {...{ isOpen, closeModal }}>
                <Modal.Title>Tambah Data Departemen</Modal.Title>
                <Modal.Body>
                    <form className='flex flex-col space-y-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-2 flex flex-col space-y-3">
                            <label htmlFor="name">Nama Karyawan</label>
                            <InputText {...register('name', { required: 'Nama harus diisi', value: selectedEmployee.name })} id="name" name="name" className="focus:ring focus:ring-blue-300" placeholder="Masukkan nama karyawan" />
                            {errors.name && (
                                <span className="text-red-500">{errors.name.message}</span>
                            )}
                        </div>
                        <div className="mb-2 flex flex-col space-y-3">
                            <label htmlFor="roleId">Jabatan</label>
                            <select {...register('roleId', { required: "Department harus diisi", value: selectedEmployee.id_jabatan })} name="roleId" id="roleId" className='px-4 py-2 rounded outline-none border focus:ring ring-blue-300 bg-white duration-300'>
                                {roles.map((d, index) => {
                                    return <option key={index} value={d.id}>{d.nama_jabatan}</option>
                                })}
                            </select>
                            {errors.departmentId && (
                                <span className="text-red-500">{errors.departmentId.message}</span>
                            )}
                        </div>
                        <div className="mb-2 flex flex-col space-y-3">
                            <label htmlFor="birthDate">Tanggal lahir</label>
                            <InputText type="date" {...register('birthDate', { required: 'Tanggal lahir harus diisi', value: selectedEmployee.tanggal_lahir })} id="birthDate" name="birthDate" className="focus:ring focus:ring-blue-300" placeholder="Masukkan tanggal lahir" />
                            {errors.birthDate && (
                                <span className="text-red-500">{errors.birthDate.message}</span>
                            )}
                        </div>
                        <div className="mb-2 flex flex-col space-y-3">
                            <label htmlFor="gender">Gender</label>
                            <select name="gender" id="gender" {...register('gender', { required: "Gender harus dipilih", value: selectedEmployee.gender })} className='px-4 py-2 rounded outline-none border focus:ring ring-blue-300 bg-white duration-300'>
                                {gender.map((d, index) => {
                                    return <option key={index} value={d.value}>{d.title}</option>
                                })}
                            </select>
                            {errors.gender && (
                                <span className="text-red-500">{errors.gender.message}</span>
                            )}
                        </div>
                        <div className="mb-2 flex flex-col space-y-3">
                            <label htmlFor="address">Alamat</label>
                            <textarea name="address" id="address" className='px-4 py-2 rounded outline-none duration-300 border w-full focus:ring ring-blue-300 bg-white' {...register('address', { required: 'Alamat harus diisi', value: selectedEmployee.alamat })}></textarea>
                            {errors.address && (
                                <span className="text-red-500">{errors.address.message}</span>
                            )}
                        </div>
                        <div>
                            <Button className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
