import { forwardRef } from 'react';
import Modal from './Modal';

const SessionModal = forwardRef(function SessionModal(
    { onCancel, onAccept, heading, modalType },
    ref
) {
    // useEffect(() => {
    //     socket.on('receive_join_room_error', () => {
    //         console.log('oops user is not there');
    //     });
    // }, [socket]);

    const result = 'draw'; //used to show the draw-color

    //<button onClick={onRetry}>Retry</button> show this when the user is not found

    return (
        <Modal result={result} ref={ref}>
            <h2>{heading}</h2>
            <div>
                {modalType !== 'awaiting-confirmation' && (
                    <button onClick={onAccept}>Accept</button>
                )}

                <button onClick={onCancel}>Cancel</button>
            </div>
        </Modal>
    );
});

export default SessionModal;
