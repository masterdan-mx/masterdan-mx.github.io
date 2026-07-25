// Chatbot vs Agente de IA - Script Interactivo

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Funcionalidad de Copiado de Prompts
    // ==========================================
    const copyButtons = document.querySelectorAll('.btn-copy-prompt');
    const toast = document.getElementById('toast-notification');
    let toastTimeout;

    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const targetId = btn.getAttribute('data-copy-target');
            const targetElem = document.getElementById(targetId);

            if (!targetElem) return;

            // Extraer el texto limpio del prompt (descartando comillas envolventes si existen)
            let textToCopy = targetElem.innerText.trim();
            if (textToCopy.startsWith('"') && textToCopy.endsWith('"')) {
                textToCopy = textToCopy.substring(1, textToCopy.length - 1);
            }

            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Realimentación visual en el botón
                const originalContent = btn.innerHTML;
                btn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>¡Copiado!</span>
                `;
                btn.classList.add('copied');

                // Mostrar notificación Toast
                showToast();

                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.classList.remove('copied');
                }, 2200);

            } catch (err) {
                console.error('Error al copiar al portapapeles: ', err);
            }
        });
    });

    function showToast() {
        if (!toast) return;
        
        toast.classList.add('show');
        clearTimeout(toastTimeout);

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    // ==========================================
    // 2. Modal Lightbox para Infografía
    // ==========================================
    const infografiaCard = document.querySelector('.infografia-card');
    const modal = document.getElementById('infografia-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    if (infografiaCard && modal) {
        // Abrir modal
        infografiaCard.addEventListener('click', () => {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
        });

        // Cerrar modal con botón X
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeModal);
        }

        // Cerrar modal al hacer clic en el fondo oscuro
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Cerrar modal con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

});
