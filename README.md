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

## Licença

MIT
