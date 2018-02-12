import React, {Component} from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Processing from 'elements/processing';
import { Tabs, Pane } from 'elements/Tabs';
import { translate } from "base/utils";

class Main extends Component {

  componentDidMount() {
    const { loadUserAPI } = this.props;
    loadUserAPI();
  }

  render() {
    const { createForm, updateCreateForm, createAPIKey, listKeys, match } = this.props;
    return(
      <div className="row row-grid">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <h3>{translate('page.create_user_api')}</h3>
          <div className="row row-grid row-middle">
            <div className="col-md-4 col-sm-12 col-xs-12">
              <input
                type="text"
                className="form"
                placeholder={translate('form.title')}
                value={createForm.name}
                onChange={ev => updateCreateForm('name', ev.target.value)}
              />
            </div>
            <div className="col-md-4 col-sm-12 col-xs-12">
              <button
                className="button small button-cover primary"
                onClick={ev => createAPIKey(createForm)}
              >
                {translate('action.create')}
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-sm-12 col-xs-12">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>{translate('page.title')}</th>
                <th>{translate('page.date')}</th>
                <th>{translate('page.status')}</th>
              </tr>
            </thead>
            <tbody>
              {listKeys.map((item) => {
                let localeTime = moment.utc(item.create_at).toDate();
                localeTime = moment(localeTime).format('YYYY-MM-DD HH:mm:ss');
                return(
                  <tr key={item.id}>
                    <td>
                      <Link to={`${match.path}/${item.id}`} style={{color: '#286c8e'}}>
                        <span style={{maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis'}}>{item.name}</span>
                      </Link>
                    </td>
                    <td>{localeTime}</td>
                    <td>{item.is_active ? translate('page.active'): translate('page.deactive')}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Main;
