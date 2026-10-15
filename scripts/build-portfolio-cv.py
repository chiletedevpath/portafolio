"""Build the public bilingual CV; the original Word document is untouched."""
from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/assets/portfolio'
OUT.mkdir(parents=True, exist_ok=True)
styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=22, leading=27, textColor=HexColor('#153e39'), spaceAfter=5),
    'role': ParagraphStyle('role', fontName='Helvetica', fontSize=10, leading=14, spaceAfter=8),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=9, leading=12.5, spaceAfter=6),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=HexColor('#076b66'), spaceBefore=10, spaceAfter=6),
}
CONTENT = {
 'ES': [
  ('role', 'Desarrollador web full stack con Java | Estudiante de Ingeniería de Sistemas e Informática'),
  ('body', '<link href="mailto:chiletedevpath@gmail.com">chiletedevpath@gmail.com</link> · <link href="https://portafolio.chiletedevpath.com/">Portafolio</link> · <link href="https://github.com/chiletedevpath">GitHub</link> · <link href="https://www.linkedin.com/in/adri%C3%A1n-piscos">LinkedIn</link>'),
  ('section', 'PERFIL'),
  ('body', 'Desarrollador web full stack con Java, certificado por Código powered by Tecsup, y estudiante de Ingeniería de Sistemas e Informática en la UTP. Desarrollo aplicaciones con Java, Spring Boot, React, Next.js y bases de datos SQL y NoSQL. Más de siete años de experiencia en operaciones, control y monitoreo aportan disciplina, trazabilidad, gestión de incidentes y atención a necesidades reales.'),
  ('section', 'COMPETENCIAS TÉCNICAS'),
  ('body', '<b>Backend:</b> Java, Spring Boot, Spring Data JPA, Spring Security, APIs REST.<br/><b>Frontend:</b> JavaScript, TypeScript, React, Next.js, HTML, CSS, Astro.<br/><b>Datos:</b> PostgreSQL, SQL Server, MongoDB, Flyway.<br/><b>Calidad y herramientas:</b> JUnit, Mockito, Playwright, POO, SOLID, patrones de diseño, Git, GitHub, Maven, Postman y Docker.'),
  ('section', 'PROYECTOS PERSONALES'),
  ('body', '<b>ChiSabes | Finanzas personales</b><br/>PWA y API con Next.js, Spring Boot y PostgreSQL. Cuentas, movimientos balanceados, obligaciones, presupuestos y trazabilidad por reversión. Desarrollo de frontend, backend, autenticación y modelo de datos. MVP funcional desplegado; la confirmación del respaldo desatendido permanece como límite operativo.'),
  ('body', '<b>REMINEXA | Recordatorios personales</b><br/>React/Vite, Spring Boot y PostgreSQL. Recordatorios, historial, adjuntos privados y correo mediante Resend. Procesamiento diario mediante Cloudflare Worker. Piloto V1 con alcance documentado.'),
  ('body', '<b>Chilete DevPath Web | Plataforma propia</b><br/>Diseño y mantenimiento de una web Astro con rutas bilingües, recursos, proyectos y contacto mediante Worker. Organización del contenido y criterios de publicación responsable.'),
  ('section', 'EXPERIENCIA EN OPERACIONES'),
  ('body', '<b>Operador de Centro de Control y Monitoreo | J&amp;V Resguardo</b> · Jul 2020–actualidad<br/>Monitoreo de sistemas, registro y seguimiento de incidencias, reportes diarios y coordinación de atención de alertas.'),
  ('body', '<b>Jefe de Grupo | Huayna</b> · Jul 2018–Jul 2020<br/>Supervisión de personal, coordinación de requerimientos, verificación de protocolos e informes operativos.'),
  ('body', '<b>Instructor militar | Escuela Militar de Chorrillos</b> · Ene–Jul 2018<br/>Instrucción en procedimientos y disciplina; apoyo en planificación y coordinación de actividades.'),
  ('section', 'FORMACIÓN Y RECONOCIMIENTOS'),
  ('body', '<b>Ingeniería de Sistemas e Informática</b> · Universidad Tecnológica del Perú · Mar 2024–actualidad.<br/><b>Desarrollo Web Fullstack con Java</b> · Código powered by Tecsup · 240 horas · Nov 2025–May 2026; certificado Jun 2026.<br/><b>Cisco Networking Academy / UTP:</b> Seguridad de Terminales, Introducción a Ciberseguridad y CCNA Introducción a las redes · 2026.<br/><b>Excel Básico, Intermedio y Avanzado</b> · Universidad Nacional de Trujillo · 2024.<br/>Beca Excelencia Académica UTP · III y IV ciclos, 2025.<br/>Movilidad virtual en Arquitectura de Software · Fundación Universitaria Católica del Norte, Colombia · 2026-2.'),
 ],
 'EN': [
  ('role', 'Java full stack web developer | Systems and Informatics Engineering student'),
  ('body', '<link href="mailto:chiletedevpath@gmail.com">chiletedevpath@gmail.com</link> · <link href="https://portafolio.chiletedevpath.com/en/">Portfolio</link> · <link href="https://github.com/chiletedevpath">GitHub</link> · <link href="https://www.linkedin.com/in/adri%C3%A1n-piscos">LinkedIn</link>'),
  ('section', 'PROFILE'),
  ('body', 'Java full stack web developer certified by Código powered by Tecsup and Systems and Informatics Engineering student at UTP. I develop applications using Java, Spring Boot, React, Next.js, and SQL and NoSQL databases. More than seven years in operations, control, and monitoring bring discipline, traceability, incident management, and attention to real needs.'),
  ('section', 'TECHNICAL SKILLS'),
  ('body', '<b>Backend:</b> Java, Spring Boot, Spring Data JPA, Spring Security, REST APIs.<br/><b>Frontend:</b> JavaScript, TypeScript, React, Next.js, HTML, CSS, Astro.<br/><b>Data:</b> PostgreSQL, SQL Server, MongoDB, Flyway.<br/><b>Quality and tools:</b> JUnit, Mockito, Playwright, OOP, SOLID, design patterns, Git, GitHub, Maven, Postman and Docker.'),
  ('section', 'PERSONAL PROJECTS'),
  ('body', '<b>ChiSabes | Personal finance</b><br/>PWA and API using Next.js, Spring Boot and PostgreSQL. Accounts, balanced transactions, obligations, budgets and traceable reversals. Frontend, backend, authentication and data modeling. Deployed functional MVP; unattended backup confirmation remains an operational limitation.'),
  ('body', '<b>REMINEXA | Personal reminders</b><br/>React/Vite, Spring Boot and PostgreSQL. Reminders, history, private attachments and email through Resend. Daily processing through a Cloudflare Worker. V1 pilot with documented scope.'),
  ('body', '<b>Chilete DevPath Web | Personal platform</b><br/>Design and maintenance of an Astro website with bilingual routes, resources, projects and Worker-based contact. Content organization and responsible publishing criteria.'),
  ('section', 'OPERATIONS EXPERIENCE'),
  ('body', '<b>Control and Monitoring Center Operator | J&amp;V Resguardo</b> · Jul 2020–present<br/>System monitoring, incident recording and follow-up, daily reports and coordination of alert response.'),
  ('body', '<b>Team Supervisor | Huayna</b> · Jul 2018–Jul 2020<br/>Staff supervision, coordination of requests, protocol checks and operational reporting.'),
  ('body', '<b>Military Instructor | Escuela Militar de Chorrillos</b> · Jan–Jul 2018<br/>Instruction in procedures and discipline; support for activity planning and coordination.'),
  ('section', 'EDUCATION AND RECOGNITION'),
  ('body', '<b>Systems and Informatics Engineering</b> · Universidad Tecnológica del Perú · Mar 2024–present.<br/><b>Java Fullstack Web Development</b> · Código powered by Tecsup · 240 hours · Nov 2025–May 2026; certificate Jun 2026.<br/><b>Cisco Networking Academy / UTP:</b> Endpoint Security, Introduction to Cybersecurity, and CCNA Introduction to Networks · 2026.<br/><b>Basic, Intermediate and Advanced Excel</b> · Universidad Nacional de Trujillo · 2024.<br/>UTP Academic Excellence Scholarship · semesters III and IV, 2025.<br/>Virtual academic mobility in Software Architecture · Fundación Universitaria Católica del Norte, Colombia · 2026-2.'),
 ],
}

def footer(canvas, doc):
    canvas.setFont('Helvetica', 7)
    canvas.setFillColor(HexColor('#58706d'))
    canvas.drawString(40, 24, 'Adrián Pisco · CV público / Public CV · 15/10/2026')
    canvas.drawRightString(A4[0]-40, 24, str(doc.page))

for lang, content in CONTENT.items():
    doc = SimpleDocTemplate(str(OUT / f'CV-Adrian-Pisco-{lang}.pdf'), pagesize=A4,
        rightMargin=40, leftMargin=40, topMargin=32, bottomMargin=38,
        title=f'Adrián Pisco - CV {lang}', author='Adrián Pisco')
    story = [Paragraph('ADRIÁN IVÁN PISCO SOTO', styles['name'])]
    story += [Paragraph(text, styles[style]) for style, text in content]
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(f'Generated CV {lang}')
