import { test, expect } from '@playwright/test';
test.beforeEach(async({page})=>{await page.route('https://challenges.cloudflare.com/**',route=>route.abort());});

for(const language of ['es','en'])test(`${language}: screenshot album, navigation and honest pending material`,async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  const root=language==='en'?'/en':'';
  for(const slug of ['chiletedevpath-web','chisabes','reminexa']){
    await page.goto(`${root}/proyectos/${slug}/`);
    await expect(page.locator('video')).toHaveCount(0);
    await expect(page.locator('[data-media-placeholder=image]')).toHaveCount(3);
    await expect(page.locator('[data-media-placeholder=support]')).toHaveCount(3);
    await expect(page.locator('.pf-support a')).toHaveCount(0);
    await expect(page.locator('[data-album-expand]')).toBeDisabled();
    await page.locator('[data-album-next]').click();
    await expect(page.locator('[data-album-count]')).toHaveText('02 / 03');
    await page.locator('[data-album-thumb]').nth(2).click();
    await expect(page.locator('[data-album-slide]:visible')).toHaveAttribute('aria-label','3 / 3');
    await page.locator('.pf-album-stage').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('[data-album-count]')).toHaveText('01 / 03');
    await page.locator('.pf-album-stage').evaluate(stage => {
      stage.dispatchEvent(new TouchEvent('touchstart',{changedTouches:[new Touch({identifier:1,target:stage,clientX:250,clientY:100})]}));
      stage.dispatchEvent(new TouchEvent('touchend',{changedTouches:[new Touch({identifier:1,target:stage,clientX:100,clientY:105})]}));
    });
    await expect(page.locator('[data-album-count]')).toHaveText('02 / 03');
    await expect(page.locator('.pf-case-nav a[href="#demostracion"]')).toBeVisible();
  }
  await page.locator('#demostracion').screenshot({path:`test-results/media-${language}.png`});
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.locator('#demostracion').screenshot({path:`test-results/media-mobile-${language}.png`});
});

test('configured screenshots open an accessible lightbox and return focus',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  // Supply a screenshot fixture in the response only; published slots stay empty.
  await page.route('**/proyectos/chisabes/',async route=>{
    const response=await route.fetch();const html=await response.text();
    await route.fulfill({response,body:html.replace(/data-src(?=\s|>)/, 'data-src="/assets/img/adrian-pisco-retrato.webp"').replace(/data-album-expand disabled/, 'data-album-expand')});
  });
  await page.goto('/proyectos/chisabes/');
  const opener=page.getByRole('button',{name:'Ampliar captura'});
  await opener.click();
  await expect(page.locator('[data-gallery-dialog]')).toBeVisible();
  await expect(page.locator('[data-gallery-image]')).toHaveAttribute('alt','Vista general');
  await expect(page.locator('[data-gallery-dialog] [data-gallery-caption]')).toHaveText('Vista general');
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-gallery-dialog]')).not.toBeVisible();await expect(opener).toBeFocused();
  await opener.click();await page.locator('[data-gallery-close]').click();await expect(opener).toBeFocused();
});

test('media animates on entry and changing to reduced motion cancels animations',async({page})=>{
  await page.addInitScript(()=>{
    try{sessionStorage.setItem('portfolio-welcome','seen-v2');}catch{}
    window.__mediaAnimations=[];
    const original=Element.prototype.animate;
    Element.prototype.animate=function(...args){window.__mediaAnimations.push(this.className);return original.apply(this,args);};
  });
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('/proyectos/reminexa/');await page.locator('.pf-album').first().scrollIntoViewIfNeeded();
  await expect.poll(()=>page.evaluate(()=>window.__mediaAnimations.some(name=>String(name).includes('pf-album')))).toBe(true);
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect.poll(()=>page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length)).toBe(0);
});
