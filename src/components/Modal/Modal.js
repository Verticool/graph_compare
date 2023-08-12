import './modal.sass';

import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

const Modal = ({ x, y, onClose, data }) => {

    if (!data) {
        return null
    }


    return (
        <div className="modal_overlay" onClick={onClose}>
            <div
                className="modal"
                style={{ top: y - 45, left: x - 70, position: 'absolute' }}>
                <div className="modal_content">
                    <div className="modal_title">
                        {`${data[1]} contributions`}
                    </div>
                    <div className="modal_subtitle">
                        {`${format(parseISO(data[0]), 'EEEE, d MMMM, yyyy', { locale: ru })}`}
                    </div>
                    <span className="modal_rectangle"></span>
                </div>
            </div>
        </div>
    );
};

export default Modal;


