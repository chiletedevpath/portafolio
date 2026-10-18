import { readdir, readFile, lstat } from "node:fs/promises";
import { resolve, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const publicFiles = new Set([
  "CNAME",
  "robots.txt",
  "assets/img/adrian-pisco-retrato.webp",
  "assets/img/marca-simbolo-nav.png",
  "assets/img/og-image.jpg",
  "assets/portfolio/CV-Adrian-Pisco-ES.pdf",
  "assets/portfolio/CV-Adrian-Pisco-EN.pdf",
  "assets/portfolio/chisabes.webp",
  "assets/portfolio/reminexa.webp",
]);
const project = "(?:chiletedevpath-web|chisabes|reminexa)";
const evidence = new RegExp(
  `^proyectos/${project}/[a-zA-Z0-9_-]+\\.(?:avif|webp|png|jpe?g|svg|pdf)$`,
);
const page = new RegExp(`^(?:en/)?(?:proyectos/${project}/)?index\\.html$`);
const generated = /^_astro\/[a-zA-Z0-9_.-]+\.(?:css|js)$/;
const credential =
  /-----BEGIN (?:[A-Z ]+ )?PRIVATE KEY-----|\bgh[pousr]_[A-Za-z0-9]{30,}\b|\bgithub_pat_[A-Za-z0-9_]{40,}\b|\bAKIA[A-Z0-9]{16}\b|\bsk-proj-[A-Za-z0-9_-]{30,}\b/;

export async function checkPublicTree(directory, { built = false } = {}) {
  const root = resolve(directory);
  let count = 0;
  async function visit(folder) {
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      const file = resolve(folder, entry.name);
      const path = relative(root, file).split(sep).join("/");
      if (
        !file.startsWith(root + sep) ||
        (await lstat(file)).isSymbolicLink()
      ) {
        throw new Error(`Ruta no permitida: ${path}`);
      }
      if (entry.isDirectory()) {
        await visit(file);
        continue;
      }
      const allowed =
        publicFiles.has(path) ||
        evidence.test(path) ||
        (built &&
          (page.test(path) ||
            generated.test(path) ||
            /^sitemap(?:-index|-\d+)\.xml$/.test(path)));
      if (!entry.isFile() || !allowed)
        throw new Error(`Archivo no autorizado para publicación: ${path}`);
      if (
        /\.(?:html|css|js|xml|txt|svg)$/.test(path) &&
        credential.test(await readFile(file, "utf8"))
      ) {
        throw new Error(`Posible credencial en ${path}; publicación detenida.`);
      }
      count++;
    }
  }
  await visit(root);
  return count;
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const root = fileURLToPath(new URL("../", import.meta.url));
  await checkPublicTree(resolve(root, "public"));
  console.log(
    `Publicación verificada: ${await checkPublicTree(resolve(root, "dist"), { built: true })} archivos autorizados.`,
  );
}
