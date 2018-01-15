import qrcode from './2fa/constants';
import changePassword from './changePassword/constants';
import api from './Api/constants';

export default Object.assign({
  USERS_SETTINGS_LEAVE_PAGE: 'USERS_SETTINGS_LEAVE_PAGE'
}, qrcode, changePassword, api);
