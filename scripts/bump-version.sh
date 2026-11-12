#!/bin/sh
# Grava a mesma versão (data+hora UTC) em version.json, na constante APP_VERSION do treino.html e em VERSION do sw.js
# (sw.js mudar é o que faz o navegador instalar o cache novo).
# Rode antes de cada commit que altere o app.
set -e
cd "$(dirname "$0")/.."
V=$(date -u +%Y%m%d%H%M%S)
printf '{"v":"%s"}\n' "$V" > version.json
sed -i.bak -E "s/const APP_VERSION=\"[^\"]*\"/const APP_VERSION=\"$V\"/" treino.html && rm -f treino.html.bak
grep -q "const APP_VERSION=\"$V\"" treino.html || { echo "APP_VERSION não encontrada em treino.html" >&2; exit 1; }
sed -i.bak -E "s/const VERSION=\"[^\"]*\"/const VERSION=\"$V\"/" sw.js && rm -f sw.js.bak
grep -q "const VERSION=\"$V\"" sw.js || { echo "VERSION não encontrada em sw.js" >&2; exit 1; }
echo "Versão: $V"
