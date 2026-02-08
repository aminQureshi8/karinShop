import Swal, { SweetAlertResult } from "sweetalert2";

const SwalFire = (
  title: string,
  icon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'info',
  showCancelButton: boolean = true,
  cancelButtonText: string = "انصراف",
  confirmButtonText: string = "تأیید",
  confirmButtonColor: string = "#d33",
  cancelButtonColor: string = "#3085d6",
  timer?: number,                  
  timerProgressBar: boolean = false, 
  reverseButtons: boolean = true
): Promise<SweetAlertResult> => {
  return Swal.fire({
    title,
    icon,
    showCancelButton,
    cancelButtonText,
    confirmButtonText,
    confirmButtonColor,
    cancelButtonColor,
    reverseButtons,
    timer,                    
    timerProgressBar,        
  });
};

export default SwalFire;