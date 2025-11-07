const form = document.getElementById("formContacto");

    form.addEventListener("submit", function(event)
    {
        event.preventDefault();

        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const asunto = form.asunto.value.trim();
        const motivo = form.motivo.value;
        const mensaje = form.mensaje.value.trim();
        const tipo = form.querySelector("input[name='tipo']:checked");

        if(!nombre)
        {
            alert("Por favor ingrese un nombre válido.");
            return;
        }

        if(!email || !email.includes("@"))
        {
            alert("Por favor ingrese una dirección de correo válida.");
            return;
        }

        if(!asunto)
        {
            alert("Debe ingresar un asunto para el mensaje.");
            return;
        }

        if(!motivo)
        {
            alert("Por favor seleccione un motivo de contacto.");
            return;
        }

        if(!mensaje)
        {
            alert("Por favor escriba su mensaje para completar el formulario. Gracias");
            return;
        }

        if(!tipo)
        {
            alert("Por favor, seleccione su tipo de usuario (Chef, Aficionado, etc.).");
            return;
        }

        alert("¡Mensaje enviado correctamente! Gracias por contactarnos.");
        form.reset();

    });
