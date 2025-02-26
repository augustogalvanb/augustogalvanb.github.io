document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const message = document.getElementById('form-message');
    const spinner = document.getElementById('spinner');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita el envío tradicional

        // Mostrar el spinner y ocultar el mensaje previo
        spinner.style.display = 'block';
        message.style.display = 'none';

        const formData = new FormData(form);
        const formObject = {};

        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        try {
            const response = await fetch('https://email-server-steel.vercel.app/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject)
            });

            if (response.ok) {
                message.style.display = 'block';
                message.style.color = 'green';
                message.textContent = '¡Mensaje enviado con éxito!';
                form.reset(); // Limpia el formulario
            } else {
                throw new Error('Error en el servidor');
            }
        } catch (error) {
            message.style.display = 'block';
            message.style.color = 'red';
            message.textContent = 'Hubo un error al enviar el mensaje. Intenta de nuevo.';
        } finally {
            // Ocultar el spinner siempre, sea éxito o error
            spinner.style.display = 'none';
        }
    });
});