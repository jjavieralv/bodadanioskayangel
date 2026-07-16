/**
 * RSVP · Dani y Ángel — Email de confirmación automático
 *
 * Este script debe vivir DENTRO de la hoja de cálculo de respuestas.
 *
 * Cómo configurar:
 *   1. Abre la hoja de cálculo de respuestas del formulario.
 *   2. Extensiones → Apps Script.
 *   3. Pega este contenido completo.
 *   4. Ajusta las constantes NOVIOS_EMAIL y el contenido del mensaje.
 *   5. Guarda.
 *   6. Activa el trigger automático:
 *      Ejecuta la función `instalarTrigger` una vez.
 *      (O manualmente: Triggers → "+" → función `enviarConfirmacion` → evento "Al enviarse el formulario").
 *   7. Autoriza los permisos de Gmail cuando los pida.
 */

// ⚙️ CONFIGURACIÓN
var NOVIOS_EMAIL = 'daniyangel.boda@ejemplo.com'; // <- cámbialo por el vuestro (recibiréis cada RSVP)
var NOMBRES_NOVIOS = 'Dani y Ángel';
var FECHA_BODA = '7 de abril de 2027';
var VENUE = 'Ermita de la Virgen del Puerto, Madrid';
var WEB_URL = 'https://daniyangel.com';

function instalarTrigger() {
  // Borra triggers anteriores
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'enviarConfirmacion') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  // Crea uno nuevo
  ScriptApp.newTrigger('enviarConfirmacion')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onFormSubmit()
    .create();
  Logger.log('✅ Trigger instalado. Los emails se enviarán automáticamente.');
}

function enviarConfirmacion(e) {
  try {
    var respuestas = e.namedValues;
    var emailInvitado = (e.namedValues['Dirección de correo electrónico'] || e.namedValues['Email Address'] || [''])[0];
    var nombre = (respuestas['Nombre completo'] || [''])[0];
    var asistencia = (respuestas['¿Confirmas asistencia?'] || [''])[0];
    var menu = (respuestas['Menú'] || [''])[0];
    var cancion = (respuestas['¿Qué canción te saca a bailar?'] || [''])[0];

    if (!emailInvitado) {
      Logger.log('Sin email, no se envía confirmación.');
      return;
    }

    var esperamos = asistencia.indexOf('Sí') >= 0;
    var asunto = esperamos
      ? '💜 ¡Gracias por confirmar a la boda de ' + NOMBRES_NOVIOS + '!'
      : 'Gracias por responder · Boda de ' + NOMBRES_NOVIOS;

    var cuerpo = '<div style="font-family:Georgia,serif;max-width:560px;margin:auto;background:#fdf8f0;padding:32px;border-radius:16px;color:#2d1b4e">' +
      '<h1 style="color:#6b28d4;font-size:36px;margin:0 0 8px">D &amp; A</h1>' +
      '<p style="font-size:14px;letter-spacing:.2em;text-transform:uppercase;color:#9061f9">' + FECHA_BODA + '</p>' +
      '<hr style="border:none;border-top:1px solid #cfb4ff;margin:20px 0">' +
      '<p>Hola <strong>' + nombre + '</strong>,</p>';

    if (esperamos) {
      cuerpo += '<p>¡Qué alegría! Hemos recibido tu confirmación. Ya te estamos guardando sitio.</p>' +
        '<ul>' +
        '<li><strong>Fecha:</strong> ' + FECHA_BODA + '</li>' +
        '<li><strong>Lugar:</strong> ' + VENUE + '</li>' +
        '<li><strong>Menú:</strong> ' + menu + '</li>' +
        (cancion ? '<li><strong>Tu canción:</strong> ' + cancion + '</li>' : '') +
        '</ul>' +
        '<p>Puedes revisar toda la info en <a href="' + WEB_URL + '" style="color:#6b28d4">' + WEB_URL + '</a>.</p>';
    } else if (asistencia.indexOf('No') >= 0) {
      cuerpo += '<p>Gracias por contestar. Nos da pena no verte, pero entendemos. Te mandaremos un abrazo (y alguna foto del banquete 💜).</p>';
    } else {
      cuerpo += '<p>Gracias por responder. Apuntada tu duda. Cuando lo tengas claro, puedes volver a rellenar el formulario.</p>';
    }

    cuerpo += '<hr style="border:none;border-top:1px solid #cfb4ff;margin:20px 0">' +
      '<p style="font-size:13px;color:#6b28d4">Con cariño,<br>' + NOMBRES_NOVIOS + ' (y Toto 🐾)</p>' +
      '</div>';

    MailApp.sendEmail({
      to: emailInvitado,
      subject: asunto,
      htmlBody: cuerpo
    });

    // Copia a los novios
    MailApp.sendEmail({
      to: NOVIOS_EMAIL,
      subject: '[RSVP] ' + nombre + ' — ' + asistencia,
      htmlBody: '<pre>' + JSON.stringify(respuestas, null, 2) + '</pre>'
    });

    Logger.log('✅ Email enviado a ' + emailInvitado);
  } catch (err) {
    Logger.log('❌ Error enviando email: ' + err);
  }
}

/**
 * Opcional: recordatorio automático a quien NO ha respondido.
 * Pega la lista de invitados en una hoja "Invitados" (col A: Email, col B: Nombre).
 * Ejecuta manualmente o programa un trigger temporal.
 */
function recordatorioNoRespondidos() {
  var ss = SpreadsheetApp.getActive();
  var respuestas = ss.getSheetByName('Respuestas de formulario 1') || ss.getSheets()[0];
  var invitados = ss.getSheetByName('Invitados');
  if (!invitados) {
    Logger.log('Crea una hoja "Invitados" con columnas: Email | Nombre');
    return;
  }
  var yaRespondieron = respuestas.getDataRange().getValues()
    .slice(1).map(function(r){ return String(r[1] || '').toLowerCase(); });
  var lista = invitados.getDataRange().getValues().slice(1);
  lista.forEach(function(row){
    var email = String(row[0] || '').trim();
    var nombre = String(row[1] || '').trim();
    if (email && yaRespondieron.indexOf(email.toLowerCase()) === -1) {
      MailApp.sendEmail({
        to: email,
        subject: 'Recordatorio · Confirma tu asistencia a la boda',
        htmlBody: '<p>Hola ' + nombre + ',</p><p>Aún no hemos recibido tu confirmación para nuestra boda el ' + FECHA_BODA + '.</p><p><a href="' + WEB_URL + '">Confirma aquí</a>.</p><p>Gracias 💜</p>'
      });
    }
  });
}
