// Fonction pour basculer une classe sur le body
export function toggleBodyClass(className) {
    document.body.classList.toggle(className);
}


import * as bootstrap from "bootstrap";
export function openModal(modalId) {
    const myModal = new bootstrap.Modal(
        document.getElementById(modalId)
    );
    myModal.show();
};
export function closeModal(modalId) {
    const myModal = bootstrap.Modal.getInstance(
        document.getElementById(modalId)
    );
    if (myModal) myModal.hide();
};
