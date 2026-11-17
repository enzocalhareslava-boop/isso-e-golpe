# Isso é golpe?

Cole uma mensagem suspeita e veja, com o trecho marcado, os sinais de golpe que ela tem e o que fazer antes de responder, clicar ou pagar.

Toda a conferência acontece no navegador. A mensagem não é enviada para nenhum servidor nem guardada.

## O que ele reconhece

- falso parente que trocou de número
- pedido de código do WhatsApp, senha ou dados do cartão
- falsa central do banco e aplicativo de acesso remoto
- taxa para liberar prêmio, empréstimo ou encomenda
- lucro garantido e dinheiro por tarefas simples
- pedido de segredo, de Pix e criação de pressa
- links encurtados, numéricos, com terminação incomum ou que imitam uma empresa

## Como funciona

A página é estática (HTML, CSS e JavaScript puro, sem framework e sem build). Cada regra em `src/regras.js` tem uma expressão regular e um peso:

| Peso | Significado |
| --- | --- |
| 3 | quase só aparece em golpe; um sinal já dá alerta alto |
| 2 | suspeito |
| 1 | comum, só pesa junto de outros sinais |

Alguns cuidados que o código toma:

- O texto é comparado sem acentos e em minúsculas, mas o trecho marcado aparece como a pessoa escreveu.
- Trechos sobrepostos são unidos antes de marcar, para não repetir texto.
- A mensagem entra na página como texto, nunca como HTML, então uma mensagem maliciosa não executa nada.
- O site nunca afirma que uma mensagem é segura: regras só reconhecem golpes conhecidos.

## Limites

As regras não entendem contexto, então podem deixar passar um golpe novo ou apontar uma mensagem legítima. A ferramenta ajuda a desconfiar, mas não substitui confirmar com a pessoa ou a empresa por um contato conhecido.

## Rodar

```
npx serve .
npm test
```

## Autoria

Projeto de Enzo Calhares Lava, desenvolvido com apoio de IA.
