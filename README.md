# Portafolio profesional de Adrián Pisco

Sitio independiente de la web de aprendizaje Chilete DevPath. Presenta proyectos personales, perfil profesional, CV público en español e inglés y contacto.

Dominio previsto: `https://portafolio.chiletedevpath.com`. El dominio y la publicación están pendientes; el traslado se entrega localmente.

## Experiencia

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

Contenido: `src/data/portfolio.js`. Identidad: `src/styles/technology.css`. CV: `scripts/build-portfolio-cv.py` con Python y ReportLab. Revisar y renderizar ambos PDF después de cambiarlos. La ruta de bienvenida es simbólica, no un mapa geográfico.
