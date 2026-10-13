const intro = document.querySelector('[data-welcome-route]');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const en = document.documentElement.lang === 'en';
let seen = false;
try { seen = sessionStorage.getItem('portfolio-welcome') === 'seen-v2'; } catch {}

function showWelcome() {
  if (!intro || intro.open) return;
  try { sessionStorage.setItem('portfolio-welcome', 'seen-v2'); } catch {}
  intro.classList.remove('is-leaving');
  intro.removeAttribute('data-arrived');
  const status = intro.querySelector('[data-intro-status]');
  const percent = intro.querySelector('[data-intro-percent]');
  const road = intro.querySelector('[data-welcome-road]');
  const glow = intro.querySelector('.route-glow');
  const traveler = intro.querySelector('[data-route-traveler]');
  const stages = [...intro.querySelectorAll('[data-intro-stage]')];
  let animation;
  let closeTimer;
  let finishTimer;
  let leaving = false;
  const opener = document.activeElement;
  const messages = en ? ['Beginning the journey…', 'Following the road to Chilete…', 'Welcome. Explore my work.'] : ['Iniciando el recorrido…', 'Recorriendo el camino a Chilete…', 'Bienvenido. Explora mi trabajo.'];
  const update = progress => {
    const stage = progress < .28 ? 0 : progress < .8 ? 1 : 2;
    stages.forEach((item,index) => item.classList.toggle('is-active',index <= stage));
    if (status.textContent !== messages[stage]) status.textContent = messages[stage];
    percent.textContent = `${String(Math.round(progress * 100)).padStart(2,'0')}%`;
    const position = Math.min(progress / .86, 1);
    const eased = 1 - Math.pow(1 - position, 3);
    road.style.strokeDashoffset = String(1 - eased);
    glow.style.strokeDashoffset = String(1 - eased);
    const point = road.getPointAtLength(road.getTotalLength() * eased);
    traveler.setAttribute('transform',`translate(${point.x} ${point.y})`);
    if (stage === 2) intro.setAttribute('data-arrived','');
  };
  const finish = () => {
    if (leaving) return;
    leaving = true;
    cancelAnimationFrame(animation);
    clearTimeout(closeTimer);
    if (reduceMotion.matches) intro.close();
    else { intro.classList.add('is-leaving'); finishTimer = setTimeout(() => intro.close(),280); }
  };
  const cancel = event => { event.preventDefault(); finish(); };
  const motionChange = () => { if (reduceMotion.matches) finish(); };
  const skip = intro.querySelector('[data-skip-intro]');
  const cleanup = () => {
    cancelAnimationFrame(animation);clearTimeout(closeTimer);clearTimeout(finishTimer);
    skip.removeEventListener('click',finish);intro.removeEventListener('cancel',cancel);reduceMotion.removeEventListener('change',motionChange);
    intro.classList.remove('is-leaving');
    const target = opener instanceof HTMLElement && !intro.contains(opener) && opener !== document.body ? opener : document.querySelector('.portfolio-brand');
    target?.focus({preventScroll:true});
  };
  skip.addEventListener('click',finish);intro.addEventListener('cancel',cancel);intro.addEventListener('close',cleanup,{once:true});reduceMotion.addEventListener('change',motionChange);
  update(reduceMotion.matches ? 1 : 0);
  intro.showModal();
  if (!reduceMotion.matches) {
    const start = performance.now();
    const frame = now => { update(Math.min((now-start)/3400,1)); if (now-start < 3400) animation=requestAnimationFrame(frame); };
    animation=requestAnimationFrame(frame);
    closeTimer=setTimeout(finish,3700);
  }
}
if (!seen && !reduceMotion.matches) showWelcome();
document.querySelector('[data-replay-intro]')?.addEventListener('click',showWelcome);
