(() => {
  const title = document.body.dataset.title || document.title;
  const root = document.createElement("header");
  root.className = "toolbar";
  root.innerHTML = `<button class="toolbar__button" id="page-back" type="button" aria-label="Назад">←</button><h1 class="toolbar__title">${title}</h1><button class="toolbar__button" id="page-code" type="button" aria-label="Показать код страницы">&lt;/&gt;</button>`;
  document.body.prepend(root);

  const dialog = document.createElement("dialog");
  dialog.className = "code-modal";
  dialog.innerHTML = '<div class="code-modal__bar"><button id="copy-code" type="button" aria-label="Скопировать код">⧉</button><span id="copy-status" aria-live="polite"></span><button id="close-code" type="button" aria-label="Закрыть">×</button></div><pre><code id="page-source"></code></pre>';
  document.body.append(dialog);

  const style = document.createElement("style");
  style.textContent = `.toolbar{height:64px;display:grid;grid-template-columns:44px minmax(0,1fr) 44px;align-items:center;padding:0 10px;border-bottom:1px solid #303030;background:#161616;color:#f4f4f4;font:600 16px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.toolbar__title{margin:0;overflow:hidden;text-align:center;text-overflow:ellipsis;white-space:nowrap;font:inherit}.toolbar__button,.code-modal button{width:38px;height:38px;border:0;border-radius:9px;background:transparent;color:#f4f4f4;font:600 16px/1 sans-serif;cursor:pointer}.toolbar__button:hover,.toolbar__button:focus-visible,.code-modal button:hover,.code-modal button:focus-visible{background:#292929;outline:2px solid #d5d5d5;outline-offset:1px}.code-modal{width:min(920px,calc(100vw - 24px));height:min(760px,calc(100vh - 24px));padding:0;border:1px solid #383838;border-radius:14px;background:#151515;color:#eee}.code-modal::backdrop{background:rgb(0 0 0 / .72)}.code-modal__bar{height:58px;display:flex;align-items:center;gap:8px;padding:0 10px;border-bottom:1px solid #303030}.code-modal__bar span{flex:1;color:#aaa;font:14px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.code-modal pre{height:calc(100% - 58px);margin:0;padding:18px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;color:#ddd;font:13px/1.45 ui-monospace,SFMono-Regular,Menlo,monospace}@media(max-width:720px){.toolbar{height:calc(64px + env(safe-area-inset-top));padding-top:env(safe-area-inset-top)}.toolbar + main{min-height:calc(100vh - 64px - env(safe-area-inset-top))}}`;
  style.dataset.toolbarStyle = "true";
  document.head.append(style);

  const source = dialog.querySelector("#page-source");
  const status = dialog.querySelector("#copy-status");
  const getCode = () => "<!doctype html>\n" + document.documentElement.outerHTML;
  document.querySelector("#page-code").onclick = () => { source.textContent = getCode(); status.textContent = ""; dialog.showModal(); };
  document.querySelector("#close-code").onclick = () => dialog.close();
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  document.querySelector("#copy-code").onclick = async () => {
    try { await navigator.clipboard.writeText(source.textContent); status.textContent = "Скопировано"; }
    catch { status.textContent = "Не удалось скопировать"; }
  };
  document.querySelector("#page-back").onclick = () => {
    if (history.length > 1) history.back();
    else if (document.body.dataset.back) location.href = document.body.dataset.back;
  };
})();