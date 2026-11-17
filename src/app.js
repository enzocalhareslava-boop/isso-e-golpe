import { analisar } from './regras.js'

const EXEMPLOS = {
  parente: 'Oi mãe, troquei de número, salva esse aqui. Estou com um problema no banco e preciso de um pix urgente de R$ 1.200. Amanhã te devolvo, não conta para ninguém da família.',
  encomenda: 'CORREIOS: sua encomenda está retida. Pague a taxa de liberação de R$ 19,90 ainda hoje em correios-rastreio.top/pagar para evitar a devolução.',
  banco: 'Central de Segurança: compra não reconhecida de R$ 2.349,90 no seu cartão. Para cancelar, instale o app de segurança AnyDesk e informe a senha ao atendente imediatamente.',
}

const VEREDITOS = {
  alto: {
    titulo: 'Tem cara de golpe',
    conselho: 'Não pague, não clique e não passe códigos. Fale com a pessoa ou a empresa por um contato que você já tinha.',
  },
  atencao: {
    titulo: 'Desconfie desta mensagem',
    conselho: 'Há sinais suspeitos. Antes de fazer qualquer coisa, confirme por um contato que você já tinha.',
  },
  'sem-sinais': {
    titulo: 'Nenhum sinal conhecido',
    conselho: 'Isso não quer dizer que a mensagem é segura. Se ela pedir dinheiro ou dados, confirme antes.',
  },
}

const $ = (id) => document.getElementById(id)

function mostrarMensagem(pedacos) {
  const destino = $('mensagem-marcada')
  destino.replaceChildren(
    ...pedacos.map(({ texto, marcado }) => {
      if (!marcado) return document.createTextNode(texto)
      const mark = document.createElement('mark')
      mark.textContent = texto
      return mark
    }),
  )
}

function mostrarSinais(sinais) {
  $('sinais').replaceChildren(
    ...sinais.map(({ titulo, explicacao }) => {
      const item = document.createElement('li')
      const nome = document.createElement('strong')
      nome.textContent = titulo
      const texto = document.createElement('p')
      texto.textContent = explicacao
      item.append(nome, texto)
      return item
    }),
  )
}

function conferir(texto) {
  const { nivel, sinais, pedacos } = analisar(texto)
  const veredito = VEREDITOS[nivel]

  $('veredito').dataset.nivel = nivel
  $('veredito-titulo').textContent = veredito.titulo
  $('veredito-conselho').textContent = veredito.conselho
  $('bloco-mensagem').hidden = sinais.length === 0
  mostrarMensagem(pedacos)
  mostrarSinais(sinais)

  $('resultado').hidden = false
  $('veredito-titulo').focus({ preventScroll: true })
  const movimento = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  $('resultado').scrollIntoView({ behavior: movimento, block: 'start' })
}

$('form').addEventListener('submit', (evento) => {
  evento.preventDefault()
  const texto = $('mensagem').value.trim()
  $('aviso').hidden = texto !== ''
  if (texto) conferir(texto)
  else $('mensagem').focus()
})

$('mensagem').addEventListener('input', () => {
  $('aviso').hidden = true
})

document.querySelectorAll('[data-exemplo]').forEach((botao) => {
  botao.addEventListener('click', () => {
    $('mensagem').value = EXEMPLOS[botao.dataset.exemplo]
    $('aviso').hidden = true
    conferir($('mensagem').value)
  })
})

// O link leva só o endereço do site, nunca a mensagem conferida.
$('compartilhar').href = 'https://wa.me/?text=' + encodeURIComponent(`Antes de responder mensagem estranha, confere aqui: ${location.origin}${location.pathname}`)
