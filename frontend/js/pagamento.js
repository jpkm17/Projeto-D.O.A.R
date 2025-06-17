// // Dados simulados de doação
// const itensDoacao = [
//     { nome: "Cesta Básica", quantidade: 2, valor: 50.00 },
//     { nome: "Leite em Pó", quantidade: 3, valor: 15.00 },
//     { nome: "Fraldas Infantis", quantidade: 1, valor: 35.00 }
// ];

// Configuração da API
const API_BASE_URL = 'http://localhost:3000/api/doar'; // Ajuste conforme sua configuração

// Função para obter parâmetros da URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Buscar dados do usuário no backend
async function buscarDadosUsuario() {
    const idUser = localStorage.getItem('idUser');

    if (!idUser) {
        console.warn('ID do usuário não encontrado no localStorage');
        return null;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/usuario/getOne/${idUser}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Adicione headers de autenticação se necessário
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        alert('Erro ao carregar dados do usuário. Verifique sua conexão.');
        return null;
    }
}

// Preencher formulário com dados do usuário
async function preencherDadosUsuario() {
    const userData = await buscarDadosUsuario();

    if (userData) {
        // Preencher campos do formulário
        if (userData.nome) {
            document.getElementById('nome').value = userData.nome;
        }

        if (userData.email) {
            document.getElementById('email').value = userData.email;
        }

        if (userData.cpf) {
            document.getElementById('cpf').value = formatarCPF(userData.cpf);
        }

        if (userData.telefone) {
            document.getElementById('telefone').value = formatarTelefone(userData.telefone);
        }

        // Adicionar indicador visual de que os dados foram carregados
        const camposPreenchidos = document.querySelectorAll('#nome, #email, #cpf, #telefone');
        camposPreenchidos.forEach(campo => {
            if (campo.value) {
                campo.style.backgroundColor = '#f0f8ff';
                campo.title = 'Dados carregados automaticamente';
            }
        });

        console.log('Dados do usuário carregados com sucesso:', userData);
    }
}


// Carregar dados da doação
async function carregarResumoDoacao() {
    const container = document.getElementById('itens-doacao');
    container.innerHTML = '';

    await preencherDadosUsuario()

    // Tentar recuperar dados da doação do localStorage
    const dadosDoacaoStorage = localStorage.getItem('dadosDoacao');

    if (dadosDoacaoStorage) {
        try {
            dadosDoacao = JSON.parse(dadosDoacaoStorage);

            // Verificar se os dados estão no formato esperado
            if (dadosDoacao && dadosDoacao.itens && dadosDoacao.valorTotal) {
                // Exibir cada item da doação
                dadosDoacao.itens.forEach(item => {
                    container.innerHTML += `
                                <div class="resumo-item">
                                    <span>${item.nome} (${item.quantidade} ${item.unidadeMedida})</span>
                                    <span>R$ ${item.total.toFixed(2).replace('.', ',')}</span>
                                </div>
                            `;
                });

                // Exibir total
                document.getElementById('total-doacao').textContent =
                    `R$ ${dadosDoacao.valorTotal.toFixed(2).replace('.', ',')}`;

                console.log('Dados da doação carregados:', dadosDoacao);
                return;
            }
        } catch (error) {
            console.error('Erro ao processar dados da doação:', error);
            window.history.back()
        }
    }

    // Fallback: usar dados simulados se não houver dados salvos
    console.warn('Dados da doação não encontrados. Usando dados simulados.');

    // Dados simulados baseados no exemplo fornecido
    dadosDoacao = {
        idCampanha: "1",
        itens: [
            {
                necessidadeId: 3,
                itemId: 24,
                nome: "Tênis Adulto",
                preco: 80,
                quantidade: 30,
                total: 2400,
                unidadeMedida: "par"
            },
            {
                necessidadeId: 2,
                itemId: 2,
                nome: "Feijão Preto 1kg",
                preco: 8.5,
                quantidade: 10,
                total: 85,
                unidadeMedida: "pacote"
            },
            {
                necessidadeId: 1,
                itemId: 1,
                nome: "Arroz Branco 5kg",
                preco: 25,
                quantidade: 1,
                total: 25,
                unidadeMedida: "pacote"
            }
        ],
        valorTotal: 2510
    };

    // Exibir dados simulados
    dadosDoacao.itens.forEach(item => {
        container.innerHTML += `
                    <div class="resumo-item">
                        <span>${item.nome} (${item.quantidade} ${item.unidadeMedida})</span>
                        <span>R$ ${item.total.toFixed(2).replace('.', ',')}</span>
                    </div>
                `;
    });

    document.getElementById('total-doacao').textContent =
        `R$ ${dadosDoacao.valorTotal.toFixed(2).replace('.', ',')}`;
}

// Gerar código PIX simulado
function gerarCodigoPix() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 32; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
}

// Copiar código PIX
function copiarCodigoPix() {
    const codigo = document.getElementById('codigo-pix-gerado').textContent;
    navigator.clipboard.writeText(codigo).then(() => {
        alert('Código PIX copiado para a área de transferência!');
    });
}

// Formatação de campos
function formatarCPF(cpf) {
    return cpf.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}

function formatarTelefone(telefone) {
    return telefone.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
}

function formatarCartao(numero) {
    return numero.replace(/\D/g, '')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})\d+?$/, '$1');
}

// Validações
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;

    // Validação simplificada para fins educacionais
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function mostrarErro(campo, mensagem) {
    document.getElementById(campo).classList.add('input-error');
    document.getElementById(`erro-${campo.replace('-', '')}`).textContent = mensagem;
}

function limparErro(campo) {
    document.getElementById(campo).classList.remove('input-error');
    document.getElementById(`erro-${campo.replace('-', '')}`).textContent = '';
}

// Event listeners
document.getElementById('cpf').addEventListener('input', function (e) {
    e.target.value = formatarCPF(e.target.value);
});

document.getElementById('telefone').addEventListener('input', function (e) {
    e.target.value = formatarTelefone(e.target.value);
});

document.getElementById('numero-cartao').addEventListener('input', function (e) {
    e.target.value = formatarCartao(e.target.value);
});

document.getElementById('validade').addEventListener('input', function (e) {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length >= 2) {
        valor = valor.substring(0, 2) + '/' + valor.substring(2, 4);
    }
    e.target.value = valor;
});

document.getElementById('cvv').addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
});

// Mostrar detalhes do método de pagamento
document.getElementById('metodo').addEventListener('change', function () {
    // Esconder todos os detalhes
    document.querySelectorAll('.metodo-detalhes').forEach(el => {
        el.classList.remove('ativo');
    });

    // Mostrar detalhes do método selecionado
    if (this.value) {
        const detalhes = document.getElementById(`detalhes-${this.value}`);
        if (detalhes) {
            detalhes.classList.add('ativo');

            // Gerar código PIX se necessário
            if (this.value === 'pix') {
                document.getElementById('codigo-pix-gerado').textContent = gerarCodigoPix();
            }
        }
    }
});

// Submissão do formulário
document.getElementById('pagamentoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Limpar erros anteriores
    document.querySelectorAll('.input-error').forEach(el => {
        el.classList.remove('input-error');
    });
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });

    // Validações
    let valido = true;
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const metodo = document.getElementById('metodo').value;

    if (!nome || nome.length < 3) {
        mostrarErro('nome', 'Nome completo é obrigatório (mínimo 3 caracteres)');
        valido = false;
    }

    if (!validarEmail(email)) {
        mostrarErro('email', 'E-mail inválido');
        valido = false;
    }

    if (!validarCPF(cpf)) {
        mostrarErro('cpf', 'CPF inválido');
        valido = false;
    }

    if (!metodo) {
        alert('Selecione um método de pagamento');
        valido = false;
    }

    if (!valido) return;

    // Simular processamento
    document.getElementById('loading').classList.add('ativo');
    document.getElementById('btn-confirmar').disabled = true;

    setTimeout(() => {
        // Gerar número de transação
        const numeroTransacao = 'DOE' + Date.now().toString().slice(-8);

        // Salvar dados da transação
        const dadosTransacao = {
            numero: numeroTransacao,
            nome: nome,
            email: email,
            valor: document.getElementById('total-doacao').textContent,
            metodo: metodo,
            data: new Date().toLocaleString('pt-BR')
        };

        // Simular salvamento (em um projeto real, enviaria para servidor)
        sessionStorage.setItem('transacao', JSON.stringify(dadosTransacao));

        alert(`Doação confirmada!\n\nNúmero da transação: ${numeroTransacao}\n\nObrigado por sua generosidade!`);

        // Redirecionar para página de confirmação
        // window.location.href = '#/confirmacao'; // Em um projeto real, seria outra página
    }, 2000);
});

function cancelarPagamento() {
    if (confirm('Tem certeza que deseja cancelar a doação?')) {
        // window.location.href = 'inicio'; // Em um projeto real, voltaria para página inicial
        window.history.back()
    }
}

// Inicializar página
document.addEventListener('DOMContentLoaded', function () {
    carregarResumoDoacao();
});