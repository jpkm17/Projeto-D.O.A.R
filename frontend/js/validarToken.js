async function validarToken() {
    const idUser = localStorage.getItem("idUser")
    const token = localStorage.getItem("authToken")

    if (!idUser && !token) {
        window.location.href = '../login.html'
        return
    }

    try {
        let response = await fetch('http://localhost:3000/api/doar/usuario/validarToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });

        if (!response.ok) {
            // Lança um erro personalizado com o status
            throw new Error(`${response.statusText}`);
        }

        const data = await response.json();
        // Verificações com data.sub etc...

    } catch (error) {
        console.error('Erro ao validar token:', error);
        alert(error.message+ ': Erro ao validar token,'   + ' redirecionando para tela de login');
        window.location.href = '../login.html'
    }
}

validarToken()