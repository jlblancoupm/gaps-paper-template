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
