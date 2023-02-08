import { useForm } from 'react-hook-form';
import Button from './Button'
import InputText from './InputText'
import Modal from './Modal'
import axios from '../lib/axios'
import { useEffect } from 'react';
import Swal from 'sweetalert2'

export default function AddDepartmentModal({ isOpen, closeModal, getDepartment, selectedDep }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { name } = data
        let res;
        if (selectedDep.id) {
            res = await axios.put(`department/${selectedDep.id}`, { nama_department: name })
        } else {
            res = await axios.post('department', { nama_department: name })
        }
        getDepartment()
        Swal.fire({
            title: 'Success',
            text: res.data.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
        })
        closeModal()
    }

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
                            <label htmlFor="name">Nama Departemen</label>
                            <InputText {...register('name', { value: selectedDep.nama_department, required: "Nama departemen harus diisi" })} id="name" name="name" className="focus:ring focus:ring-blue-300" placeholder="Masukkan nama departemen" />
                            {errors.name && (
                                <span className="text-red-500">{errors.name.message}</span>
                            )}
                        </div>
                        <div>
                            <Button className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white">{selectedDep.id ? 'Update' : 'Submit'}</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
