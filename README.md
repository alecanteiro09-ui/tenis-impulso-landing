# Impulso Carbon Pro — Landing Page

Landing page estática (HTML/CSS/JS puro, sem build) para o tênis com placa de carbono. Feita pra ir direto pro GitHub + Vercel.

## Estrutura

```
index.html      → toda a página
css/styles.css  → estilos (tokens de cor no topo do arquivo)
js/main.js      → contador, seletor de kit/cor, CTA fixo no mobile
```

## O que ainda falta antes de publicar

- [ ] Trocar as 5 caixas `[FOTO/VÍDEO REAL AQUI]` por imagens reais (ver prompts de IA sugeridos na conversa, ou fotos da SIHI)
- [ ] Trocar os depoimentos marcados como "SUBSTITUIR" pelos primeiros reviews reais
- [ ] Confirmar prazo de entrega real com o painel da SIHI (está como placeholder no FAQ)
- [ ] Confirmar política de garantia/troca de 30 dias com a SIHI antes de publicar esse número
- [ ] Preencher endereço/CNPJ e e-mail de suporte no rodapé
- [ ] Decidir nome de marca e domínio final (está com "Impulso" como placeholder)
- [ ] Conectar o botão de compra (`#btn-comprar` em `js/main.js`) ao checkout com Appmax + criação de pedido na Yampi

## Rodar localmente

```bash
python -m http.server 5500
```

Depois abra http://localhost:5500

## Publicar

1. Criar repositório no GitHub e subir esta pasta.
2. Importar o repositório na Vercel (não precisa de configuração de build — é site estático).
3. Apontar o domínio próprio depois, nas configurações do projeto na Vercel.

## Preços (ajustar em `index.html` e `js/main.js`)

Custo do par na SIHI: **US$ 27,87** (≈ R$ 142,70 no câmbio de referência). Os preços de venda usados agora (R$ 219,90 / R$ 199,90 / R$ 179,90 por kit) são ilustrativos — confirme margem real (taxa Appmax, frete, imposto) antes de fixar.
