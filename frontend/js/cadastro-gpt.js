function mostrarAlerta() {
    alert("Botão clicado!");
}

function botaoVoltar() {
    window.location.href = 'index.html'; // O BOTÃO VOLTAR VAI PARA HOME!
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
        event.preventDefault(); // Impede o envio padrão

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

        // Coleta os dados do formulário
        const dados = {
            nome: document.getElementById("nome").value,
            data_nascimento: document.getElementById("data_nascimento").value,
            telefone: document.getElementById("telefone").value,
            email: email.value,
            senha: senha.value,
            estado: estado.value,
            cidade: cidade.value
        };

        // Envia os dados para a API
        fetch('localhost:3000/api/doar/register', { // <-- Altere essa URL para a sua real
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao cadastrar');
            return response.json();
        })
        .then(data => {
            alert("Cadastro realizado com sucesso!");
            console.log("Resposta da API:", data);
            form.reset(); // limpa o formulário
        })
        .catch(error => {
            console.error("Erro ao enviar para API:", error);
            alert("Houve um erro ao realizar o cadastro. Tente novamente.");
        });
    });
});
