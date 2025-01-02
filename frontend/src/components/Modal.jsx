import { useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

import './Modal.css';

const Modal = forwardRef(function Modal({ details, children }, ref) {
    const dialog = useRef();

    const { result, gameType } = details;

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            close() {
                dialog.current.close();
            },
        };
    });

    let clsName;
    if (gameType === 'landing page') {
        clsName = 'draw-color';
    } else {
        clsName =
            result === 'draw'
                ? 'draw-color'
                : `player-${result.toLowerCase()}-color`;
    }

    return createPortal(
        <dialog className={clsName} ref={dialog}>
            {children}
        </dialog>,
        document.getElementById('modal')
    );
});

export default Modal;
