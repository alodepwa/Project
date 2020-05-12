import React from 'react';
import Swal from 'sweetalert2';

export function showAlert(status, data){
    Swal.fire({
        icon: status,
        text: data,
        timer: 2000
    })
}
