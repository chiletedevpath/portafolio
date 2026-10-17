import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => { await page.route('https://challenges.cloudflare.com/**', route => route.abort()); });
const skipIntro = async page => { const dialog=page.locator('[data-welcome-route]'); await expect(dialog).toBeVisible(); await page.locator('[data-skip-intro]').click(); await expect(dialog).not.toBeVisible(); };
for (const language of ['es','en']) {
  const root=language==='en'?'/en':'';
  test(`${language}: independent routes, links and CV`,async({page,request})=>{
    await page.goto(`${root}/`,{waitUntil:'domcontentloaded'});await skipIntro(page);
    await expect(page.locator('html')).toHaveAttribute('lang',language);
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href',`https://portafolio.chiletedevpath.com${root}/`);
    await expect(page.locator('.pf-project')).toHaveCount(3);
    await expect(page.locator('.pf-project').first()).toHaveAttribute('data-project-kind','platform');
    await expect(page.locator('.pf-flagship h3')).toHaveText('Chilete DevPath');
    await expect(page.locator('[data-project-kind=systems]')).toHaveCount(2);
    await expect(page.locator('.pf-shell')).not.toContainText(/Ferreter[ií]a|SIGECAP/);
    const [download]=await Promise.all([page.waitForEvent('download'),page.locator('.pf-hero a[download]').click()]);
    expect(download.suggestedFilename()).toBe(`CV-Adrian-Pisco-${language.toUpperCase()}.pdf`);
    for(const href of await page.locator('.pf-shell a[href^="/"]').evaluateAll(links=>[...new Set(links.map(a=>a.getAttribute('href').split('#')[0]))])){if(href)expect((await request.get(href)).status(),href).toBe(200);}
    for(const slug of ['chisabes','reminexa','chiletedevpath-web']){await page.goto(`${root}/proyectos/${slug}/`);await expect(page.locator('.pf-detail h1')).toBeVisible();await expect(page.locator('#resultado .pf-outcomes li')).toHaveCount(3);await expect(page.locator('.pf-access-note')).toBeVisible();await expect(page.locator('[data-welcome-route]')).not.toBeVisible();}
  });
}
test('welcome route auto-completes and supports Escape',async({page})=>{
  await page.goto('/',{waitUntil:'domcontentloaded'});await expect(page.locator('[data-welcome-route]')).toBeVisible();
  await expect(page.locator('[data-intro-stage="1"]')).toHaveClass('is-active');
  await page.screenshot({path:'test-results/welcome-route.png'});
  await expect(page.locator('[data-welcome-route]')).not.toBeVisible({timeout:5000});
  await page.reload({waitUntil:'domcontentloaded'});await expect(page.locator('[data-welcome-route]')).not.toBeVisible();
  await page.evaluate(()=>sessionStorage.removeItem('portfolio-welcome'));await page.reload({waitUntil:'domcontentloaded'});
  await expect(page.locator('[data-welcome-route]')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('[data-welcome-route]')).not.toBeVisible();
  await page.locator('[data-replay-intro]').click();await expect(page.locator('[data-welcome-route]')).toBeVisible();await page.locator('[data-skip-intro]').click();await expect(page.locator('[data-welcome-route]')).not.toBeVisible();
});
test('welcome content fits mobile screens',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/',{waitUntil:'domcontentloaded'});
  await expect(page.locator('[data-welcome-route]')).toBeVisible();
  const status=await page.locator('[data-intro-status]').boundingBox();
  expect(status.y+status.height).toBeLessThanOrEqual(844);
  await expect(page.locator('.welcome-heading')).toHaveCSS('opacity','1');
  await page.screenshot({path:'test-results/welcome-mobile.png'});
  await page.locator('[data-skip-intro]').click();
});
test('project filters and system explorer support keyboard navigation',async({page})=>{
  await page.goto('/',{waitUntil:'domcontentloaded'});await skipIntro(page);
  await page.locator('[data-project-filter=systems]').click();await expect(page.locator('.pf-project:visible')).toHaveCount(2);await expect(page.locator('#chiletedevpath')).not.toBeVisible();
  await page.locator('[data-project-filter=platform]').click();await expect(page.locator('.pf-project:visible')).toHaveCount(1);await expect(page.locator('#chiletedevpath')).toBeVisible();await expect(page.locator('[aria-labelledby=systems-title]')).not.toBeVisible();
  await page.locator('[data-project-filter=all]').click();await expect(page.locator('.pf-project:visible')).toHaveCount(3);
  await page.locator('#stage-tab-0').focus();await page.keyboard.press('ArrowRight');await expect(page.locator('#stage-tab-1')).toHaveAttribute('aria-selected','true');await expect(page.locator('#stage-panel-1')).toBeVisible();await page.keyboard.press('End');await expect(page.locator('#stage-panel-3')).toBeVisible();
});
for(const width of [390,768,1440])test(`responsive at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:900});await page.goto('/',{waitUntil:'domcontentloaded'});await skipIntro(page);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:`test-results/portfolio-${width}.png`,fullPage:true});
  await page.goto('/proyectos/reminexa/');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('reduced motion skips intro; theme toggle and CV preview work',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/',{waitUntil:'domcontentloaded'});await expect(page.locator('[data-welcome-route]')).not.toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');await page.locator('[data-theme-toggle]').click();await expect(page.locator('html')).toHaveAttribute('data-theme','light');await page.reload({waitUntil:'domcontentloaded'});await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await page.locator('.pf-cv-preview summary').click();await expect(page.locator('.pf-cv-preview')).toHaveAttribute('open','');
});
test('contact verification and success/failure are handled without external sends',async({page})=>{
  let payload;let failed=false;
  await page.route('https://chiletedevpath-contacto.chiletedevpath.workers.dev/**',async route=>{payload=route.request().postDataJSON();await route.fulfill({status:failed?500:200,contentType:'application/json',body:JSON.stringify(failed?{code:'DELIVERY_FAILED'}:{ok:true})});});
  await page.goto('/',{waitUntil:'domcontentloaded'});await skipIntro(page);
  await expect(page.locator('.pf-form').getByRole('textbox')).toHaveCount(3);
  await page.locator('.pf-contact').screenshot({path:'test-results/contact-compact.png'});
  const fill=async()=>{await page.locator('#pf-nombre').fill('Prueba local');await page.locator('#pf-correo').fill('demo@example.test');await page.locator('#pf-mensaje').fill('Mensaje ficticio para validar el contacto del portafolio.');await page.locator('[name=confirmacion]').check();};
  await fill();await page.locator('.pf-form button[type=submit]').click();await expect(page.locator('[data-form-status]')).toContainText('verificación humana');expect(payload).toBeUndefined();
  await page.locator('.pf-form').evaluate(form=>{const i=document.createElement('input');i.type='hidden';i.name='cf-turnstile-response';i.value='test-token';form.append(i);});
  await page.locator('.pf-form button[type=submit]').click();await expect(page.locator('[data-form-status]')).toContainText('Mensaje enviado correctamente');expect(payload.subject).toBe('Contacto desde el portafolio');expect(payload.type).toBe('Portafolio profesional');expect(payload.confirmation).toBe(true);
  failed=true;await fill();await page.locator('.pf-form [name="cf-turnstile-response"]').evaluate(i=>{i.value='test-token';});await page.locator('.pf-form button[type=submit]').click();await expect(page.locator('[data-form-status]')).toContainText('No pudimos enviar');await expect(page.locator('.pf-form button[type=submit]')).toBeEnabled();
});
