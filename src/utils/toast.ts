import toast from 'react-hot-toast';

export const triggerToast = (type: "error" | "success", message: string) => {
    switch (type) {
        case 'error':
            toast(message, {
                icon: '❌',
                style: {
                    borderRadius: '10px'
                },
                duration: 4000,
                position: 'bottom-right'
            });
            break;
        case 'success':
            toast(message, {
                icon: '👍',
                style: {
                    borderRadius: '10px'
                },
                duration: 4000,
                position: 'bottom-right'
            });
            break;
        default:
            toast(message, {
                duration: 4000,
                position: 'bottom-right'
            });
            break;
    }
};