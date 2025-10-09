import { useRef, forwardRef, useImperativeHandle, useContext } from 'react';
import { createPortal } from 'react-dom';
import { GameContext } from '../store/game-context';
import './Modal.css';

const Modal = forwardRef(function Modal({ result, children }, ref) {
    const dialog = useRef();
    const { gameType } = useContext(GameContext);

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
