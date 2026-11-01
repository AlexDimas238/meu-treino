# Meu treino

App de treino de academia que roda no navegador. Os dados ficam salvos no próprio aparelho.

- App online: https://alexdimas238.github.io/meu-treino/
- Arquivo do app: https://alexdimas238.github.io/meu-treino/treino.html

## Recursos

- Treinos separados por dia, com animação de cada exercício
- Cargas e repetições salvas por exercício, válidas em todos os dias
- Temporizador de descanso com aviso ao fim
- Histórico de sessões com evolução de carga
- Modelos prontos: Full body, ABC, ABCD, Upper/Lower e Push/Pull/Legs
- Montador de treino personalizado
- Contador de calorias: perfil, gasto estimado por treino, refeições do dia e saldo, com um mascote que reage à semana

## Como usar localmente

Não há instalação nem servidor. Basta abrir o arquivo `treino.html` no navegador.

## Onde os dados ficam

Tudo é guardado no `localStorage` do navegador, ou seja, no próprio aparelho. Limpar os dados do site apaga o histórico e os treinos.

## Backup (exportar e importar)

Na aba **Treino**, no fim da página (depois do botão **Concluir treino**), há a seção **Backup**:

- **Exportar backup** gera o arquivo `meu-treino-backup-AAAA-MM-DD.json` com histórico, cargas, programas e ajustes. No celular, abre a folha de compartilhamento quando ela aceita arquivos (dá para salvar no Drive, iCloud, enviar por WhatsApp etc.); caso contrário, baixa o arquivo.
- **Importar backup** lê um arquivo exportado antes e substitui todos os dados atuais. Antes de aplicar, o app mostra quantos treinos e programas o arquivo tem e pede confirmação. O estado anterior fica guardado para **Desfazer importação**, botão que aparece logo após importar.
- **Copiar backup** coloca o mesmo JSON na área de transferência. Útil no iPhone, onde o download às vezes não aparece: copie, cole em uma nota ou mensagem para você mesmo e, no outro aparelho, use **Colar backup**.
- **Colar backup** abre um campo de texto dentro do card: cole o conteúdo copiado (ou o texto do arquivo .json aberto em um app de arquivos ou notas) e toque em **Importar**. É a alternativa quando o seletor de arquivos do celular não aceita o `.json` ou mostra o arquivo como "não suportado". O app aceita o arquivo exportado, o JSON cru do `localStorage` e até o texto colado com aspas em volta ou codificado duas vezes; a confirmação e o **Desfazer importação** funcionam do mesmo jeito.

Faça o backup **antes de trocar de celular, de navegador ou de endereço do app**: os dados não acompanham você automaticamente, pois ficam presos ao navegador e ao domínio em que o app foi aberto.

## Calorias

A aba **Calorias** junta o que você come com o que gasta no dia e no treino:

- **Perfil** (card "Seu perfil"): sexo, peso, altura, idade e nível de atividade no resto do dia. O app calcula a taxa metabólica basal por Mifflin-St Jeor e multiplica pelo fator de atividade para chegar ao gasto diário. O treino de musculação é somado à parte, então escolha o nível pensando no resto do dia. Dá para informar também o objetivo (manter, perder peso ou ganhar massa).
- **Calorias do treino**: estimadas por MET, `kcal = MET × peso (kg) × minutos ÷ 60`, com MET 5 por padrão (ajustável de 3 a 8 no perfil: 3,5 leve, 5 moderado/vigoroso, 6+ intenso com pouco descanso). O valor é gravado em cada treino ao concluir; treinos antigos usam o peso atual. No **Início**, o card "Calorias por treino" mostra média, total da semana e a evolução treino a treino.
- **Alimentos**: navegue pelos dias com ‹ ›, digite o nome e escolha na tabela embutida de alimentos comuns (kcal por 100 g), informe as gramas e toque em **Adicionar**; ou lance direto nome + kcal. Os últimos alimentos ficam como atalhos de um toque.
- **Saldo**: o card do topo mostra consumido, gasto (gasto diário + treinos daquele dia) e o saldo em **Déficit** (verde), **Superávit** (laranja) ou **Equilíbrio** (diferença menor que 50 kcal), além do resumo dos últimos 7 dias.
- **Mascote**: ao lado do saldo, um personagem fica mais magro, mais forte ou mais largo conforme o saldo médio da semana e a frequência de treino (Secando com músculo, Perdendo peso mas pouca musculação, Ganhando massa, Acumulando gordura ou Manutenção), com uma frase curta de orientação que leva em conta o seu objetivo.

## Adicionar à tela de início

O app pode virar um atalho com ícone próprio, aberto em tela cheia como um aplicativo:

- **iPhone (Safari):** abra https://alexdimas238.github.io/meu-treino/treino.html, toque em **Compartilhar** (quadrado com seta) e em **Adicionar à Tela de Início**. O atalho aparece com o nome **Meu treino**.
- **Android (Chrome):** abra o mesmo endereço, toque no menu (três pontos) e em **Adicionar à tela inicial** ou **Instalar app**.

**Aviso importante (iPhone):** o app aberto pela tela de início roda separado do Safari e tem armazenamento próprio. Os treinos gravados no Safari **não aparecem automaticamente** no atalho. Para levar os dados, faça uma única vez:

1. No Safari, abra o app e use **Copiar backup** (seção Backup, no fim da aba Treino).
2. Abra o app pelo atalho da tela de início e use **Colar backup** → **Importar**.

Depois disso, use sempre o atalho, para que histórico e cargas fiquem em um lugar só.

## Licença

MIT
