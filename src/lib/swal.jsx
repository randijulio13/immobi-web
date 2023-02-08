import Swal from 'sweetalert2'

export default Swal.mixin({
    customClass: {
        confirmButton: 'px-4 py-2 rounded mr-2 outline-none bg-blue-500 hover:bg-blue-500 focus:ring ring-blue-300 text-white duration-200',
        cancelButton: 'px-4 py-2 rounded outline-none bg-red-500 hover:bg-red-600 focus:ring ring-red-300 text-white duration-200'
    },
    buttonsStyling: false
})

