const middleware = store => next => async action => {
  if (action.type !== 'PROMISE') {
    return next(action);
  }

  const [startAction, failureAction, successAction] = action.payload.actions;
  const { handlerData, successCallback, errorCallback } = action.payload;

  store.dispatch({ type: startAction });

  const response = await action.payload.response;

  if (typeof response === 'undefined') {
    return;
  }



  const json = await response.json();

  if (response.ok) {
    if (typeof json.error !== 'undefined') {


      if (typeof errorCallback === 'function') {
        errorCallback(store.dispatch)
      }

      return store.dispatch({
        type: failureAction,
        payload: {
          codeError: json.error.code,
        }
      });
    }



    if (typeof successCallback === 'function') {
      successCallback(store.dispatch);
    }

    return store.dispatch({
      type: successAction,
      payload: (typeof handlerData === 'function') ? handlerData(json.result): json.result,
    });
  }

  throw new Error(json.error || `Unknown error occurred (HTTP ${response.status})!`);
};


export default middleware;
