// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import InfoMessage from '../../InfoMessage/InfoMessage';
import Icon from '../../Icon/Icon';
import Sidebar from '../../Sidebar/Sidebar';
import SidebarHeader from '../../Sidebar/Header/SidebarHeader';
import SidebarList from '../../Sidebar/List/SidebarList';
import SidebarFooter from '../../Sidebar/Footer/SidebarFooter';
import NavButtonCircular from '../../ui/NavButtonCircular/NavButtonCircular';
import EditReportLayout from './Edit/EditReportLayout';
import NewReportLayout from './New/NewReportLayout';
import DeleteReportsLayout from './Delete/DeleteReportsLayout';
import { text }  from '../../Translation/Translation';
import { reportSort } from '../../../types/report';
import type { ReportType } from '../../../types/report';
import type { ClassType } from '../../../types/class';
import {
  ROUTE_DEL_REPORTS,
  ROUTE_EDIT_REPORT,
  ROUTE_NEW_REPORT,
  ROUTE_REPORTS,
} from '../../../constants/routes';
import setTitle from '../../../utils/title';

type Props = {
  classes: Array<ClassType>,
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
  reports: Array<ReportType>,
};


/**
* Layout for displaying reports.
*/
export class ReportsLayout extends Component<Props> {
  static defaultProps = {
    classes: [],
    reports: [],
  };

  props: Props;

  componentDidMount() {
    setTitle(text('WinTitle', 'Reports'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_REPORTS) setTitle(text('WinTitle', 'Reports'));
  }

  render() {
    const HAS_REPORTS = (this.props.reports.length > 0) ? true : false;
    const leftActions = (
      <NavButtonCircular
        to={ROUTE_NEW_REPORT}
        className="SidebarFooter__action"
        buttontype="pos-rollover"
        action="add-report"
        title={text('ReportAdd', 'Actions')}
      >
        <Icon type="ui-add" />
      </NavButtonCircular>
    );

    const rightActions = (
      <NavButtonCircular
        disabled={!HAS_REPORTS}
        to={ROUTE_DEL_REPORTS}
        className="SidebarFooter__action"
        buttontype="neg-rollover"
        action="delete-reports"
        title={text('ReportDelete', 'Actions')}
      >
        <Icon type="trash" />
      </NavButtonCircular>
    );

    return (
      <div className="Panel">
        <Sidebar>
          <SidebarHeader title={text('Header-report', 'SidebarHeader')} />
          <SidebarList dispatch={this.props.dispatch} listType="report" items={this.props.reports} noItemsTxt={text('Reports', 'SidebarNoItems')} sortOrder={reportSort} />
          <SidebarFooter leftActions={leftActions} rightActions={rightActions} />
        </Sidebar>
        <Switch>u
          <Route path={ROUTE_EDIT_REPORT} render={routerProps => <EditReportLayout {...routerProps} dispatch={this.props.dispatch} reports={this.props.reports} classes={this.props.classes} />} />
          <Route path={ROUTE_DEL_REPORTS} render={routerProps => <DeleteReportsLayout {...routerProps} dispatch={this.props.dispatch} />} />
          <Route path={ROUTE_NEW_REPORT} render={routerProps => <NewReportLayout {...routerProps} dispatch={this.props.dispatch} classes={this.props.classes} />} />
          <Route path={ROUTE_REPORTS} render={routerProps => <InfoMessage {...routerProps} headine={text('Reports', 'InfoMessage')} subtext={text('ReportsMsg', 'InfoMessage')} />} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state: Object) => (
  {
    classes: state.classes,
    reports: state.reports,
  }
);


export default connect(mapStateToProps)(ReportsLayout);
