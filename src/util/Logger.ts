import {toast} from "react-toastify";

const ToastLogger = {
    log: (s: string, autoClose: number = 5000) => {
        toast.success(s, {
            position: "top-right",
            autoClose,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    },
    info: (s: string, autoClose: number = 5000) => {
        toast.info(s, {
            position: "top-right",
            autoClose,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    },
    error: (s: string, autoClose: number = 5000) => {
        toast.error(s, {
            position: "top-right",
            autoClose,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    },
    warn: (s: string, autoClose: number = 5000) => {
        toast.warn(s, {
            position: "top-right",
            autoClose,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
}

export {ToastLogger}