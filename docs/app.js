const PAPER={
  repo:"https://github.com/CHANGE_ME/example-paper",
  citation:{
    plain:"First Author, Second Author, and J.L. Blanco, “Replace with your paper title,” Conference 2027, 2027.",
    bibtex:`@inproceedings{example2027paper,
  author    = {First Author and Second Author and Blanco, J. L.},
  title     = {Replace with your paper title},
  booktitle = {Conference 2027},
  year      = {2027}
}`,
    ris:`TY  - CPAPER
TI  - Replace with your paper title
AU  - First Author
AU  - Second Author
AU  - Blanco, J. L.
T2  - Conference 2027
PY  - 2027
ER  -`
  }
};

document.querySelectorAll("[data-repo-path]").forEach(a=>{
  a.href=`${PAPER.repo}/tree/main/${a.dataset.repoPath}`;
});

document.querySelectorAll(".citation-copy").forEach(btn=>{
  btn.addEventListener("click",async()=>{
    const value=PAPER.citation[btn.dataset.format];
    await navigator.clipboard.writeText(value);
    const status=document.getElementById("copy-status");
    status.textContent=`${btn.dataset.format==="plain"?"Plain text":btn.dataset.format.toUpperCase()} copied.`;
    setTimeout(()=>status.textContent="",1500);
  });
});

document.querySelectorAll('a[href]').forEach(a=>{
  const href=a.getAttribute('href')||'';
  if(!href.startsWith('#')){a.target="_blank";a.rel="noopener"}
});

function renderMathWhenReady(){
  if(typeof katex==="undefined"){setTimeout(renderMathWhenReady,50);return}
  document.querySelectorAll(".tex[data-tex]").forEach(el=>{
    katex.render(el.dataset.tex,el,{throwOnError:false,strict:"ignore"});
  });
}
renderMathWhenReady();


/* Header scrollspy: highlights the existing nav item for the current section.
   It does not intercept clicks, so the current anchor navigation is preserved. */
(function initHeaderScrollspy(){
  const header=document.querySelector(".site-header");
  const links=[...document.querySelectorAll('.site-header nav a[href^="#"]')];

  const items=links
    .map(link=>{
      const href=link.getAttribute("href");
      const section=href ? document.querySelector(href) : null;
      return section ? {link,section} : null;
    })
    .filter(Boolean);

  if(!items.length) return;

  let ticking=false;

  function setActive(link){
    links.forEach(a=>a.classList.toggle("active",a===link));
  }

  function updateActiveSection(){
    ticking=false;

    const headerOffset=(header ? header.getBoundingClientRect().height : 0)+28;
    const probe=window.scrollY+headerOffset;

    let active=items[0];

    for(const item of items){
      if(item.section.offsetTop<=probe){
        active=item;
      }else{
        break;
      }
    }

    if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4){
      active=items[items.length-1];
    }

    setActive(active.link);
  }

  function requestUpdate(){
    if(ticking) return;
    ticking=true;
    requestAnimationFrame(updateActiveSection);
  }

  window.addEventListener("scroll",requestUpdate,{passive:true});
  window.addEventListener("resize",requestUpdate);
  window.addEventListener("load",requestUpdate);

  requestUpdate();
})();
