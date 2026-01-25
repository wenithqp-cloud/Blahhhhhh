
/* SCROLL NAVIGATION */
let scrollDebounce=false;
window.addEventListener('wheel', function(event){
  if(scrollDebounce) return;
  scrollDebounce=true;
  if(event.deltaY>0){
    const next=document.querySelector('a.next-page');
    if(next) window.location.href=next.href;
  } else {
    const prev=document.querySelector('a.prev-page');
    if(prev) window.location.href=prev.href;
  }
  setTimeout(()=>{scrollDebounce=false;},800);
});

/* FADE IN */
window.addEventListener("load", ()=>{document.body.classList.add("loaded");});
