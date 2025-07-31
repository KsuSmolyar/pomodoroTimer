import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import type { ModalProps } from "./types";

export const Modal = ({children, onClose}: ModalProps) => {
    const modalEl = document.getElementById("modal-root") as HTMLElement;

    return createPortal(<div className={styles.backdrop} onClick={onClose}>
        <div className={styles.content} onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>, modalEl)
}
