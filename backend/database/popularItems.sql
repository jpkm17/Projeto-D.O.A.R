
-- script sql para cadastrar items:
-- Script para popular tabela de Categorias e Itens
-- PostgreSQL - Sistema de Doações

-- =====================================================
-- 1. INSERIR CATEGORIAS
-- =====================================================

INSERT INTO categoria (nome, descricao, ativa) values 
('Alimentos', 'Produtos alimentícios básicos e não perecíveis', true),
('Roupas', 'Vestuário e calçados para todas as idades', true),
('Higiene', 'Produtos de higiene pessoal e limpeza', true),
('Medicamentos', 'Medicamentos básicos e materiais de primeiros socorros', true),
('Material Escolar', 'Materiais para educação e aprendizado', true),
('Brinquedos', 'Brinquedos e jogos educativos', true),
('Eletrônicos', 'Equipamentos eletrônicos básicos', true),
('Casa', 'Utensílios domésticos e móveis básicos', true);

-- =====================================================
-- 2. INSERIR ITENS - ALIMENTOS
-- =====================================================

INSERT INTO item (nome, descricao, "valorReferencia", "unidadeMedida", ativo, "categoriaId") VALUES 
-- Alimentos básicos
('Arroz Branco 5kg', 'Arroz branco tipo 1, pacote de 5kg', 25.00, 'pacote', true, 1),
('Feijão Preto 1kg', 'Feijão preto tipo 1, pacote de 1kg', 8.50, 'pacote', true, 1),
('Feijão Carioca 1kg', 'Feijão carioca tipo 1, pacote de 1kg', 9.00, 'pacote', true, 1),
('Açúcar Cristal 1kg', 'Açúcar cristal refinado, pacote de 1kg', 4.50, 'pacote', true, 1),
('Sal Refinado 1kg', 'Sal refinado iodado, pacote de 1kg', 2.00, 'pacote', true, 1),
('Óleo de Soja 900ml', 'Óleo de soja refinado, garrafa de 900ml', 6.00, 'garrafa', true, 1),
('Macarrão Espaguete 500g', 'Macarrão espaguete, pacote de 500g', 3.50, 'pacote', true, 1),
('Farinha de Trigo 1kg', 'Farinha de trigo especial, pacote de 1kg', 5.00, 'pacote', true, 1),
('Leite em Pó 400g', 'Leite em pó integral, lata de 400g', 12.00, 'lata', true, 1),
('Café em Pó 500g', 'Café torrado e moído, pacote de 500g', 8.00, 'pacote', true, 1),
('Extrato de Tomate 340g', 'Extrato de tomate concentrado, lata de 340g', 3.00, 'lata', true, 1),
('Sardinha em Lata 125g', 'Sardinha em óleo, lata de 125g', 4.00, 'lata', true, 1),
('Atum em Lata 170g', 'Atum sólido em óleo, lata de 170g', 5.50, 'lata', true, 1),
('Biscoito Água e Sal 400g', 'Biscoito água e sal, pacote de 400g', 3.50, 'pacote', true, 1),
('Aveia em Flocos 500g', 'Aveia em flocos finos, pacote de 500g', 6.00, 'pacote', true, 1);

-- =====================================================
-- 3. INSERIR ITENS - ROUPAS
-- =====================================================

INSERT INTO item (nome, descricao, "valorReferencia", "unidadeMedida", ativo, "categoriaId") VALUES 
-- Roupas e calçados
('Agasalho Adulto', 'Casaco de moletom adulto, tamanhos variados', 45.00, 'unidade', true, 2),
('Agasalho Infantil', 'Casaco de moletom infantil, tamanhos variados', 35.00, 'unidade', true, 2),
('Camiseta Adulta', 'Camiseta básica adulta, algodão', 20.00, 'unidade', true, 2),
('Camiseta Infantil', 'Camiseta básica infantil, algodão', 15.00, 'unidade', true, 2),
('Calça Jeans Adulta', 'Calça jeans adulta, diversos tamanhos', 50.00, 'unidade', true, 2),
('Calça Jeans Infantil', 'Calça jeans infantil, diversos tamanhos', 35.00, 'unidade', true, 2),
('Meia Adulta', 'Par de meias adultas, algodão', 8.00, 'par', true, 2),
('Meia Infantil', 'Par de meias infantis, algodão', 6.00, 'par', true, 2),
('Tênis Adulto', 'Tênis casual adulto, diversos tamanhos', 80.00, 'par', true, 2),
('Tênis Infantil', 'Tênis casual infantil, diversos tamanhos', 60.00, 'par', true, 2),
('Cueca/Calcinha Adulto', 'Roupa íntima adulta, diversos tamanhos', 12.00, 'unidade', true, 2),
('Cueca/Calcinha Infantil', 'Roupa íntima infantil, diversos tamanhos', 10.00, 'unidade', true, 2),
('Cobertor Solteiro', 'Cobertor acrílico solteiro', 35.00, 'unidade', true, 2),
('Cobertor Casal', 'Cobertor acrílico casal', 50.00, 'unidade', true, 2);

-- =====================================================
-- 4. INSERIR ITENS - HIGIENE
-- =====================================================

INSERT INTO item (nome, descricao, "valorReferencia", "unidadeMedida", ativo, "categoriaId") VALUES 
-- Produtos de higiene
('Sabonete 90g', 'Sabonete em barra, glicerinado', 2.50, 'unidade', true, 3),
('Shampoo 350ml', 'Shampoo para cabelos normais', 8.00, 'frasco', true, 3),
('Condicionador 350ml', 'Condicionador para cabelos normais', 8.50, 'frasco', true, 3),
('Pasta de Dente 90g', 'Creme dental com flúor', 4.00, 'tubo', true, 3),
('Escova de Dente', 'Escova dental macia', 3.50, 'unidade', true, 3),
('Desodorante Roll-on', 'Desodorante antitranspirante roll-on', 6.00, 'unidade', true, 3),
('Papel Higiênico 4 rolos', 'Papel higiênico folha dupla, pacote com 4 rolos', 12.00, 'pacote', true, 3),
('Absorvente Feminino', 'Absorvente higiênico com abas', 8.00, 'pacote', true, 3),
('Fraldas Descartáveis P', 'Fraldas descartáveis tamanho P', 25.00, 'pacote', true, 3),
('Fraldas Descartáveis M', 'Fraldas descartáveis tamanho M', 25.00, 'pacote', true, 3),
('Fraldas Descartáveis G', 'Fraldas descartáveis tamanho G', 25.00, 'pacote', true, 3),
('Sabão em Pó 1kg', 'Sabão em pó concentrado para roupas', 8.00, 'pacote', true, 3),
('Detergente 500ml', 'Detergente líquido neutro', 3.00, 'frasco', true, 3),
('Álcool em Gel 500ml', 'Álcool em gel 70%', 12.00, 'frasco', true, 3);

-- =====================================================
-- 5. INSERIR ITENS - MEDICAMENTOS
-- =====================================================

INSERT INTO item (nome, descricao, "valorReferencia", "unidadeMedida", ativo, "categoriaId") VALUES 
-- Medicamentos básicos
('Paracetamol 500mg', 'Analgésico e antitérmico, caixa com 20 comprimidos', 8.00, 'caixa', true, 4),
('Dipirona 500mg', 'Analgésico e antitérmico, caixa com 10 comprimidos', 6.00, 'caixa', true, 4),
('Soro Fisiológico 250ml', 'Solução fisiológica estéril', 3.00, 'frasco', true, 4),
('Curativo Adesivo', 'Band-aid sortido, caixa com 40 unidades', 8.00, 'caixa', true, 4),
('Gaze Estéril', 'Gaze estéril 7,5x7,5cm, pacote com 10', 5.00, 'pacote', true, 4),
('Esparadrapo 2,5cm', 'Esparadrapo impermeável 2,5cm x 4,5m', 6.00, 'rolo', true, 4),
('Termômetro Digital', 'Termômetro clínico digital', 15.00, 'unidade', true, 4),
('Vitamina C 500mg', 'Suplemento de vitamina C, frasco com 30 comprimidos', 12.00, 'frasco', true, 4);

-- =====================================================
-- 6. INSERIR ITENS - MATERIAL ESCOLAR
-- =====================================================

INSERT INTO item (nome, descricao, "valorReferencia", "unidadeMedida", ativo, "categoriaId") VALUES 
-- Material escolar
('Caderno Universitário', 'Caderno espiral 10 matérias, 200 folhas', 15.00, 'unidade', true, 5),
('Lápis de Escrever', 'Lápis grafite nº 2, madeira', 1.50, 'unidade', true, 5),
('Caneta Esferográfica Azul', 'Caneta esferográfica azul', 2.00, 'unidade', true, 5),
('Caneta Esferográfica Preta', 'Caneta esferográfica preta', 2.00, 'unidade', true, 5),
('Borracha Escolar', 'Borracha branca pequena', 1.00, 'unidade', true, 5),
('Apontador com Depósito', 'Apontador escolar com depósito', 3.00, 'unidade', true, 5),
('Régua 30cm', 'Régua transparente 30cm', 3.50, 'unidade', true, 5),
('Cola Bastão 40g', 'Cola em bastão lavável 40g', 4.00, 'unidade', true, 5),
('Lápis de Cor 12 cores', 'Caixa de lápis de cor com 12 cores', 12.00, 'caixa', true, 5),
('Mochila Escolar', 'Mochila escolar básica', 45.00, 'unidade', true, 5);

-- =====================================================
-- 7. INSERIR ITENS - BRINQUEDOS
-- =====================================================

INSERT INTO item (nome, descricao, "valorReferencia", "unidadeMedida", ativo, "categoriaId") VALUES 
-- Brinquedos
('Boneca Básica', 'Boneca de plástico simples', 25.00, 'unidade', true, 6),
('Carrinho de Brinquedo', 'Carrinho de plástico pequeno', 15.00, 'unidade', true, 6),
('Bola de Futebol', 'Bola de futebol tamanho oficial', 35.00, 'unidade', true, 6),
('Quebra-cabeça 100 peças', 'Quebra-cabeça infantil 100 peças', 20.00, 'unidade', true, 6),
('Jogo de Memória', 'Jogo de memória infantil', 12.00, 'unidade', true, 6),
('Massinha de Modelar', 'Kit massinha de modelar 6 cores', 15.00, 'kit', true, 6);

-- =====================================================
-- 8. INSERIR ITENS - ELETRÔNICOS
-- =====================================================

INSERT INTO item (nome, descricao, "valorReferencia", "unidadeMedida", ativo, "categoriaId") VALUES 
-- Eletrônicos básicos
('Rádio Portátil', 'Rádio AM/FM portátil', 45.00, 'unidade', true, 7),
('Lanterna com Pilhas', 'Lanterna LED com pilhas', 20.00, 'unidade', true, 7),
('Pilhas AA', 'Pilhas alcalinas AA, pacote com 4', 12.00, 'pacote', true, 7),
('Carregador de Celular', 'Carregador universal USB', 25.00, 'unidade', true, 7);

-- =====================================================
-- 9. INSERIR ITENS - CASA
-- =====================================================

INSERT INTO item (nome, descricao, "valorReferencia", "unidadeMedida", ativo, "categoriaId") VALUES 
-- Utensílios domésticos
('Panela Alumínio 3L', 'Panela de alumínio com tampa 3 litros', 35.00, 'unidade', true, 8),
('Prato Fundo', 'Prato fundo de vidro', 8.00, 'unidade', true, 8),
('Copo de Vidro', 'Copo de vidro transparente 250ml', 5.00, 'unidade', true, 8),
('Talheres (Jogo)', 'Jogo de talheres (garfo, faca, colher)', 15.00, 'jogo', true, 8),
('Toalha de Banho', 'Toalha de banho 100% algodão', 25.00, 'unidade', true, 8),
('Toalha de Rosto', 'Toalha de rosto 100% algodão', 15.00, 'unidade', true, 8),
('Lençol Solteiro', 'Jogo de lençol solteiro', 30.00, 'jogo', true, 8),
('Lençol Casal', 'Jogo de lençol casal', 45.00, 'jogo', true, 8),
('Travesseiro', 'Travesseiro de fibra sintética', 20.00, 'unidade', true, 8),
('Fronha', 'Fronha de algodão', 8.00, 'unidade', true, 8);

-- =====================================================
-- VERIFICAÇÃO DOS DADOS INSERIDOS
-- =====================================================

-- Contar itens por categoria
SELECT 
    c.nome as categoria,
    COUNT(i.id) as total_itens
FROM categoria c
LEFT JOIN item i ON c.id = i."categoriaId"
GROUP BY c.id, c.nome
ORDER BY c.nome;

-- Total geral de itens
SELECT COUNT(*) as total_itens_cadastrados FROM item;

-- Listar alguns itens para verificação
SELECT 
    i.nome,
    i."valorReferencia",
    i."unidadeMedida",
    c.nome as categoria
FROM item i
JOIN categoria c ON i."categoriaId" = c.id
ORDER BY c.nome, i.nome
LIMIT 20;