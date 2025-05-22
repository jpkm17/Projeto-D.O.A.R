const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/doar/usuario/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        if (response.ok) {
            // Obter a resposta JSON e armazenar em uma variável
            const responseData = await response.json();

            console.log('Resposta completa:', responseData);

            // Acessar os dados do usuário e token
            console.log('Dados do usuário:', responseData.usuario);
            console.log('Token JWT:', responseData.token);

            // Salvar o token no localStorage para uso posterior
            localStorage.setItem('authToken', responseData.token);

            // Redirecionar para a página inicial após login bem-sucedido
            window.location.href = 'instituicoes.html';
        } else {
            const data = await response.json();
            alert(data.message || 'Falha no login');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao conectar com o servidor.');
    }
});