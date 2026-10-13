// Public configuration only. Private credentials belong in the Worker.
export const contactConfig = {
  siteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAFPoPKzLv9597kNk",
  endpoint: "https://chiletedevpath-contacto.chiletedevpath.workers.dev/api/contacto",
};
