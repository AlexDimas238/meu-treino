# Meu treino

App de treino de academia que roda no navegador. Os dados ficam salvos no próprio aparelho.

- App online: https://alexdimas238.github.io/meu-treino/
- Arquivo do app: https://alexdimas238.github.io/meu-treino/treino.html

## Recursos

- Treinos separados por dia, com animação de cada exercício: boneco com o músculo trabalhado destacado, ciclo de execução controlado (subida, pausa, descida) e marcações de postura (coluna neutra, articulação que fica fixa, direção do esforço), além de dicas de postura e chips de músculo principal e secundários no card
- Cargas e repetições salvas por exercício, válidas em todos os dias
- Temporizador de descanso com aviso ao fim
- Histórico de sessões com evolução de carga
- Modelos prontos: Full body, ABC, ABCD, Upper/Lower e Push/Pull/Legs
- Montador de treino personalizado
- Treino totalmente editável, catálogo com porções musculares e mapa anatômico, exercícios personalizados
- Funciona offline (service worker)

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

## Editar o treino

Tudo no treino é editável e o histórico nunca é alterado por isso:

- Aba **Treino**: o exercício atual fica aberto e em destaque (**Agora**), com **Registrar série** em um toque, descanso com contagem e barra de progresso e o próximo exercício indicado. As edições (**− série / + série**, repetições alvo, descanso, **↑ Subir / ↓ Descer**, **Pesado**, **Trocar exercício** e **Remover**) ficam no menu **⋯** do card. No fim do dia, **+ Adicionar exercício a este dia**.
- **Escolher exercício pelo corpo**: ao adicionar ou trocar, toque num músculo do mapa (frente/costas, corpo masculino ou feminino). O grupo acende, as porções aparecem como botões e a lista mostra os exercícios com a ativação primária (●●●) e secundária (●○○). Tocar num exercício abre a prévia com o mapa, os passos e a fonte; **Adicionar ao treino** confirma. A busca por texto continua disponível.
- Na aba **Montar**, o editor tem passos (1 nome e dias, 2 exercícios por dia em abas, 3 salvar) e a barra fixa **Cancelar / Salvar / Salvar e usar**; a ordem muda com ↑↓ ou arrastando pelo número. Criar treino do zero, editar (renomear, dias, séries, repetições, carga, descanso, ordem), duplicar e excluir. Os modelos prontos viram uma cópia editável em **Meus treinos** ao tocar em **Usar**.
- Cada registro do histórico guarda o nome do exercício, a categoria, o programa e as séries feitas no momento do registro, então editar ou excluir treinos e exercícios não muda o que já foi registrado.

## Catálogo de exercícios

Mais de 130 exercícios em Peito, Costas, Ombros, Bíceps, Tríceps, Pernas, Abdômen e Antebraço, cada um com as porções musculares ativadas (primárias e secundárias), equipamento e uma fonte curta (estudos de EMG ou revisão). O seletor filtra por categoria, porção e busca. O detalhe mostra um mapa muscular (frente e costas) em estilo de atlas anatômico: corpo cinza claro, porção primária em vermelho vivo e secundária em vermelho claro.

**Exercício personalizado** (Montar → Meus exercícios, ou no seletor): nome ou aparelho, equipamento, categoria, porções (toque para primário, de novo para secundário) e observações. Dá para editar e excluir; ao excluir, ele sai dos treinos, mas continua no histórico.

## Offline

O `sw.js` guarda o app, os ícones e as fotos no aparelho na primeira visita; depois disso tudo funciona sem internet. Com rede, o app consulta `version.json` e, se houver versão nova, atualiza o cache em segundo plano antes de recarregar. Sem rede, a checagem falha em silêncio.

## Adicionar à tela de início

O app pode virar um atalho com ícone próprio, aberto em tela cheia como um aplicativo:

- **iPhone (Safari):** abra https://alexdimas238.github.io/meu-treino/treino.html, toque em **Compartilhar** (quadrado com seta) e em **Adicionar à Tela de Início**. O atalho aparece com o nome **Meu treino**.
- **Android (Chrome):** abra o mesmo endereço, toque no menu (três pontos) e em **Adicionar à tela inicial** ou **Instalar app**.

**Aviso importante (iPhone):** o app aberto pela tela de início roda separado do Safari e tem armazenamento próprio. Os treinos gravados no Safari **não aparecem automaticamente** no atalho. Para levar os dados, faça uma única vez:

1. No Safari, abra o app e use **Copiar backup** (seção Backup, no fim da aba Treino).
2. Abra o app pelo atalho da tela de início e use **Colar backup** → **Importar**.

Depois disso, use sempre o atalho, para que histórico e cargas fiquem em um lugar só.

## Publicar uma nova versão

Antes de cada commit que altere o app, rode:

```sh
./scripts/bump-version.sh
```

O script grava a mesma versão (data e hora UTC) em `version.json`, na constante `APP_VERSION` do `treino.html` e em `VERSION` do `sw.js`. O app consulta `version.json` ao abrir e ao voltar a ficar visível; se a versão mudou, salva os dados e recarrega sozinho (ou mostra "Nova versão disponível · Atualizar" se houver descanso rodando ou campo em edição).

## Créditos

As fotos dos exercícios (`img/ex/`) vêm do [free-exercise-db](https://github.com/yuhonas/free-exercise-db), publicado em domínio público (Unlicense). São 126 exercícios com foto de início e fim do movimento, redimensionadas para 360 px de largura. Os exercícios sem equivalente fiel na base (como a Elevação Pélvica com halter, o Crossover na polia média e a Remada Baixa com pegada aberta) seguem com o ícone e o mapa muscular.

## Licença

MIT
