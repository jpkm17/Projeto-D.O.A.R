function mostrarAlerta() {
    alert("Botão clicado!");
}

function botaoVoltar()
{
    window.location.href = 'index.html' //O BOTÃO VOLTAR VAI PARA HOME!
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const email = document.getElementById("email");
    const confirmarEmail = document.getElementById("confirmar_email");
    const senha = document.getElementById("senha");
    const confirmarSenha = document.getElementById("confirmar_senha");
    const estado = document.getElementById("estado");
    const cidade = document.getElementById("cidade");
    
    // Lista de cidades por estado
    const cidadesPorEstado = {
        SP: ["Americana", "Campinas", "Santa Barbara d'Oeste", "Nova Odessa"],
       
    };

    estado.addEventListener("change", function () {
        const estadoSelecionado = estado.value;
        cidade.innerHTML = ""; // Limpa as opções existentes
        
        if (estadoSelecionado && cidadesPorEstado[estadoSelecionado]) {
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Selecione uma cidade";
            cidade.appendChild(defaultOption);
            
            cidadesPorEstado[estadoSelecionado].forEach(cidadeNome => {
                const option = document.createElement("option");
                option.value = cidadeNome;
                option.textContent = cidadeNome;
                cidade.appendChild(option);
            });
        }
    });

    form.addEventListener("submit", function (event) {
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

        if (!valid) {
            event.preventDefault(); // Impede o envio do formulário se houver erro
        }else {
            event.preventDefault(); // Impede o envio real para exibir a mensagem
            alert("Cadastro realizado com sucesso!");
            form.reset(); // Opcional: limpa o formulário após confirmação
        }
    });
});