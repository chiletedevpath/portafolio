# Portafolio profesional de Adrián Pisco

Sitio independiente de la web de aprendizaje Chilete DevPath. Presenta proyectos personales, perfil profesional, CV público en español e inglés y contacto.

Dominio previsto: `https://portafolio.chiletedevpath.com`. El dominio y la publicación están pendientes; el traslado se entrega localmente.

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

## Publicación pendiente

1. Conectar este repositorio a alojamiento estático independiente, con build `npm run build` y salida `dist`.
2. Añadir `portafolio.chiletedevpath.com` como dominio personalizado y configurar su DNS. Mantener el dominio raíz para la web principal.
3. Desplegar la configuración del Worker que admite el nuevo origen y hostname. Verificar el hostname en Turnstile.
4. Publicar los enlaces y redirecciones de la web principal cuando el subdominio esté operativo.
5. Validar HTTPS, idiomas, descargas y entrega de un mensaje autorizado.

Las pruebas de contacto usan respuestas simuladas y no verifican entrega externa. Las fichas describen documentación local, no monitorización en vivo.

## Mantenimiento

### Álbum de capturas y sustento

Cada ficha presenta un álbum con imagen protagonista, miniaturas, flechas, teclado, deslizamiento móvil y ampliación. No hay reproducción automática. Las transiciones respetan movimiento reducido.

Configurar las capturas en `src/data/projectMedia.js`, en `images`: `src` es la URL de la imagen y `alt` / `caption` sus textos bilingües. Guardar archivos reales en `public/proyectos/<slug>/`, por ejemplo `/proyectos/chisabes/vista-general.webp`. Se pueden añadir más imágenes. Los espacios sin fuente se identifican como pendientes y no permiten ampliación.

`supporting[].href` admite documentos o enlaces públicos de arquitectura, decisiones y pruebas. Usar capturas sanitizadas, sin datos personales, tokens o información privada.
