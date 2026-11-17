import test from 'node:test'
import assert from 'node:assert/strict'
import { analisar } from '../src/regras.js'

const ids = (texto) => analisar(texto).sinais.map((s) => s.id)

const GOLPES = [
  ['falso parente', 'Oi mãe, troquei de número, salva esse. Preciso de um pix urgente, depois te explico', 'numero-novo'],
  ['código do WhatsApp', 'Te enviei um código por engano, me passa o código que chegou aí por SMS?', 'pede-codigo'],
  ['falsa central', 'Compra não reconhecida de R$ 1.890. Instale o app de segurança AnyDesk para cancelar.', 'acesso-remoto'],
  ['senha', 'Seu acesso expirou. Confirme sua senha e o token para continuar.', 'dados-sensiveis'],
  ['encomenda', 'CORREIOS: sua encomenda está retida. Pague a taxa de liberação em correios-rastreio.top/pagar', 'taxa-antecipada'],
  ['investimento', 'Grupo VIP com lucro garantido, rendimento de 30% ao mês!', 'lucro-garantido'],
  ['tarefas', 'Vaga home office: ganhe R$ 300 por dia curtindo vídeos no TikTok', 'trabalho-facil'],
]

for (const [nome, texto, id] of GOLPES) {
  test(`detecta golpe: ${nome}`, () => {
    const r = analisar(texto)
    assert.equal(r.nivel, 'alto')
    assert.ok(ids(texto).includes(id), `faltou ${id}: ${ids(texto)}`)
  })
}

const NORMAIS = [
  'Oi, tudo bem? Vamos almoçar amanhã às 12h?',
  'Sua consulta está confirmada para sexta às 14h.',
  'Mãe, cheguei em casa. Te ligo depois da aula.',
  'Reunião da Facens mudou para a sala 12. Leva o caderno de banco de dados.',
  'Veja a previsão em https://www.gov.br/inmet',
  'Pode ir tranquilo, sem risco de chuva hoje.',
  'O segredo da receita é deixar a massa descansar.',
]

for (const texto of NORMAIS) {
  test(`não acusa mensagem comum: ${texto.slice(0, 30)}`, () => {
    assert.equal(analisar(texto).nivel, 'sem-sinais')
  })
}

test('funciona sem acento e em maiúsculas', () => {
  assert.ok(ids('TROQUEI DE NUMERO').includes('numero-novo'))
})

test('o trecho mantém o texto original', () => {
  const [sinal] = analisar('Oi, TROQUEI de número ontem').sinais
  assert.equal(sinal.trecho, 'TROQUEI de número')
})

test('link que imita marca é apontado, e o oficial não', () => {
  assert.ok(ids('Veja em nubank-seguro.com/login').includes('link-imita-marca'))
  assert.ok(!ids('Veja em https://nubank.com.br').includes('link-imita-marca'))
  assert.ok(!ids('Veja em https://www.correios.com.br/rastreio').includes('link-imita-marca'))
})

test('aponta link encurtado e link numérico', () => {
  assert.ok(ids('clique: bit.ly/abc').includes('link-encurtado'))
  assert.ok(ids('acesse http://192.168.10.5/banco').includes('link-ip'))
})

test('sinal fraco sozinho não vira alerta', () => {
  assert.equal(analisar('É urgente, me liga').nivel, 'sem-sinais')
})

test('texto vazio não quebra', () => {
  assert.deepEqual(analisar(''), { nivel: 'sem-sinais', pontos: 0, sinais: [], pedacos: [] })
  assert.equal(analisar(null).nivel, 'sem-sinais')
})

test('os pedaços remontam o texto e marcam sem repetir trechos sobrepostos', () => {
  const texto = 'Oi, troquei de número. Faz um pix urgente, chave pix aqui'
  const { pedacos } = analisar(texto)
  assert.equal(pedacos.map((p) => p.texto).join(''), texto)
  assert.ok(pedacos.some((p) => p.marcado && p.texto.includes('troquei')))
  assert.ok(pedacos.some((p) => !p.marcado))
})

test('reconhece pedido de segredo escrito no dia a dia', () => {
  assert.ok(ids('não conta para ninguém da família').includes('segredo'))
})

test('o trecho marcado não corta a palavra no meio', () => {
  const { sinais } = analisar('Sua encomenda está retida no centro')
  assert.equal(sinais[0].trecho, 'encomenda está retida')
})
