
    // Função para carregar o valor da doação no campo de valor
    window.onload = function() {
        // Recupera o valor da doação armazenado no localStorage
        const valorDoacao = localStorage.getItem('totalDoacao');
        
        // Verifica se o valor existe no localStorage
        if (valorDoacao) {
            // Preenche o campo de valor com o valor da doação recuperado
            document.getElementById('valor').value = valorDoacao;
        } else {
            // Caso o valor não seja encontrado, pode-se exibir um erro ou fazer alguma ação
            alert("Valor da doação não encontrado. Por favor, tente novamente.");
            // Você pode redirecionar o usuário para a página inicial ou outra página:
            // window.location.href = "index.html";
        }
    }

    // Função de validação antes do envio do formulário
    document.querySelector("form").addEventListener("submit", function(event) {
        // Verifica se o campo "nome" está vazio
        const nome = document.getElementById('nome').value.trim();
        if (!nome) {
            alert("Por favor, insira seu nome.");
            event.preventDefault();  // Impede o envio do formulário
            return;
        }

        // Verifica se o campo "email" está vazio ou se não é um e-mail válido
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            alert("Por favor, insira um e-mail válido.");
            event.preventDefault();  // Impede o envio do formulário
            return;
        }

        // Verifica se o campo "metodo" foi selecionado
        const metodo = document.getElementById('metodo').value;
        if (!metodo) {
            alert("Por favor, selecione o método de pagamento.");
            event.preventDefault();  // Impede o envio do formulário
            return;
        }

        // Se tudo estiver correto, o formulário será enviado
        alert("Pagamento confirmado com sucesso!");
    });


    function voltarParaIndex() {
        // Redireciona para a página inicial
        window.location.href = 'index.html';
    }
    



    // Recupera o valor da doação armazenado no localStorage
const valorDoacao = localStorage.getItem('totalDoacao');

// Preenche o campo de valor automaticamente com o valor da doação
if (valorDoacao) {
    document.getElementById('valor').value = valorDoacao;
}




document.getElementById('pagamentoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio real para processamento
    alert('Pagamento confirmado!');

    // Limpa o valor armazenado no localStorage
    localStorage.removeItem('totalDoacao');

    // Redireciona o usuário para a página de confirmação ou inicial
    window.location.href = 'confirmacao.html';
});

