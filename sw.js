/* Service worker do Meu treino: funciona 100% offline com o que já está no aparelho.
   - Instalação: guarda o app (HTML, manifest, ícones) e todas as fotos de img/ex no cache desta versão.
   - Páginas e arquivos do app: responde do cache na hora; se não houver, busca na rede (com tempo limite).
   - version.json: sempre da rede (é o que o app usa para saber se há versão nova); offline, falha e o app ignora.
   - Mensagem "refresh": rebaixa os arquivos do app em segundo plano e avisa a página quando terminar.
   Caminhos relativos ao próprio sw.js, então funciona no GitHub Pages em subpasta. VERSION é gravada por scripts/bump-version.sh. */
const VERSION="20261112193138";
const CACHE="meu-treino-"+VERSION;
const RUNTIME="meu-treino-runtime";
const SHELL=["./","index.html","treino.html","humanoid.js","manifest.webmanifest","icons/favicon.svg","icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","icons/icon-512-maskable.png"];
const PHOTOS=["supino_reto","supino_reto_neutra","supino_incl","supino_incl_neutra","crucifixo","crucifixo_incl","flexao","puxada_romana","puxada_triangulo","remada_unil","remada_curvada","remada_tri_sentada","barra_fixa","rosca_direta","rosca_alternada","rosca_martelo","rosca_inclinada","rosca_concentrada","triceps_frances","triceps_frances_unil","triceps_testa","triceps_coice","triceps_corda","desenv_sentado","arnold","elev_lateral","elev_posterior","goblet","stiff","bulgaro","afundo","mesa_flexora","abd_crunch","abd_infra","abd_maquina","abd_polia","afundo_reverso","agach_corporal","agachamento_frontal","agachamento_livre","agachamento_smith","barra_pronada","barra_supinada","bicicleta","bom_dia","cadeira_abdutora","cadeira_adutora","cadeira_extensora","cadeira_flexora","crossover_alto","crossover_baixo","crucifixo_inverso","crucifixo_inverso_polia","dead_bug","desenv_barra","desenv_maquina","elev_frontal","elev_frontal_anilha","elev_pernas","elev_pernas_barra","encolhimento","encolhimento_barra","face_pull","farmer","flexao_decl","flexao_diamante","flexao_incl","flexora_em_pe","gluteo_polia","hack","hip_thrust_barra","hiperextensao","kb_swing","leg_press","lenhador","levantamento_terra","mergulho_banco","nordic","pallof","pant_leg","pant_pe","pant_sentado","paralelas","passada","peck_deck","ponte_gluteo","prancha","prancha_lateral","pulldown","pullover","puxada_frente","puxada_supinada","remada_alta","remada_barra","remada_cavalinho","remada_maquina","roda","rosca_barra","rosca_barra_w","rosca_cruzada","rosca_inversa","rosca_martelo_corda","rosca_polia","rosca_punho","rosca_punho_inversa","rosca_scott","rosca_scott_maquina","rosca_zottman","russian_twist","subida_banco","sumo","superman","supino_barra","supino_decl","supino_decl_halter","supino_fechado","supino_incl_barra","supino_maquina","supino_smith_incl","terra_romeno","triceps_barra","triceps_frances_polia","triceps_inverso","triceps_testa_barra","triceps_unil_polia","triceps_v"].flatMap(id=>["img/ex/"+id+"-0.jpg","img/ex/"+id+"-1.jpg"]);

function fetchT(req,ms){
  const ac=new AbortController();const t=setTimeout(()=>ac.abort(),ms);
  return fetch(req,{signal:ac.signal}).finally(()=>clearTimeout(t));
}
/* Baixa cada arquivo sem o cache HTTP; um arquivo que falhe não derruba os demais */
async function fill(cache,list){
  await Promise.all(list.map(async u=>{
    try{const r=await fetchT(new Request(u,{cache:"reload"}),15000);if(r&&r.ok)await cache.put(u,r);}catch(e){}
  }));
  /* sem o HTML principal o app não abre offline: falha a instalação para o navegador tentar de novo */
  if(!(await cache.match("treino.html")))throw new Error("treino.html não foi guardado no cache");
}
self.addEventListener("install",ev=>{
  ev.waitUntil((async()=>{
    const c=await caches.open(CACHE);
    /* copia o que a versão anterior já tinha, para nada sumir se a rede cair no meio */
    for(const k of await caches.keys()){
      if(k===CACHE||!k.startsWith("meu-treino-")||k===RUNTIME)continue;
      const old=await caches.open(k);
      for(const req of await old.keys()){const r=await old.match(req);if(r)await c.put(req,r);}
    }
    await fill(c,SHELL.concat(PHOTOS));
    await self.skipWaiting();
  })());
});
self.addEventListener("activate",ev=>{
  ev.waitUntil((async()=>{
    for(const k of await caches.keys())if(k.startsWith("meu-treino-")&&k!==CACHE&&k!==RUNTIME)await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener("message",ev=>{
  if(!ev.data||ev.data.type!=="refresh")return;
  const src=ev.source;
  ev.waitUntil((async()=>{
    try{await fill(await caches.open(CACHE),SHELL);}catch(e){}
    try{src&&src.postMessage({type:"refreshed"});}catch(e){}
  })());
});
self.addEventListener("fetch",ev=>{
  const req=ev.request;
  if(req.method!=="GET")return;
  const url=new URL(req.url);
  if(url.origin===location.origin){
    if(url.pathname.endsWith("/version.json"))return;           /* rede direta; o app trata a falha */
    ev.respondWith((async()=>{
      const c=await caches.open(CACHE);
      /* ignora ?v=... usado para furar o cache do Pages ao recarregar */
      const hit=await c.match(req,{ignoreSearch:true});
      if(hit)return hit;
      try{
        const r=await fetchT(req,8000);
        if(r&&r.ok&&url.pathname.indexOf("/img/")>=0)c.put(req,r.clone());
        return r;
      }catch(e){
        if(req.mode==="navigate"){const f=await c.match("treino.html");if(f)return f;}
        return new Response("",{status:504,statusText:"offline"});
      }
    })());
    return;
  }
  /* Fontes do Google: guarda o que vier e usa offline; sem rede e sem cache, a página usa a fonte do sistema */
  if(url.hostname.endsWith("fonts.googleapis.com")||url.hostname.endsWith("fonts.gstatic.com")){
    ev.respondWith((async()=>{
      const c=await caches.open(RUNTIME);const hit=await c.match(req);
      const net=fetchT(req,8000).then(r=>{if(r&&(r.ok||r.type==="opaque"))c.put(req,r.clone());return r;}).catch(()=>null);
      if(hit){ev.waitUntil(net);return hit;}
      return (await net)||new Response("",{status:504});
    })());
  }
});
