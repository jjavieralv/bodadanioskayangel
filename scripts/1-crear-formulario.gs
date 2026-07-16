/**
 * RSVP · Dani y Ángel
 * Ejecuta este script UNA sola vez para crear el Google Form automáticamente.
 *
 * Cómo usar:
 *   1. Abre https://script.google.com → "Nuevo proyecto".
 *   2. Pega este contenido completo.
 *   3. Pulsa "Guardar" y luego "Ejecutar" (función crearFormularioBoda).
 *   4. Autoriza los permisos cuando Google te lo pida.
 *   5. Copia el ID del formulario que imprime en el log (View → Executions → Log).
 *   6. Pega ese ID en /content/site.json → formulario.googleFormId.
 */

function crearFormularioBoda() {
  var form = FormApp.create('Boda Dani y Ángel · Confirmación')
    .setDescription('¡Nos casamos el 7 de abril de 2027 en Madrid! Por favor confirma antes del 1 de marzo de 2027.')
    .setConfirmationMessage('¡Gracias! Te hemos enviado un email de confirmación. Nos vemos el 7 de abril. 💜🐾')
    .setCollectEmail(true)
    .setAllowResponseEdits(true)
    .setShowLinkToRespondAgain(false);

  // 1. Nombre completo
  form.addTextItem()
    .setTitle('Nombre completo')
    .setRequired(true);

  // 2. Asistencia
  form.addMultipleChoiceItem()
    .setTitle('¿Confirmas asistencia?')
    .setChoiceValues(['¡Sí, allí estaré!', 'No podré asistir', 'Todavía no lo sé'])
    .setRequired(true);

  // 3. Número de acompañantes
  form.addMultipleChoiceItem()
    .setTitle('¿Vienes con alguien más?')
    .setChoiceValues(['Voy solo/a', '+1 (pareja)', 'Familia (niños incluidos)', 'Indicado por separado en la invitación']);

  // 4. Nombre de acompañantes
  form.addParagraphTextItem()
    .setTitle('Si vienes con acompañantes, escribe sus nombres aquí')
    .setHelpText('Opcional. Uno por línea.');

  // 5. Menú
  form.addMultipleChoiceItem()
    .setTitle('Menú')
    .setChoiceValues(['Carne', 'Pescado', 'Vegetariano', 'Vegano', 'Menú infantil (niños)'])
    .setRequired(true);

  // 6. Alergias / Restricciones
  form.addCheckboxItem()
    .setTitle('¿Alergias o restricciones alimentarias?')
    .setChoiceValues(['Sin gluten', 'Sin lactosa', 'Frutos secos', 'Marisco', 'Huevo', 'Otras (indícalas abajo)']);

  form.addParagraphTextItem()
    .setTitle('Detalla alergias / restricciones')
    .setHelpText('Opcional. Cuéntanos todo lo que debamos saber.');

  // 7. Canción para la fiesta
  form.addTextItem()
    .setTitle('¿Qué canción te saca a bailar?')
    .setHelpText('La añadimos a la playlist 🎵');

  // 8. Mensaje para los novios
  form.addParagraphTextItem()
    .setTitle('Un mensaje para Dani y Ángel');

  // 9. Transporte
  form.addMultipleChoiceItem()
    .setTitle('¿Necesitas el autobús desde Plaza de España?')
    .setChoiceValues(['Sí, ida y vuelta', 'Solo ida', 'Solo vuelta', 'No, voy por mi cuenta']);

  // 10. Alojamiento
  form.addMultipleChoiceItem()
    .setTitle('¿Necesitas recomendación de alojamiento?')
    .setChoiceValues(['Sí, por favor', 'Ya lo tengo reservado', 'Soy de Madrid']);

  // 11. Teléfono (para emergencias)
  form.addTextItem()
    .setTitle('Teléfono de contacto')
    .setHelpText('Por si hay un cambio de última hora.');

  // Crear hoja de respuestas
  var ss = SpreadsheetApp.create('Boda Dani y Ángel · Respuestas RSVP');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('✅ Formulario creado');
  Logger.log('ID del formulario: ' + form.getId());
  Logger.log('URL pública: ' + form.getPublishedUrl());
  Logger.log('URL editable: ' + form.getEditUrl());
  Logger.log('URL embed (iframe): ' + form.getPublishedUrl().replace('/viewform', '/viewform?embedded=true'));
  Logger.log('ID de la hoja de cálculo: ' + ss.getId());
  Logger.log('URL de la hoja: ' + ss.getUrl());
  Logger.log('');
  Logger.log('👉 Pega el "ID del formulario" en content/site.json → formulario.googleFormId');
}
