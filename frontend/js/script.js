const products = [
    { name: "Açúcar", quantity: "1 Kg", price: 4.14 },
    { name: "Arroz", quantity: "1 Kg", price: 6.25 },
    { name: "Biscoito", quantity: "360 g", price: 2.98 },
    { name: "Café", quantity: "500 g", price: 14.98 },
    { name: "Extrato de Tomate", quantity: "340 g", price: 3.97 },
    { name: "Farinha de Milho", quantity: "1 Kg", price: 3.20 },
    { name: "Farinha de Trigo", quantity: "1 Kg", price: 3.18 },
    { name: "Feijão", quantity: "1 Kg", price: 5.56 },
    { name: "Leite", quantity: "1 L", price: 4.75 },
    { name: "Massa/Macarrão", quantity: "500 g", price: 2.20 },
    { name: "Óleo de Soja", quantity: "900 ml", price: 6.39 }
];

let total = 0;
let itensSelecionados = [];

const productList = document.getElementById('product-list');
const totalElement = document.getElementById('total');
const itensSelecionadosLista = document.getElementById('itens-selecionados');

products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.innerHTML = `
        <h3>${product.name}</h3>
        <p>Quantidade: ${product.quantity}</p>
        <p>Preço: R$ ${product.price.toFixed(2)}</p>
        <button onclick="adicionarAoCarrinho('${product.name}', ${product.price})">Adicionar</button>
        <button onclick="removerDoCarrinho('${product.name}', ${product.price})">Remover</button>
    `;
    productList.appendChild(productItem);
});

function adicionarAoCarrinho(nome, price) {
    total += price;
    totalElement.textContent = total.toFixed(2);

    //Armazena o valor total no localStorage
    localStorage.setItem('totalDoacao', total.toFixed(2))

    // Verifica se o item já foi adicionado
    const itemExistente = itensSelecionados.find(item => item.nome === nome);
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        itensSelecionados.push({ nome: nome, quantidade: 1 });
    }

    atualizarListaItens();
}

function removerDoCarrinho(nome, price)
{
    const itemExistente = itensSelecionados.find(item => item.nome === nome);
    if (itemExistente)
    {
        itensSelecionados = itensSelecionados.filter(item => item.nome !== nome);
        total -= price * itemExistente.quantidade

        if (total < 0)
        {
            total = 0;
        }
    }

    totalElement.textContent = total.toFixed(2);

    //Armazena o valor total no localStorage
    localStorage.setItem('totalDoacao', total.toFixed(2));
    
    atualizarListaItens();
}

function atualizarListaItens() {
    itensSelecionadosLista.innerHTML = ''; // Limpa a lista
    itensSelecionados.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} (${item.quantidade}x)`;
        itensSelecionadosLista.appendChild(li);
    });
}

function finalizarCompra() {
    if (total > 0) {
        window.location.href = 'pagamento.html'; // Redireciona para a página de endereço
    } else {
        alert('Adicione itens à sacola antes de finalizar a compra.');
    }
}