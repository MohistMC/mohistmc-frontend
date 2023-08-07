import {toast} from "react-toastify";

const ToastLogger = {
    log: (s: string, time: number | undefined = undefined) => {
        toast.success(s, {
            position: "top-right",
            autoClose: time ?? 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    },
    info: (s: string, time: number | undefined = undefined) => {
        toast.info(s, {
            position: "top-right",
            autoClose: time ?? 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    },
    error: (s: string) => {
        toast.error(s, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    },
    warn: (s: string) => {
        toast.warn(s, {
            position: "top-right",
            autoClose: 5000,
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