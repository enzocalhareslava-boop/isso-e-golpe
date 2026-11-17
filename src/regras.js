// Cada regra procura um padrão de golpe comum no Brasil. O texto é comparado
// em minúsculas e sem acentos, então os padrões também são escritos assim.
// peso 3 = quase só aparece em golpe; 2 = suspeito; 1 = comum, só pesa junto de outros.
export const REGRAS = [
  {
    id: 'numero-novo',
    peso: 3,
    titulo: 'Diz que trocou de número',
    explicacao: 'É o começo do golpe do falso parente. Ligue para o número antigo antes de responder.',
    padrao: /(troquei|mudei|perdi)\b.{0,20}\b(numero|celular|chip)|(numero|celular) novo|meu novo (numero|contato)/,
  },
  {
    id: 'pede-codigo',
    peso: 3,
    titulo: 'Pede um código recebido por SMS ou WhatsApp',
    explicacao: 'Esse código dá acesso à sua conta. Nenhuma empresa precisa que você o repasse.',
    padrao: /(passa|manda|envia|informe|confirme|repasse|me diga|digite)\b.{0,30}\bcodigo|codigo\b.{0,30}\b(chegou|recebeu|que te enviamos|sms|whatsapp)/,
  },
  {
    id: 'dados-sensiveis',
    peso: 3,
    titulo: 'Pede senha ou dados do cartão',
    explicacao: 'Bancos e empresas não pedem senha, token ou código de segurança por mensagem.',
    padrao: /(informe|confirme|atualize|envie|digite|passe|manda)\b.{0,40}\b(senha|cvv|token|dados do cartao|numero do cartao|codigo de seguranca)/,
  },
  {
    id: 'acesso-remoto',
    peso: 3,
    titulo: 'Pede para instalar um aplicativo de acesso',
    explicacao: 'Com um aplicativo assim, outra pessoa pode controlar o seu celular e entrar no seu banco.',
    padrao: /anydesk|teamviewer|rustdesk|acesso remoto|(instale|baixe)\b.{0,30}\b(aplicativo|app)\b.{0,20}\b(seguranca|protecao|suporte)/,
  },
  {
    id: 'taxa-antecipada',
    peso: 3,
    titulo: 'Cobra uma taxa para liberar algo',
    explicacao: 'Pedir pagamento antes de liberar prêmio, empréstimo ou encomenda é um golpe clássico.',
    padrao: /taxa\b.{0,30}\b(liberacao|liberar|entrega|desembaraco|cadastro|adesao|seguro)|(pague|pagar|deposite|depositar|pix)\b.{0,40}\b(para|pra) (liberar|receber|desbloquear)/,
  },
  {
    id: 'lucro-garantido',
    peso: 3,
    titulo: 'Promete lucro garantido',
    explicacao: 'Nenhum investimento legítimo garante lucro alto e rápido.',
    padrao: /(lucro|retorno|rendimento|ganho)s? (garantid\w*|certo)|dobr(e|ar|amos) (o )?seu dinheiro|(lucro|retorno|rendimento) de \d+ ?%/,
  },
  {
    id: 'trabalho-facil',
    peso: 3,
    titulo: 'Oferece dinheiro por tarefas simples',
    explicacao: 'Depois de pagar valores pequenos, esse golpe pede que você deposite para continuar.',
    padrao: /(curtir|curtindo|avaliar|avaliando|assistir|assistindo|seguir)\b.{0,30}\b(videos?|produtos?|perfis|instagram|tiktok|youtube)\b.{0,60}\b(ganh|receb|r\$|renda|pagamos)|(ganh|receb)\w*\b.{0,40}\b(curtir|curtindo|avaliar|avaliando|assistir|assistindo)/,
  },
  {
    id: 'segredo',
    peso: 2,
    titulo: 'Pede segredo',
    explicacao: 'Pedir que você não conte a ninguém serve para impedir que alguém avise que é golpe.',
    padrao: /nao (conte|conta|fale|fala|comente|avise)\b.{0,20}\b(ninguem|familia|gerente|banco)|fica entre (a gente|nos)|(nosso|em|e) segredo/,
  },
  {
    id: 'alerta-banco',
    peso: 2,
    titulo: 'Avisa de problema na sua conta ou compra',
    explicacao: 'Não use o contato da mensagem. Abra o aplicativo do banco ou ligue para o número do cartão.',
    padrao: /compra (nao reconhecida|suspeita|aprovada)|conta\b.{0,30}\b(bloquead\w*|suspens\w*|invadid\w*|desativad\w*|encerrad\w*)|central de seguranca|cartao\b.{0,20}\b(clonado|bloqueado)/,
  },
  {
    id: 'encomenda',
    peso: 2,
    titulo: 'Fala de encomenda retida',
    explicacao: 'Consulte o código de rastreio no site oficial, sem usar o link recebido.',
    padrao: /(encomenda|pacote|objeto|entrega)\b.{0,40}\b(retid\w*|taxad\w*|pendente|aguardando pagamento|nao entregue)/,
  },
  {
    id: 'premio',
    peso: 2,
    titulo: 'Diz que você ganhou um prêmio',
    explicacao: 'Desconfie de prêmio de um sorteio do qual você não se lembra de ter participado.',
    padrao: /voce (ganhou|foi sorteado|foi selecionad\w*)|parabens\b.{0,40}\b(ganhou|premio|sorteado)|resgat\w+\b.{0,20}\b(premio|brinde|bonus)/,
  },
  {
    id: 'orgao-publico',
    peso: 2,
    titulo: 'Usa o nome do governo ou de dívidas',
    explicacao: 'Consulte só nos sites gov.br. Órgãos públicos não cobram por link de mensagem.',
    padrao: /cpf\b.{0,20}\b(irregular|bloqueado|suspenso|cancelado)|valores a receber|indenizacao|nome\b.{0,30}\b(negativad\w*|protestad\w*|sujo)|limpa nome|multa\b.{0,30}\b(vence|pague|desconto)/,
  },
  {
    id: 'pix-pressa',
    peso: 2,
    titulo: 'Pede Pix ou transferência',
    explicacao: 'Pix cai na hora e é difícil de recuperar. Confirme com a pessoa por ligação antes de pagar.',
    padrao: /(faz|faca|manda|envia|preciso de|me empresta|empresta)\b.{0,30}\b(pix|transferencia|deposito)|chave pix/,
  },
  {
    id: 'urgencia',
    peso: 1,
    titulo: 'Cria pressa',
    explicacao: 'A pressa faz você decidir sem conferir. Pare um minuto e confirme por outro canal.',
    padrao: /urgente|imediatamente|ultim[ao]s? (chance|horas|dia)|so hoje|ainda hoje|em ate \d+ ?(h|hora|min)|agora mesmo|prazo (final|termina)|sera (bloquead\w*|cancelad\w*|suspens\w*)/,
  },
]

const ENCURTADORES = /^(bit\.ly|tinyurl\.com|cutt\.ly|encurtador\.com\.br|t\.co|is\.gd|rb\.gy|shorturl\.at|abre\.ai)$/
const DOMINIOS_ESTRANHOS = /\.(top|xyz|click|icu|cfd|sbs|buzz|live|shop|online|site|info)$/
const MARCAS = ['correios', 'caixa', 'nubank', 'itau', 'bradesco', 'santander', 'bancodobrasil', 'receita', 'serasa', 'mercadolivre', 'shopee', 'detran']
const OFICIAIS = /(^|\.)(correios\.com\.br|caixa\.gov\.br|nubank\.com\.br|itau\.com\.br|bradesco\.com\.br|santander\.com\.br|bb\.com\.br|gov\.br|serasa\.com\.br|mercadolivre\.com\.br|shopee\.com\.br)$/

// Sem acentos e em minúsculas, mantendo um caractere por caractere do original
// para que o trecho encontrado possa ser mostrado como a pessoa escreveu.
function normalizar(texto) {
  return Array.from(texto, (c) => {
    const limpo = c.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
    return limpo.length === c.length ? limpo : c
  }).join('')
}

function acharDominios(normalizado) {
  const achados = normalizado.matchAll(/\b(?:https?:\/\/)?((?:[a-z0-9-]+\.)+[a-z]{2,}|\d{1,3}(?:\.\d{1,3}){3})(?:[/?#:]\S*)?/g)
  return [...achados].map((m) => ({ dominio: m[1], inicio: m.index, fim: m.index + m[0].length }))
}

function sinaisDeLink(normalizado, original) {
  const sinais = []
  for (const { dominio, inicio, fim } of acharDominios(normalizado)) {
    const trecho = original.slice(inicio, fim)
    if (ENCURTADORES.test(dominio)) {
      sinais.push({ id: 'link-encurtado', peso: 2, inicio, fim, trecho, titulo: 'Usa um link encurtado', explicacao: 'O encurtador esconde o site de destino. Não toque antes de saber para onde ele leva.' })
    } else if (/^\d/.test(dominio)) {
      sinais.push({ id: 'link-ip', peso: 3, inicio, fim, trecho, titulo: 'O link é só um número', explicacao: 'Empresas de verdade usam um nome de site, não um endereço numérico.' })
    } else if (!OFICIAIS.test(dominio) && MARCAS.some((m) => dominio.replace(/[.-]/g, '').includes(m))) {
      sinais.push({ id: 'link-imita-marca', peso: 3, inicio, fim, trecho, titulo: 'O link imita o nome de uma empresa', explicacao: 'O nome aparece no endereço, mas o site não é o oficial. Digite o endereço da empresa você mesmo.' })
    } else if (DOMINIOS_ESTRANHOS.test(dominio)) {
      sinais.push({ id: 'link-estranho', peso: 2, inicio, fim, trecho, titulo: 'O link tem uma terminação incomum', explicacao: 'Terminações como essa são baratas e muito usadas em páginas falsas.' })
    }
  }
  return sinais
}

// Divide o texto em pedaços marcados e não marcados, juntando trechos sobrepostos.
function dividirTrechos(texto, sinais) {
  const faixas = sinais.map(({ inicio, fim }) => [inicio, fim]).sort((a, b) => a[0] - b[0])
  const pedacos = []
  let pos = 0
  for (const [inicio, fim] of faixas) {
    if (fim <= pos) continue
    const comeco = Math.max(inicio, pos)
    if (comeco > pos) pedacos.push({ texto: texto.slice(pos, comeco), marcado: false })
    pedacos.push({ texto: texto.slice(comeco, fim), marcado: true })
    pos = fim
  }
  if (pos < texto.length) pedacos.push({ texto: texto.slice(pos), marcado: false })
  return pedacos
}

// O nível nunca afirma que a mensagem é segura: regras só reconhecem golpes
// conhecidos, e não achar nada não prova que não há golpe.
export function analisar(texto) {
  const original = String(texto ?? '').normalize('NFC')
  const normalizado = normalizar(original)

  const sinais = []
  for (const { padrao, ...regra } of REGRAS) {
    const m = padrao.exec(normalizado)
    if (m) sinais.push({ ...regra, inicio: m.index, fim: m.index + m[0].length, trecho: original.slice(m.index, m.index + m[0].length) })
  }
  const vistos = new Set()
  for (const sinal of sinaisDeLink(normalizado, original)) {
    if (!vistos.has(sinal.id)) sinais.push(sinal)
    vistos.add(sinal.id)
  }
  sinais.sort((a, b) => b.peso - a.peso)

  const pontos = sinais.reduce((soma, s) => soma + s.peso, 0)
  const nivel = pontos >= 4 || sinais.some((s) => s.peso === 3) ? 'alto' : pontos >= 2 ? 'atencao' : 'sem-sinais'
  return { nivel, pontos, sinais, pedacos: dividirTrechos(original, sinais) }
}
