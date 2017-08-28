import constants from 'base/constants';
import {getData} from 'base/settings';

let result = {
  info: (response, dispatch) => {
    return response.json().then( json => {
      if (json.error) {
        localStorage.removeItem('current');
        return dispatch({
          type: constants.USERS_PROFILE_FETCH_INFO_ERROR,
          payload: {
            code: json.error.code
          }
        });
      }

      console.log(json);
      let initState = {
        is_active: true,
        info: json.result,
        code: 'undefined',
      };

      localStorage.setItem('profile', JSON.stringify(initState));

      return dispatch({
        type: constants.USERS_PROFILE_FETCH_INFO_SUCCESS,
        payload: {
          profile: JSON.parse(localStorage.getItem('profile'))
        }
      });

    });
  },
  logout: (response, dispatch) => {
    return response.json().then( json => {
      if (json.error) {
        return dispatch({
          type: constants.USERS_PROFILE_LOGOUT_ERROR,
          payload: json.error
        });
      }

      localStorage.removeItem('current');
      return dispatch({
        type: constants.USERS_PROFILE_LOGOUT_SUCCESS,
      });
    });
  }
};

export default {
  getInfo: () => {
    return dispatch => {

      if (!localStorage.ticket) {
        localStorage.removeItem('current');
        return dispatch({
          type: constants.USERS_PROFILE_FETCH_INFO_ERROR,
          payload: {
            error: 'undefined'
          }
        });
      }

      let params = {
        'ticket' : localStorage.getItem('ticket')
      };

      dispatch({type: constants.USERS_PROFILE_FETCH_INFO});

      return getData(2, params, 'user.info').then( response => {
        if (response.ok) {
          result.info(response, dispatch);
        } else {
          return response.json().then( json => {
            return dispatch({
              type: constants.USERS_PROFILE_FETCH_INFO_ERROR,
              payload: json
            });
          });
        }
      }).catch( error => {
        return {
          type: constants.USERS_PROFILE_FETCH_INFO_ERROR,
        };
      });
    }
  },
  logout: () => {
    return dispatch => {
      let params = {
        'ticket' : localStorage.getItem('ticket')
      };
      localStorage.removeItem('ticket');
      location.reload();
      return getData(4, params, 'user.logout').then(response =>{
        if (response.ok){
          result.logout(response, dispatch);
        } else {
          return response.json().then(json => {
            return dispatch({
              type: constants.USERS_PROFILE_LOGOUT_ERROR,
              payload: json
            });
          });
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
