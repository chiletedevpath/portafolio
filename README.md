# Portafolio profesional de Adrián Pisco

Sitio independiente de la web de aprendizaje Chilete DevPath. Presenta proyectos personales, perfil profesional, CV público en español e inglés y contacto.

Dominio: `https://portafolio.chiletedevpath.com`. Alojamiento independiente en GitHub Pages; DNS administrado en Cloudflare.

La [ruta de cierre](docs/ruta-de-cierre.md) organiza la revisión de proyectos, evidencia, actualización del CV y publicación. El diseño actual se conserva mientras se completa esa ruta.

## Experiencia

La portada conserva su diseño y da paso al trabajo organizado en dos grupos: Chilete DevPath como proyecto insignia y ChiSabes y REMINEXA como sistemas aplicados. Después aparecen el enfoque de desarrollo, el perfil, el CV y el contacto. Cada ficha explica problema, aporte propio, solución, decisiones técnicas, resultado y evidencia, con el alcance y la evolución del proyecto diferenciados.

- Identidad tecnológica propia, temas oscuro y claro y diseño responsive.
- Bienvenida con ruta ilustrada hacia Chilete, omisión por botón o Escape y respeto a movimiento reducido. Una vez por sesión.
- ChiSabes, REMINEXA y Chilete DevPath Web con páginas bilingües y alcance documentado.
- Explorador de etapas de desarrollo accesible con teclado y filtros de proyectos.
- CV descargable en ambos idiomas y vista previa.
- Contacto mediante el Worker de Chilete DevPath, preparado para el nuevo origen.

No incluye proyectos académicos, Ferretería Soto ni SIGECAP. La formación sí aparece en el perfil. El Word original en `cv/` permanece local e ignorado; solo se distribuyen PDF públicos con correo y enlaces profesionales.

## Ejecución

Desde PowerShell en la raíz del repositorio:

```powershell
npm ci
npm run dev -- --host 127.0.0.1 --port 4395
```

`npm run build` genera `dist/`. `npm test` valida la experiencia después del build.

## Publicación

Los cambios en `main` ejecutan `.github/workflows/deploy.yml`: instalación, build, pruebas de navegador y despliegue de `dist/`. El dominio personalizado está asociado en GitHub Pages y registrado en `public/CNAME`. En Cloudflare, el CNAME `portafolio` apunta a `chiletedevpath.github.io`, con DNS only y TTL automático. La web principal conserva su alojamiento y dominio.

El Worker de contacto admite el origen y hostname del portafolio. El widget Turnstile existente permite `chiletedevpath.com` y sus subdominios. La prueba de entrega real de un mensaje requiere un envío autorizado; las capturas y los documentos de sustento pendientes pueden incorporarse después.

Las pruebas de contacto usan respuestas simuladas y no verifican entrega externa. Las fichas describen documentación local, no monitorización en vivo.

## Mantenimiento

### Álbum de capturas y sustento

Cada ficha presenta un álbum con imagen protagonista, miniaturas, flechas, teclado, deslizamiento móvil y ampliación. No hay reproducción automática. Las transiciones respetan movimiento reducido.

Configurar las capturas en `src/data/projectMedia.js`, en `images`: `src` es la URL de la imagen y `alt` / `caption` sus textos bilingües. Guardar archivos reales en `public/proyectos/<slug>/`, por ejemplo `/proyectos/chisabes/vista-general.webp`. Se pueden añadir más imágenes. Los espacios sin fuente se identifican como pendientes y no permiten ampliación.

`supporting[].href` admite documentos o enlaces públicos de arquitectura, decisiones y pruebas. Usar capturas sanitizadas, sin datos personales, tokens o información privada.
