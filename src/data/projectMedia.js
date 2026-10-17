// Add real file URLs after copying assets to public/proyectos/<slug>/.
const slots = () => ({
  images: ['Vista general|Overview', 'Flujo principal|Main workflow', 'Detalle de la solución|Solution detail'].map(label => { const [es,en]=label.split('|'); return { src:'', alt:{es,en}, caption:{es,en} }; }),
  supporting: [
    { href:'', title:{es:'Arquitectura',en:'Architecture'}, description:{es:'Componentes, datos e integración.',en:'Components, data and integration.'} },
    { href:'', title:{es:'Decisiones técnicas',en:'Technical decisions'}, description:{es:'Alternativas y criterios de implementación.',en:'Alternatives and implementation criteria.'} },
    { href:'', title:{es:'Pruebas y resultados',en:'Tests and results'}, description:{es:'Validación y evidencia del recorrido.',en:'Journey validation and evidence.'} },
  ],
});
export const projectMedia = { 'chiletedevpath-web':slots(), chisabes:slots(), reminexa:slots() };
