import { useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

import './Modal.css';

const Modal = forwardRef(function Modal({ onReplay, result }, ref) {
    const dialog = useRef();

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

    return createPortal(
        <dialog
            className={
                result === 'draw'
                    ? 'draw-color'
                    : `player-${result.toLowerCase()}-color`
            }
            ref={dialog}
        >
            <h2>{result === 'draw' ? 'Draw' : `Player ${result} wins`}</h2>
            <div>
                <button onClick={onReplay}>Replay</button>
                <button>Back Home</button>
            </div>
        </dialog>,
        document.getElementById('modal')
    );
});

export default Modal;
