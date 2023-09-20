import { useEffect } from "react"

export const useClickOutside = (targetRef, handler) => {
    useEffect(() => {
        function clickHandler (e) {
            if (e.target !== targetRef.current) {
                handler();
            }
        }

        window.addEventListener('click', clickHandler, true);

        return () => {
            window.removeEventListener('click', clickHandler, true);
        }
    }, [targetRef.current, handler]);
}