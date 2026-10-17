import './project-album.js';
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const running = new Set();
export function revealElement(element, delay = 0) {
  if (preference.matches || !element.animate) return;
  const animation = element.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:570,delay,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});
  running.add(animation);
  animation.finished.catch(()=>{}).finally(()=>running.delete(animation));
}
if (!preference.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){revealElement(entry.target);observer.unobserve(entry.target);}}),{threshold:.07});
  document.querySelectorAll('.pf-section-heading,.pf-project,.system-console,.pf-skills article,.pf-feature-grid article,.pf-architecture,.pf-album,.pf-support article,.pf-outcomes li').forEach(node=>observer.observe(node));
  preference.addEventListener('change',()=>{if(preference.matches)observer.disconnect();});
}
preference.addEventListener('change',()=>{if(preference.matches){running.forEach(animation=>animation.cancel());running.clear();}});
const revealHero=()=>document.querySelectorAll('.pf-hero-copy,.pf-portrait,.pf-case-hero>div,.pf-case-hero>img').forEach((node,index)=>revealElement(node,index*90));
const welcome=document.querySelector('[data-welcome-route]');
if(welcome?.open)welcome.addEventListener('close',revealHero,{once:true});else revealHero();
