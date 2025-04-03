// Adiciona um ouvinte de evento para quando o formulário for submetido
document.getElementById('enderecoForm').addEventListener('submit', function(event) {
    // Impede o envio do formulário para que o JavaScript possa tratar a ação
    event.preventDefault();

    // Exibe uma mensagem de confirmação indicando que a doação foi confirmada
    alert('Doação confirmada! Um e-mail foi enviado confirmando o local, obrigado por sua generosidade!');

    // Redireciona o usuário para a página inicial após a confirmação
    window.location.href = 'index.html'; // Pode alterar o link conforme necessário
});

// Função para cancelar a doação
function cancelarDoacao() {
    // Exibe uma caixa de diálogo de confirmação para verificar se o usuário deseja cancelar a doação
    if (confirm('Tem certeza que deseja cancelar a doação?')) {
        // Se o usuário confirmar o cancelamento, redireciona para a página inicial
        window.location.href = 'index.html'; // Pode alterar o link conforme necessário
    }
}
