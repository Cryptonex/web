//p2p
const messages = {

  action: {
    'publish-advert': 'Publicar anuncio',
    'return_to_adverts': 'Volver a lista de anuncios',
    'on': 'Activado',
    'off': 'Desactivado',
    'add': 'Añadir',
    'create': 'Crear',
    'delete': 'Eliminar',
    'open': 'Abrir',
    'close': 'Cerrar',
    'pause': 'Pausa',
    'read': 'Leer',
    'cancel': 'Cancelar',
    'canceled': 'Cancelado',
    'search': 'Buscar',
    'send': 'Enviar',
    'clear': 'Borrar',
    'back': 'Atrás',
    'save': 'Guardar',
    'take': 'Coger',
    'like': 'Me gusta',
    'dislike': 'No me gusta',
    'register-por-free': 'Regístrese gratis',
    'buy': 'Comprar',
    'sell': 'Vender',
    'quick-buy': 'Compra rápida',
    'quick-sell': 'Venta rápida',
    'buy-online': 'Comprar online',
    'buy-offline': 'Comprar offline',
    'sell-online': 'Vender online',
    'sell-offline': 'Vender offline',
    'show-more': 'Mostrar más',
    'details': 'Detalles',
    'setting': 'Configuración',
    'my-adverts': 'Mis anuncios',
    'order-active': 'Pedidos activos',
    'order-completed': 'Pedidos finalizados',
    'order-canceled': 'Pedidos cancelados',
    'processing': 'Procesando...',
    'not-register': '¿No se ha registrado aún?',
    'password-recovery': ' Recuperar contraseña',
    'is-register': '¿Ya tiene una cuenta?',
    'new_wallet': 'Nuevo monedero',
    'add_hash': 'Añadir nuevo hash',
    'send_request': 'Enviar solicitud',
    'complain': 'Reclamar',
    'activate': 'Activar',
    'deactivate': 'Desactivar',
    'ask-qrcode': 'Pedir código QR',
    'update': 'Actualizar',
    need_update_search: 'Debe actualizar la búsqueda',
    copy: 'Copiar',
    editing: 'Editarando',
    create_order: 'Crear pedido',
    edit: 'Editar',
    return_list: 'Volver a la lista',
  },
  form: {
    'all': 'Todos',
    'title': 'Título',
    'description': 'Descripción',
    'sms-verified': 'SMS verificado',
    'sms-not-required': 'No se requiere SMS',
    'id-not-required': 'No se requiere ID',
    'seller': 'Vendedor',
    'country': 'País',
    'rate': 'Tipo de cambio',
    'price': 'Precio',
    'location': 'Ubicación', 'password': 'Contraseña',
    'optional-field': 'Campo opcional',
    'email': 'Correo electrónico',
    'all-adverts': 'Todos los anuncios',
    'username': 'Nombre de usuario',
    'moneda': 'Moneda',
    'amount': 'Importe',
    'limits': 'Límites',
    'type': 'Tipo',
    'amount-min': 'Importe mínimo',
    'amount-min-info': 'Límite mínimo de transacción',
    'amount-max': 'Maximum amount',
    'amount-max-info': 'Límite máximo de transacción',
    'amount-limit': 'Límite de importe',
    'payment-method': 'Método de pago',
    'payment-system': 'Sistema de pago',
    'payment-rate': 'Tipo de cambio para una unidad monetaria de cambio',
    'payment-moneda': 'Moneda de pago',
    'status': 'Estado',
    'date-created': 'Fecha de creación',
    'date-updated': 'Actualizado',
    'select-moneda': 'Seleccionar moneda',
    'order-type': 'Tipo de pedido',
    'additional-info': 'Información adicional',
    'field-required': 'Campo obligatorio',
    'select_currency': 'Seleccione la moneda',
    'balance': 'Saldo',
    'refill': 'Depositar',
    'withdraw': 'Retirar',
    'hash': 'Hash',
    'price_per_unit': 'Precio por unidad',
    'comment': 'Comentario',
    'buy': 'Comprar',
    'your_message': 'Su mensaje...',
    'field_require': 'Campos obligatorios',
    'paymentway': 'Sistema de pago',
    'address': 'Dirección',
    'time-expired-minutes': 'Tiempo vencido (minutos)',
    'select': 'Seleccionar',
    'numeric-code': 'Código numérico',
    'wexcode_next': 'Inténtelo de nuevo',
    'city': 'Ciudad',
    'exchange_currency': 'Moneda de cambio',
    'select_type_advert': 'Seleccione tipo de anuncio',
    tfa_code: 'Código TFA',
    platform: 'Plataforma',
    autoconfirmation_order: 'Confirmación automática',
    user_price: 'Precio de usuario',
    price_from_platform: 'Precio de la plataforma',
    profit: 'Beneficio',
    order: 'Pedido',
    user_buyer: 'Comprador',
    user_seller: 'Vendedor',
    exchange_currency_sell: 'Moneda que quiere vender',
    'payment-currency_sell': 'Moneda que quiere recibir',
    exchange_currency_buy: 'Moneda que quiere comprar',
    'payment-currency_buy': 'Moneda que quiere cambiar',
  },
  message: {
    p2p_need_username: 'Para usar el servicio P2P, seleccione un apodo. Tenga cuidado, solo puede introducir el apodo una vez.',
    refresh_page_and_return: 'Actualizar la página o volver a la página principal.',
    return_to_list_wallet: 'Volver a la lista de monederos.',
    select_location: 'Seleccione una ubicación',
    price_rate: 'El precio de la transacción con el valor de mercado actual',
    not_pair_rates: 'No se ha encontrado el tipo de cambio de su par de divisas',
    title_currency_buy: 'Vender moneda %{currency}',
    title_currency_sell: 'Comprar moneda %{currency}',
    question_sell: '¿Cuánto quiere vender?',
    question_buy: '¿Cuánto quiere comprar?',
    user_last_seen: 'Usuario visto por última vez en línea %{time}',
    order_low_buy: 'El importe más reducido que puede comprar para este anuncio es %{value} %{currency}',
    order_high_buy: 'El importe más grande que puede comprar para este anuncio es %{value} %{currency}',
    order_low_sell: 'El importe más reducido que puede vender para este anuncio es %{value} %{currency}',
    order_high_sell: 'El importe más grande que puede vender para este anuncio es %{value} %{currency}',
    direct_exchange_rate: 'Tipo de cambio directo',
    reverse_exchange_rate: 'Tipo de cambio contrario',
    order_confirm_warning: `Al activar la aceptación automática del pedido, usted acepta que el inicio de la ejecución será iniciado 
    por el cliente y tendrá %{minutes} minutos desde ese momento para completar el pedido.`,
    exchange_currency_sell: 'Moneda que quiere vender',
    'payment-currency_sell': 'Moneda que quiere recibir',
    exchange_currency_buy: 'Moneda que quiere comprar',
    'payment-currency_buy': 'Moneda que quiere cambiar',
    order_confirm_text: '¿Comenzar un trato para cambiar %{payment} por %{exchange}?',
    refresh_rate_order: 'El anuncio ha actualizado el tipo de cambio. ¿Continuar?',
    show_order: 'Anuncio visible',
    hide_order: 'Anuncio oculto',
    error_send_message: 'Ha ocurrido un error al enviar el mensaje.',
    success_send_message: 'Mensaje enviado.',
    code_send_to_email: 'Se ha enviado el código al correo electrónico.',
    quest_activation_code: 'Solicitar código de activación.',
    request_success_activation: 'Se le ha vuelto a enviar el correo de activación'
  },
};
const newError = {
  "32700": "Error de servidor desconocido",
  "32701": "Error de servidor desconocido",
  "32702": "Error de servidor desconocido",
  "32703": "Método API no encontrado",
  "32704": "La sesión no es válida",
  "32705": "La sesión no es válida",
  "32706": "Código TFA incorrecto",
  "32707": "Código TFA incorrecto",
  "40000": "Moneda no encontrada",
  "40001": "Moneda no encontrada",
  "40002": "Tipo de moneda no válido",
  "41000": "No se ha creado el monedero",
  "41001": "Cupón no válido",
  "41002": "Cupón no válido",
  "41003": "Error al introducir el código WEX",
  "41004": "Dirección hash no válida",
  "41005": "Monedero no encontrado",
  "41006": "Fondos insuficientes",
  "41007": "Fondos insuficientes",
  "41008": "Fondos insuficientes",
  "41009": "Error: fallo al crear transacción",
  "41010": "Vendedor no encontrado",
  "41011": "Comprador no encontrado",
  "41012": "Vendedor no encontrado",
  "41013": "Comprador no encontrado",
  "42000": "Sistema de pago no encontrado",
  "43000": "Sistema de pago no encontrado",
  "43001": "Sistema de pago no encontrado",
  "44000": "Intento no encontrado",
  "44001": "Intento no encontrado",
  "45000": "Tiempo de la transacción no especificado",
  "45001": "Tiempo de la transacción no especificado",
  "45002": "Autobatterien no especificado",
  "45003": "Autobatterien no especificado",
  "45004": "Tipo de transacción no especificado",
  "45005": "Tipo de transacción no especificado",
  "45006": "El importe mínimo es incorrecto", "45007": "El importe máximo es incorrecto",
  "45008": "El importe máximo de cambio no es válido",
  "45009": "El importe máximo de cambio no es válido",
  "45010": "Ubicación no especificada",
  "45011": "Tipo de cambio no especificado",
  "45012": "Tipo de cambio no especificado",
  "45013": "Tipo de cambio no especificado",
  "45014": "Tipo de cambio no especificado",
  "45015": "Tipos de cambio de la plataforma no especificados",
  "45016": "Tipos de cambio de la plataforma no especificados",
  "45017": "Valor del tipo de interés no especificado",
  "45018": "Valor del tipo de interés no especificado",
  "45019": "Tipo de cambio no especificado",
  "45020": "Fondos insuficientes para crear anuncios",
  "45021": "Error al crear anuncio",
  "45022": "Anuncio no encontrado",
  "45023": "Estado de la transacción no especificado",
  "45024": "Estado de la transacción no especificado",
  "45025": "Error al cambiar el estado de la transacción",
  "45026": "Anuncio no encontrado",
  "45027": "Error al actualizar anuncios",
  "46000": "Transaction no encontrado",
  "46001": "Transaction no encontrado",
  "46002": "Anuncios de token no especificados",
  "46003": "Anuncios de token no especificados",
  "46004": "Importe de la transacción no especificado",
  "46005": "Importe de la transacción no especificado",
  "46006": "Error al crear la transacción",
  "46007": "El estado de la transacción no puede cambiarse",
  "46008": "Transacción no actualizada",
  "46009": "Estado de la transacción no especificado",
  "46010": "Estado de la transacción no especificado",
  "47000": "No especifique un tipo de mensaje",
  "47001": "No especifique un tipo de mensaje",
  "47002": "El mensaje está vacío",
  "47003": "El mensaje está vacío",
  "47004": "Error al enviar",
  "47005": "ID de mensaje especificado",
  "47006": "Error al enviar",
  "48000": "Ubicación no especificada",
  "48001": "Ubicación no especificada",
  "49000": "Error al crear monedero",
  "50000": "Error al enviar",
  "50001": "Especifique la evaluación",
  "50002": "Especifique la evaluación",
  "50003": "Comentario requerido",
  "51000": "Usuario no encontrado",
  "51001": "Correo electrónico no especificado",
  "51002": "Formato de correo electrónico no válido",
  "51003": "El correo electrónico ya está en uso",
  "51004": "Nombre de usuario no especificado",
  "51005": "Formato de nombre de usuario no válido",
  "51006": "El nombre de usuario ya está en uso",
  "51007": "Contraseña no especificada",
  "51008": "Contraseña no válida",
  "51009": "Límite de intentos excedido",
  "51010": "Error al cambiar la contraseña",
  "51011": "Error al registrarse",
  "51012": "Código de activación no válido no encontrado",
  "51013": "Código de activación no válido no encontrado",
  "51014": "Error al activar el usuario",
  "51015": "Para una operación determinada del usuario no está disponible.",
  "51016": "Especifique el estado de TFA",
  "51017": "TFA ya está activado",
  "51018": "Tipo de TFA no especificado",
  "51019": "Tipo de TFA incorrecto",
  "52000": "Introduzca el nombre de la API",
  "52001": "Formato de nombre no válido",
  "52002": "Error al crear API",
  "52003": "API no encontrada",
  "52004": "API no encontrada",
  "52005": "Error al actualizar API",
  "52006": "API key no encontrado",
  "52007": "Invalid API key",
  "52008": "Error al actualizar API",
  "52009": "Error al actualizar API",
  "52010": "Error al actualizar API",
  "52011": "Error al actualizar API",
  "53000": "IP no encontrada",
  "53001": "IP no encontrada",
  "53002": "Error al añadir IP",
  "53003": "Error al retirar la IP",
  "53004": "IP no encontrada",
  "54000": "No se puede actualizar la API",
  "54001": "No se puede actualizar la API",
  "54002": "No se puede actualizar la API",
  "51020": "Error al validar el código de verificación Recaptcha",
  "51021": "Error al validar el código de verificación Recaptcha",
  "51022": "Se podrá volver a enviar el correo de activación después de 60 segundos",
  "51015_activation_request": "Su cuenta ya ha sido activada. <a href='/user/login'>Bienvenido</a>" ,
  "51000_activation_request": "Puede que lo haya escrito incorrectamente o que su correo electrónico no esté registrado."
};
const error = {
  'error': 'Error',
  'order-not-found': 'No hay pedidos con ese estado',
  '404': 'Página no encontrada',
  ...newError,
  error_send_code: 'Ha ocurrido un error, no se ha enviado el código. Inténtelo de nuevo.',
  error_check_data: 'Por favor, compruebe los datos introducidos',
  invalid_ip: 'La dirección IP tiene un formato no válido',
  advert_create: {
    '-33001': 'Tipo no encontrado',
    '-33002': 'Tipo no válido',
    '-33003': 'Moneda no encontrada',
    '-33004': 'Moneda no válida',
    '-33005': `El valor del límite mínimo de transacción no puede ser inferior a cero`,
    '-33006': `El valor del límite de importe no puede ser inferior a cero`,
    '-33007': `El valor del límite mínimo de transacción no debe exceder el límite máximo de transacción`,
    '-33008': `Límite de importe no encontrado`,
    '-33009': `Límite de importe no válido`,
    '-33010': `El valor del límite de importe no debe ser inferior al límite mínimo de transacción`,
    '-33011': `Moneda de pago no encontradao`,
    '-33012': `Moneda de pago no válida`,
    '-33013': `El campo "Moneda de cambio" es igual a "Moneda de pago"`,
    '-33014': 'Tipo de cambio para una unidad monetaria de cambio no encontrado',
    '-33015': 'Tipo de cambio para una unidad monetaria de cambio no válido',
    '-33016': 'Sistema de pago no encontrado',
    '-33017': 'El sistema de pago no existe',
    '-33018': 'País no encontrado',
    '-33019': 'El país no existe',
    '-33020': 'Tiempo vencido no encontrado',
    '-33021': 'Tiempo vencido no válido',
    '-33022': 'Ubicación no válida',
    '-33023': 'El monedero no existe',
    '-33024': 'Saldo no encontrado',
    '-33025': 'Ha ocurrido un error al crear el anuncio',
    '-33037': 'Saldo no encontrado',
  },
  advert_info: {
    '-33001': 'Uuid de anuncio no encontrado',
    '-33002': 'El anuncio no existe',
  },
  advert_set_status: {
    '-33001': 'Uuid de anuncio no encontrado',
    '-33002': 'Estado of anuncio no encontrado',
    '-33003': 'Estado of anuncio no válido',
    '-33004': 'El anuncio no existe',
    '-33005': 'Error de estado de pedido',
  },
  event_create: {
    '-33001': 'Uuid de pedido no encontrado',
    '-33002': 'El pedido no existe',
    '-33003': 'No se permite el acceso a este pedido',
    '-33004': 'Tipo no encontrado',
    '-33005': 'Tipo no válido',
    '-33006': 'Valor no encontrado',
    '-33007': 'Valor no válido',
    '-33008': 'Ha ocurrido un error al crear el evento',
  },
  order_create: {
    '-33001': 'Advert_id no encontrado',
    '-33002': 'El anuncio no existe',
    '-33003': 'Importe no encontrado',
    '-33004': 'Importe no válido',
    '-33005': 'La cuenta no existe',
    '-33006': 'Saldo no encontrado',
    '-33007': 'Ha ocurrido un error al crear el pedido',
    '-33008': 'Error de estado de pedido',
  },
  order_event_list: {
    '-33001': 'Uuid de pedido no encontrado',
    '-33002': 'El pedido no existe',
    '-33003': 'No se permite el acceso a este pedido',
  },
  order_info: {
    '-33001': 'Uuid de pedido no encontrado',
    '-33002': 'El pedido no existe',
  },
  order_info_details: {
    '-33001': 'Uuid de pedido no encontrado',
    '-33002': 'El pedido no existe',
  },
  order_set_status: {
    '-33001': 'Uuid de pedido no encontrado',
    '-33002': 'El pedido no existe',
    '-33003': 'Estado de pedido no encontrado',
    '-33004': 'Estado de pedido no válido',
    '-33005': 'No se permite configurar el estado',
  },
  place_search: {
    '-33001': 'País no encontrado',
    '-33002': 'El país no existe',
    '-33003': 'Búsqueda no encontrada',
    '-33004': 'Error desconocido',
  },
  user_auth_tfa_enable: {
    '-33001': 'Activación no encontrada',
  },
  user_login: {
    '-33001': 'Correo electrónico no encontrado',
    '-33002': 'Correo electrónico no válido',
    '-33003': 'Contraseña no encontrada',
    '-33004': 'Contraseña param. no válida',
    '-33005': 'Correo o contraseña incorrectos',
    '-33006': 'Usuario no activado',
    '-33007': 'Correo o contraseña incorrectos',
    '-33008': 'Correo o contraseña incorrectos',
    '-33009': 'Correo o contraseña incorrectos',
    '-33010': 'Límite de intentos de inicio de sesión excedido'
  },
  advert_update: {
    '-33024': 'Error al actualizar el anuncio',
  },
  common_error: {
    '-32000': 'Error en el servidor',
    '-32007': 'Sesión no válida',
    '-32008': 'Sesión no válida',
    '-32009': 'Código TFA no válido',
    '-32010': 'Correo electrónico incorrecto'
  },
};

const p2p = { ...messages, error };



export default {
  validate: {
    'empty_field': 'El campo no puede estar vacío',
    'empty_fields': 'Los campos no pueden estar vacíos',
    'invalid_email': 'El correo electrónico debe ser válido',
    'invalid_username': 'Nombre de usuario no válido',
    'invalid_repassword': 'Las contraseñas no coinciden',
    'invalid_select_currency': 'Debe seleccionar una moneda',
    'invalid_password_short': 'La contraseña debe contener al menos 8 caracteres',
  },
  order_status: {
    created_buyer: 'Esperando la confirmación del vendedor',
    accepted_buyer: 'Pendiente de la transferencia de los fondos del comprador',
    paid_buyer: 'Pagado',
    moderated_buyer: 'En moderación',
    confirmed_buyer: 'Confirmado',
    completed_buyer: 'El trato ha concluido con éxito',
    timeout_confirmed_buyer: 'El tiempo de la transacción ha caducado, se ha realizado la transferencia de dinero',
    canceled_buyer: 'Trato cancelado por el vendedor',
    timeout_canceled_buyer: 'El tiempo de la transacción ha caducado',
    created_seller: 'Pendiente de la confirmación del comprador',
    accepted_seller: 'Esperando la transferencia de los fondos del comprador',
    paid_seller: 'Pagado',
    moderated_seller: 'En moderación',
    confirmed_seller: 'Confirmado',
    completed_seller: 'El trato ha concluido con éxito',
    timeout_complete_seller: 'El tiempo de la transacción ha caducado, se ha realizado la transferencia de dinero',
    canceled_seller: 'Trato cancelado por el comprador',
    timeout_canceled_seller: 'El tiempo de la transacción ha caducado'
  },
  status_adverts: {
    actived: 'Activo',
    removed: 'Retirado',
    canceled: 'Inactivo',
  },
  status_orders: {
    created: 'Pendiente de aprobación',
    accepted: 'Pendiente de transferencia de fondos',
    paid: 'Pagado',
    moderated: 'Moderación',
    confirmed: 'Confirmado',
    completed:'El trato ha concluido con éxito',
    timeout_confirmed: 'El tiempo de la transacción ha caducado',
    timeout_canceled: 'El tiempo de la transacción ha caducado',
    canceled: 'El trato ha sido cancelado'
  },
  user_status: {
    activated: 'Usuario activado',
    blocked: 'Usuario bloqueado'
  },
  menu: {
    'buy': 'Comprar',
    'sell': 'Vender',
    'guide': 'Guía',
    'support': 'Soporte',
    'terms-of-service': 'Términos y condiciones',
    'orders': 'Pedidos',
    'rates': 'Tipos de cambio'
  },
  user: {
    'user': 'Usuario',
    'registration': 'Registro',
    'login': 'Iniciar sesión',
    'logout': 'Cerrar sesión',
    'account': 'Cuenta',
    'profile': 'Perfil',
    'username': 'Nombre de usuario',
    'password': 'Contraseña',
    'name': 'Nombre',
    'phone': 'Teléfono',
    'adverts': 'Anuncios',
    'wallet': 'Monedero'
  },
  "form": {
    "email": "Correo electrónico",
    "password": "Contraseña",
    "confirm_pwd": "Confirmar contraseña",
    "auth_code": "Código de autenticación",
    "your_login": "Tu nombre de usuario",
    "login": "Iniciar sesión",
    "enter_google_2fa_code": "Introduce el código de 6 dígitos",
    "old_pwd": "Contraseña antigua",
    "new_pwd": "Nueva contraseña",
    "title": "Título",
    "expired_time": "Fecha de caducidad",
    "currency": "Moneda",
    "amount": "Importe",
    "select_currency": "Seleccionar moneda",
    "send_to": "Enviar a",
    ...p2p.form,
  },
  "action": {
    "login": "Iniciar sesión",
    "create_acc": "Crear cuenta",
    "authenticate": "Autenticar",
    "cancel": "Cancelar",
    "restore": "Restaurar",
    "change": "Cambiar",
    "show_qr": "Ver código QR",
    "enable": "Habilitar",
    "save_qr": "Guardar código QR",
    "disable": "Inhabilitar",
    "create": "Crear",
    "add": "Añadir",
    "save": "Guardar",
    "copy": "Copiar",
    "send": "Enviar",
    "exchange": "Cambio",
    ...p2p.action,
  },
  "page": {
    "activation_acc": "Activación de cuenta",
    "sign_in": "Registrarse",
    "sign_up": "Iniciar sesión",
    "sign_out": "Cerrar sesión",
    "create_your_acc": "Crea tu cuenta",
    "forgot_pwd": "¿Contraseña olvidada?",
    "not_registered": "¿No tienes una cuenta? Créala.",
    "already_registered": "¿Ya tienes cuenta? Inicia sesión.",
    "success_registered": "Gracias por registrarte. Se ha enviado a tu correo electrónico un mensaje con instrucciones para la activación.",
    "success_activated_acc": "Tu cuenta se ha activado correctamente.",
    "error_activated_acc": "ERROR. Tu cuenta todavía no se ha activado.",
    "request_new_pwd": "Solicitar nueva contraseña",
    "success_recovery_mail_pwd": "Correcto. Se ha enviado a tu correo electrónico un mensaje con instrucciones para la recuperación de la contraseña.",
    "enable_2fa": "Habilitar la verificación en dos pasos",
    "disable_2fa": "Deshabilitar la verificación en dos pasos",
    "text_google_2fa": "Por la seguridad de tu cuenta, activa la autenticación de dos factores (2FA). Para hacerlo necesitas el código de 6 dígitos. Para recibir este código, descarga Google Authenticator y escanea el código QR.",
    "text_google_2fa_disable": "Si deseas desactivar 2FA, introduce el código de seis dígitos proporcionado por la aplicación Google Authenticator, luego haga clic en &quot;Deshabilitar&quot;.",
    "qr_code": "Código QR",
    "your_secret_key": "Tu clave secreta",
    "change_password": "Cambiar contraseña",
    "create_user_api": "Crear usuario API",
    "title": "Título",
    "date": "Fecha",
    "status": "Estado",
    "active": "Activo",
    "deactive": "Desactivado",
    "have_not_api_key": "No tienes esta clave",
    "your_api_keys": "Tus claves API",
    "api_methods_acc": "Métodos de cuentas",
    "api_convert_currency": "Métodos de monedas cubiertas",
    "api_withdraw": "Métodos de retirada",
    "actions": "Acciones",
    "ip_address": "Dirección IP",
    "settings": "Configuración",
    "make_deposit": "Hacer un depósito",
    "autoconvert_into_cnx": "Conversión automática en CNX",
    "deposit_qr": "Depósito por escaneo abajo",
    "deposit_copy": "o depósito directo a",
    "choose_withdraw_type": "Elige un tipo de retirada",
    "you_give": "Das",
    "you_receive": "Recibes",
    "exchange_rate": "Tasa de cambio",
    "fee": "Comisión",
    "pair": "Par",
    "price": "Precio",
    "volume": "Volumen",
    "charts": "Gráficos",
    "today": "Hoy",
    "this_week": "Esta semana",
    "all": "Todos",
    "this_month": "Este mes",
    "last_month": "Mes pasado",
    "this_year": "Este año",
    "previous": "Anterior",
    "next": "Siguiente",
    "deposit": "Depósito",
    "transactions": "Transacciones",
    "withdraw": "Retirar",
    "exchange": "Cambio",
    "restore": "Restaurar",
    "balances": "Saldos",
    "fiat": "Fiat"
  },
  "message": {
    p2p_shot_info: 'Para aprender a utilizar el servicio P2P, lea la breve guía sobre él.',
    "success": "Correcto",
    "status_change_autoconvert_into_cnx": "El estado ha sido cambiado correctamente.",
    ...p2p.message,
  },
  "error": {
    "fill_all_field": "Rellena todos los campos.",
    "wrong_user": "Acceso denegado: usuario o contraseña incorrectos",
    "not_activated_acc": "Te hemos enviado un mensaje con el enlace a tu correo electrónico. Sigue el enlace del mensaje para activar tu cuenta.",
    "invalid_auth_key": "¡Código de autenticación inválido!",
    "invalid_format": "Formato no válido, %{field}.",
    "unknown_error": "Error desconocido.",
    "enter_6_dig": "Introduce el código de 6 dígitos",
    "register_error": "Error durante el registro.",
    "different_pwd": "Las contraseñas no coinciden.",
    "fail_change_pwd": "No se ha podido cambiar la contraseña.",
    "wrong_user_restore_pwd": "Usuario incorrecto.",
    "fail_activated_2fa": "Error al activar 2FA.",
    "is_empty": "%{field} está vacío.",
    "should_num": "%{field} debe ser numérico.",
    "error_send": "Error enviado",
    "error": "Error",
    "exchange_not_balance": "Es posible que no tengas suficiente dinero para realizar transacciones comerciales en la cuenta.",
    ...p2p.error,
  },
  "fee": {
    "cnx": "Cantidad mínima = 0,001 CNX | Sin comisiones",
    "btc": "Cantidad mínima = 0,002 BTC | Tarifa = 0,001 BTC",
    "eth": "Cantidad mínima = 0,002 ETH | Tarifa = 0,001 ETH"
  },
  "statusTransaction": {
    "created": "Creado",
    "moderated": "Moderado",
    "unconfirmed": "No confirmado",
    "confirmed": "Confirmado",
    "admin_moderate_success": "Aprobado por el administrador",
    "admin_moderate_cancel": "Cancelado por el administrador",
    "admin_moderate_wait": "Moderado por el administrador",
    "moderate": "Moderado"
  },
  "coupon": {
    "checking_coupon": "Comprobando tarjeta",
    "scanning_coupon": "Escanear la tarjeta",
    "begin_scanning_coupon": "Escanear la tarjeta",
    "not_access_camera": "Debe permitir el acceso a la cámara y actualizar la página",
    "coupon": "Tarjeta",
    "check": "Comprobar",
    "create_coupon": "Crear un código",
    "time_of_action": "Hora de acción",
    "receiver": "Destinatario",
    "select_currency": "Seleccione una moneda",
    "activate_coupon": "Activar la tarjeta",
    "apply_coupon": "Recarga de tarjeta",
    "apply": "Hacer un depósito",
    "deactivate_coupon": "Desactivar la tarjeta",
    "deactivate": "Desactivar",
    "information": "Información sobre la tarjeta",
    "creator": "Propietario",
    "given": "Protegida por contraseña",
    "not_given": "No está protegida por contraseña",
    "time_of_redeem": "Tiempo de activación",
    "invalid_qrcode": "Código Qr no válido",
    "check_coupon_fail": "No se encontraron los datos de la tarjeta",
    "field_empty": "Field \"%{field}\" se debe completar",
    "take_currency": "Debe especificar una moneda",
    "success_create_coupon": "La tarjeta se ha creado con éxito",
    "error_length_comment": "El comentario excede el número de caracteres permitido (255)",
    "error_create_coupon": "Se produjo un error al crear la tarjeta",
    "need_password": "Debe especificar una contraseña",
    "activate_coupon_success": "La tarjeta está activada",
    "activate_coupon_error": "Se ha producido un error al activar la tarjeta",
    "not_found_coupon": "No se encontró la tarjeta",
    "coupon_was_used": "La tarjeta ya ha sido utilizada",
    "fail_apply_coupon": "Se produjo un error al recargar la tarjeta",
    "coupon_refilled": "Se ha recargado la tarjeta",
    "your_coupon": "Sus tarjetas",
    "optional_field": "No requerido",
    "types": {
      "debit": "Tarjeta",
      "empty": "Tarjeta desechable",
      "joker": "Comodín"
    },
    "status": {
      "actived": "No activado",
      "redeemed": "Gastado",
      "created": "Esperando la recarga"
    }
  }
}
