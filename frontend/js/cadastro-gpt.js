// Função para voltar à página anterior
function botaoVoltar() {
    window.history.back();
}

// Aguarda o DOM ser completamente carregado
document.addEventListener("DOMContentLoaded", function() {
    // Captura o elemento do formulário
    const form = document.getElementById("form-cadastro");
    
    // Captura elementos para validação
    const email = document.getElementById("email");
    const confirmarEmail = document.getElementById("confirmar_email");
    const senha = document.getElementById("senha");
    const confirmarSenha = document.getElementById("confirmar_senha");
    
    // Adiciona máscara para o campo de telefone
    const telefone = document.getElementById("telefone");
    // if (telefone) {
    //     telefone.addEventListener("input", function(e) {
    //         let value = e.target.value.replace(/\D/g, "");
            
    //         // Limita a 11 dígitos (DDD + número)
    //         if (value.length > 11) {
    //             value = value.slice(0, 11);
    //         }
            
    //         // Formata como (XX) XXXXX-XXXX
    //         if (value.length > 2) {
    //             value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
    //         }
    //         if (value.length > 10) {
    //             value = `${value.substring(0, 10)}-${value.substring(10)}`;
    //         }
            
    //         e.target.value = value;
    //     });
    // }

    // Adiciona listener para submissão do formulário
    if (form) {
        form.addEventListener("submit", function(event) {
            // Impede o envio padrão do formulário
            event.preventDefault();
            
            let valid = true;
            
            // Validação de e-mail
            if (email.value !== confirmarEmail.value) {
                alert("Os e-mails não coincidem.");
                valid = false;
            }
            
            // Validação de senha
            if (senha.value !== confirmarSenha.value) {
                alert("As senhas não coincidem.");
                valid = false;
            }
            
            if (!valid) return;
            
            // Exibe indicador de carregamento
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.textContent;
                submitButton.textContent = "Enviando...";
                submitButton.disabled = true;
            }

            
            // Coleta os dados do formulário
            const dados = {
                nome: document.getElementById("nome").value,
                data_nascimento: document.getElementById("data_nascimento").value,
                telefone: document.getElementById("telefone").value.replace(/\D/g, ""), // Remove não-dígitos
                email: email.value,
                senha: String(senha.value),
                cpf: document.getElementById("cpf").value
            };
            
            
            // Envia os dados para a API
            fetch('http://localhost:3000/api/doar/usuario/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(dados)
            })
            .then(response => {
                // Verifica se há problemas com a resposta
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`Erro ${response.status}: ${text || response.statusText}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                alert("Cadastro realizado com sucesso!");
                form.reset(); // Limpa o formulário
                
                // Opcional: redirecionar após sucesso
                window.location.href = "./login.html";
            })
            .catch(error => {
                console.error("Erro ao enviar para API:", error);
                
                if (error.message.includes("405")) {
                    alert("Erro no servidor: método não permitido. Entre em contato com o suporte.");
                } else {
                    alert("Houve um erro ao realizar o cadastro: " + error.message);
                }
            })
            .finally(() => {
                // Restaura o botão de envio
                if (submitButton) {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }
            });
        });
    } else {
        console.error("Formulário não encontrado! Verifique se o ID 'form-cadastro' existe.");
    }
});