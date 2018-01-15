import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Processing from 'elements/processing';
import moment from 'moment';

class Current extends Component {

  state = {
    'ip': '',
  };

  componentDidMount() {
    const { loadCurrentUserAPI, match } = this.props;
    const apiId = match.params.apiId;
    loadCurrentUserAPI(apiId);
  }

  updateIp = (ev) => {
    let state = { ...this.state };
    state.ip = ev.target.value;
    this.setState(state);
  };

  addIp = () => {
    const { addIp, match } = this.props;
    const apiId = match.params.apiId;
    addIp(Number(apiId), this.state.ip);
    this.setState({ ip: ''});
  };

  onChangeExpiredTime = (time) => {
    const { updateProp } = this.props;
    updateProp('expire_at', time.format('YYYY-MM-DD'))
  };

  updateInfo = () => {
    const { match, updateInfo, info } = this.props;
    const apiId = match.params.apiId;
    updateInfo(apiId, info);
  };

  renderTime = () => {
    const { info } = this.props;
    if (info.expire_at === "") {
      return (
        <Datepicker
          placeholderText="Expired time"
          dateFormat="YYYY-MM-DD"
          onChange={this.onChangeExpiredTime}
          className="form"
        />
      );
    }

    return(
      <Datepicker
        placeholderText="Expired time"
        dateFormat="YYYY-MM-DD"
        selected={moment(info.expire_at)}
        onChange={this.onChangeExpiredTime}
        className="form"
      />
    );

  };

  render() {
    const { processing, status, info, updateProp, updatePropRule, deleteIp } = this.props;

    if (Object.keys(info).length === 0 ) {
      return (
        <h1>Loading...</h1>
      )
    }

    if (status === 'error') {
      return (
        <div>
          <h1>You have not this key</h1>
        </div>
      );
    }

    return (
      <div className="row row-grid">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <h1>{info.name}</h1>
        </div>
        {processing ? <Processing />: null}

        <div className="col-md-8 col-sm-12 col-xs-12">
          <div className="default__info">
            <div className="row row-grid">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <h2>Your keys</h2>
                <p>Key: {info.key}</p>
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12">
                <p>Secret key: {info.secret}</p>
              </div>
            </div>
          </div>
        </div>



      <div className="col-md-8 col-sm-12 col-xs-12">
        <div className="default__info">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <h2>Settings</h2>
            </div>
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="row row-grid">
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <div className="row row-grid row-middle">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <label>
                        <input
                          type="checkbox"
                          onChange={ev => updateProp('is_active', !info.is_active)}
                          checked={info.is_active}/>
                        <div>
                          <span>Active status</span>
                        </div>
                      </label>
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <label>
                        <input
                          type="checkbox"
                          onChange={ev => updatePropRule('is_allow_account', !info.user_api_rule.is_allow_account)}
                          checked={info.user_api_rule.is_allow_account}
                        />
                        <div>
                          <span>Methods accounts</span>
                        </div>
                      </label>
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <label>
                        <input
                          type="checkbox"
                          onChange={ev => updatePropRule('is_allow_convert', !info.user_api_rule.is_allow_convert)}
                          checked={info.user_api_rule.is_allow_convert}
                        />
                        <div>
                          <span>Methods covert currencies</span>
                        </div>
                      </label>
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <label>
                        <input
                          type="checkbox"
                          onChange={ev => updatePropRule('is_allow_withdraw', !info.user_api_rule.is_allow_withdraw)}
                          checked={info.user_api_rule.is_allow_withdraw}
                        />
                        <div>
                          <span>Methods withdraw</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <label>Expired time</label>
                  <div className="text-left">
                    {this.renderTime()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-8 col-sm-12 col-xs-12">
        <div className="default__info">
          <h2>Ip address</h2>
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="row row-grid row-middle">
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <input
                    type="text"
                    className="form"
                    placeholder="Ip (127.0.0.1)"
                    value={this.state.ip}
                    onChange={this.updateIp}
                  />
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <button
                    className="button small button-cover primary"
                    onClick={this.addIp}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <table className="responsive-table" style={{marginTop: '20px'}}>
            <thead>
            <tr>
              <th>Ip</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
              {info.user_api_ip.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.ip}</td>
                    <td>
                      <i
                        className="fa fa-times"
                        aria-hidden="true"
                        onClick={ev => deleteIp(Number(item.id), Number(info.id))}
                        style={{cursor: 'pointer', fontSize: '1.2rem'}}></i>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-md-8 col-sm-12 col-xs-12">
        <div className="row row-right">
          <div className="col-md-12 col-sm-12 col-xs-12 text-right">
            <button
              className="button small button-cover primary"
              onClick={this.updateInfo}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Current;
