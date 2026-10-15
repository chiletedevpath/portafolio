# Ruta para presentar el portafolio

Fecha de planificación: 14 de octubre de 2026.

Objetivo: publicar una presentación profesional de Adrián Pisco, estudiante de Ingeniería de Sistemas e Informática y desarrollador web con Java, respaldada por proyectos demostrables, un CV actualizado y contacto verificado.

El diseño actual se conserva. La mejora visual de la plataforma Chilete DevPath es un trabajo posterior e independiente.

## Situación de partida

- Diseño y experiencia del portafolio guardados en el commit `900a024`.
- Integración y propuesta visual de la plataforma guardadas en `b176404` de `chiletedevpath-web`.
- Compilación y diez pruebas de navegador aprobadas durante el desarrollo anterior. Repetir las pruebas cuando cambie el contenido o antes de publicar.
- Proyectos seleccionados: ChiSabes, REMINEXA y Chilete DevPath Web.
- CV público existente pendiente de actualización con el documento V3 aportado por el usuario.
- Dominio, alojamiento y contacto externo pendientes de verificación de publicación.
- Excluidos: Ferretería Soto, SIGECAP y los proyectos académicos. La formación académica sí pertenece al perfil y al CV.

## 1. Confirmar el estado real de los proyectos

Antes de implementar cambios, revisar cada repositorio y separar lo terminado con evidencia, lo pendiente y las mejoras que pueden esperar.

- [x] Revisar commits, cambios locales, documentación y resultados recientes de ChiSabes.
- [x] Revisar los mismos puntos en REMINEXA.
- [ ] Definir un recorrido demostrable y la versión que se presentará de cada proyecto.
- [x] Registrar únicamente los pendientes que sigan vigentes, con criterio de aceptación.

La documentación local de ChiSabes consultada hoy mantiene pendiente confirmar la primera ejecución desatendida del respaldo. Ya no enumera el recorrido autenticado final como pendiente; comprobar su evidencia antes de volver a incluirlo en el trabajo por hacer. La guía operativa de REMINEXA describe controles y evidencia requerida, pero por sí sola no certifica el estado del despliegue.

**Salida:** una lista actualizada de cierre por proyecto. No exigir terminar todas las ideas futuras para poder mostrar una versión funcional con límites explícitos.

### Resultado de la revisión del 14 de octubre de 2026

Revisión de ChiSabes en `bda5b4a` y REMINEXA en `8b03fbb`, con ambos árboles sin cambios de código. No se modificó producción ni se enviaron correos. La evidencia distingue ejecución local, CI remoto, documentación y comprobaciones públicas.

| Comprobación | ChiSabes | REMINEXA |
| --- | --- | --- |
| Backend local con Docker disponible | 27 pruebas aprobadas; ninguna omitida | 79 pruebas aprobadas; ninguna omitida |
| Frontend local | Lint aprobado, 6 pruebas aprobadas y build aprobado | 28 pruebas aprobadas y build aprobado |
| CI del commit revisado | Backend, frontend, E2E y secretos aprobados en run `38522037727` | Web y API aprobados en run `38408769703` |
| Web pública | HTTP 200, HSTS y CSP presentes | HTTP 200, título REMINEXA y HSTS presente |
| Salud pública de la API | HTTP 200 y `UP` | HTTP 200 y `UP` |
| Visibilidad del repositorio | Privado | Privado |

Las primeras comprobaciones de salud expiraron antes de responder; las posteriores devolvieron `UP`. No se confunde ese arranque en frío con una caída permanente. Las pruebas frontend necesitaron un directorio temporal dentro de `node_modules` por restricciones del aislamiento; el build standalone de ChiSabes y las pruebas Docker se completaron fuera de ese aislamiento. Estos fallos iniciales fueron del entorno de ejecución y no demuestran defectos de las aplicaciones.

El E2E de ChiSabes fue confirmado en CI, no repetido aquí contra la cuenta real. La documentación de operación registra el recorrido del propietario y una restauración aislada actualizada el 14 de octubre; no corresponde listar esos trabajos como inexistentes. En REMINEXA, historial, categorías y adjuntos ya tienen integración implementada y el formulario explica el horario de avisos de las 09:00: tampoco son funciones que haya que rehacer desde cero.

### Pendientes priorizados

| Prioridad y alcance | Pendiente observado | Criterio de cierre |
| --- | --- | --- |
| P1 · ChiSabes, operación | La tarea `ChiSabes - backup semanal` existe y está lista, pero su última ejecución del 14/10 a las 01:22:56 registra resultado `1`. La restauración manual ensayada no acredita automatización. | Una ejecución desde el Programador de tareas en la sesión normal termina con resultado `0`, genera una copia verificable y conserva la retención esperada. No requiere rehacer el mecanismo de backup ni consultar movimientos reales. |
| Cerrado · ChiSabes, recorrido de recurrencias | La API y la interfaz permiten pausar y reactivar una recurrencia sin alterar su próxima ocurrencia; el archivo permanece terminal. | Cubierto por prueba de integración, prueba de navegador y las suites de backend y frontend del cierre del 15/10/2026. |
| P1 · REMINEXA, demostración externa | `UP` y las pruebas locales no confirman que el scheduler desplegado haya entregado un aviso real ni que una repetición conserve la no duplicación. La verificación del cron activo en Cloudflare tampoco se realizó en esta revisión. | Con cuenta y destinatario de prueba autorizados: crear un recordatorio, comprobar el cron operativo, recibir un aviso, verlo en el historial y repetir el procesamiento controlado sin recibir un segundo aviso para la misma ocurrencia. |
| P1 · Ambos, presentación | Los repositorios son privados y todavía falta seleccionar evidencia pública con datos ficticios y el alcance final de las fichas. | Fijar un recorrido y versión por caso, producir capturas o video y explicar decisiones, resultados y límites. La visibilidad de los repositorios permanece privada salvo autorización expresa. |
| P2 · ChiSabes, usabilidad | Categorías con creación pero sin edición o archivo desde la pantalla; historial con filtro por tipo y paginación pero sin rango de fechas ni detalle desplegable. El resumen de planificación consulta el mes actual y PEN. | Elegir estas mejoras para una iteración posterior o implementarlas con pruebas si se quieren incluir en el alcance de presentación. No anunciarlas como disponibles hoy. |
| P2 · REMINEXA, operación ampliada | Recuperación de respaldos, objetivos operativos y el workflow manual como respaldo del scheduler requieren evidencia separada si se desea afirmarlos. | Revisarlos antes de depender del servicio para datos importantes; no convertirlos en requisitos comerciales para mostrar un piloto personal acotado. El workflow manual no se presenta como respaldo validado. |

Orden recomendado para el siguiente trabajo: confirmar la primera ejecución desatendida del respaldo programado de ChiSabes; después verificar el recorrido externo de REMINEXA. Por último preparar las capturas de presentación. No se detectó en las comprobaciones ejecutadas un fallo de compilación ni una suite fallida del producto.

## 2. Cerrar los recorridos que vamos a demostrar

### ChiSabes

- [ ] Comprobar acceso, sesiones, cuentas, ingresos, gastos, transferencias y correcciones.
- [ ] Comprobar los recorridos de presupuestos, obligaciones y exportación que se incluirán en el caso.
- [ ] Corregir los fallos que impidan esos recorridos o generen resultados incorrectos.
- [ ] Confirmar ejecución desatendida del respaldo y revisar evidencia de recuperación según el alcance operativo que se declarará.

### REMINEXA

- [ ] Comprobar creación y modificación de recordatorios, historial y adjuntos incluidos en la versión presentada.
- [ ] Verificar procesamiento, entrega de un aviso autorizado y ausencia de duplicados ante una repetición del proceso.
- [ ] Revisar programación diaria, tratamiento de fallos y recuperación de respaldos.
- [ ] Explicar el alcance de los avisos diarios y las dependencias externas, sin prometer precisión por minuto ni SLA.

### Chilete DevPath Web

- [ ] Comprobar navegación, idiomas, recursos y comportamiento móvil de la versión seleccionada.
- [ ] Identificar qué decisiones de diseño y organización del contenido se explicarán en su caso.
- [ ] Describir las tecnologías realmente utilizadas, evitando trasladar nombres de frameworks que no estén en la implementación presentada.

**Salida:** recorridos reproducibles con datos ficticios y evidencia fechada, sin fallos críticos conocidos dentro del alcance que se presenta. Las operaciones externas y los envíos reales se realizan dentro de su autorización correspondiente.

## 3. Preparar evidencia y fichas

- [ ] Seleccionar capturas claras de cada recorrido con datos ficticios.
- [ ] Preparar un video breve por sistema cuando ayude a mostrar el flujo completo.
- [ ] Revisar los diagramas para que correspondan a la arquitectura implementada.
- [ ] Explicar problema, participación propia, decisiones, resultado y límites.
- [ ] Definir por proyecto qué se ofrece: demo pública, video, capturas o código público autorizado. ChiSabes no necesita abrir sus datos ni su cuenta privada para ser demostrable.
- [ ] Actualizar `src/data/portfolio.js` y los recursos visuales del sitio.

**Salida:** cada caso permite entender qué construí y comprobarlo mediante evidencia; las marcas y diagramas no sustituyen a las capturas reales.

## 4. Actualizar perfil y CV

- [x] Tomar el CV V3 del usuario como referencia principal para el contenido.
- [x] Incorporar ChiSabes con el alcance que quedó verificado.
- [ ] Incorporar REMINEXA con el alcance que quede verificado.
- [ ] Ajustar las tecnologías de Chilete DevPath a la versión efectivamente presentada.
- [x] Corregir el LinkedIn del documento a `https://www.linkedin.com/in/adri%C3%A1n-piscos`.
- [ ] Conservar solo correo y enlaces públicos en las versiones descargables del portafolio, conforme a la preferencia del usuario.
- [ ] Alinear perfil web, PDF español y PDF inglés; no copiar automáticamente el teléfono del Word a la web.
- [ ] Regenerar ambos PDF, revisar texto, enlaces y distribución visual y probar su descarga y vista previa.

**Salida:** web y CV describen el mismo perfil, con datos vigentes y sin información privada no autorizada.

## 5. Preparar y publicar el sitio independiente

- [ ] Elegir o confirmar el alojamiento del repositorio `portafolio`.
- [ ] Revisar el cambio publicable y guardar los commits necesarios; el push y la publicación requieren la autorización del usuario.
- [ ] Configurar `portafolio.chiletedevpath.com` sin alterar el dominio raíz de Chilete DevPath.
- [ ] Verificar HTTPS, URL canónica, sitemap y vista previa al compartir enlaces.
- [ ] Desplegar la configuración del Worker de contacto para el subdominio y verificar su admisión en Turnstile.
- [ ] Publicar los enlaces y redirecciones de la plataforma cuando el subdominio responda correctamente.

**Salida:** sitio accesible por su URL definitiva y contacto configurado para ese origen.

## 6. Revisar la experiencia publicada

- [ ] Ejecutar build y pruebas de navegador sobre el contenido final.
- [ ] Comprobar ambos idiomas, móvil, teclado, contraste, modo claro y oscuro y movimiento reducido.
- [ ] Comprobar bienvenida, omisión, repetición, filtros, explorador y navegación de proyectos.
- [ ] Abrir todos los enlaces y descargar los dos CV desde el sitio publicado.
- [ ] Enviar un mensaje real autorizado, confirmar recepción y revisar el manejo de errores.
- [ ] Revisar las fichas en una sesión sin acceso a las cuentas privadas del autor.

**Salida:** evidencia final de funcionamiento y un portafolio listo para compartir en LinkedIn, CV y postulaciones.

## Orden de trabajo

Primero revisar ChiSabes y cerrar sus pendientes vigentes. Después hacer lo mismo con REMINEXA. Con ambos recorridos definidos, preparar evidencia, actualizar fichas y CV y pasar a publicación y revisión final.

No se fijan fechas todavía: la revisión inicial debe determinar el trabajo real pendiente. Marcar las casillas únicamente cuando exista evidencia de cierre; este documento es una planificación, no una nueva validación de los sistemas.
