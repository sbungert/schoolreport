// @flow

import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { toastr } from 'react-redux-toastr';
import * as reportActions from '../../../actions/reportActions';
import { Button, FieldWrap, Form, FormCancel } from '../../../components/Ui';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import Translation, { text } from '../../../components/Translation/Translation';
import setTitle from '../../../utils/setTitle';
import type { FsObject } from '../../../types/fsObject';
import { ROUTE_REPORTS } from '../../../constants/routes';

export type Props = {
  ...RouteComponentProps,
  dispatch: Function,
};

type State = {
  deleting: boolean,
  error: boolean,
};

export class DeleteReportsLayout extends Component<Props, State> {
  props: Props;
  state: State = {
    deleting: false,
    error: false,
  };

  componentDidMount() {
    setTitle(text('WinTitle', 'DeleteReportsLayout'));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceDeleteError', 'Reports'));
      this.props.history.push(ROUTE_REPORTS);
    } else if (this.state.deleting) {
      this.props.dispatch(reportActions.deleteAll(this.dataSaved));
      this.setState({ deleting: false });
    }
  }

  handleClick = (event: SyntheticMouseEvent<HTMLElement>): void => {
    event.preventDefault();
    this.setState({ deleting: true });
  };

  dataSaved = (ioResult: FsObject): void => {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceDeleted', 'Reports'));
      this.props.history.push(ROUTE_REPORTS);
    } else {
      this.setState({
        deleting: false,
        error: true,
      });
    }
  };

  render() {
    return (
      <EditPanel>
        <EditPanelHeader title={text('DeleteReports', 'EditPanelHeader')} />
        <EditPanelContent>
          <h2 className="form__headline">
            {this.state.deleting ? (
              <Translation name="HeadlineDeleting" ns="DeleteReportsLayout" />
            ) : (
              <Translation name="Headline" ns="DeleteReportsLayout" />
            )}
          </h2>
          <Form>
            <FieldWrap>
              <Button
                type="button"
                onClick={this.handleClick}
                buttontype="warning"
                disabled={this.state.deleting}
                busy={this.state.deleting}
              >
                <Translation name="BtnLabel" ns="DeleteReportsLayout" />
              </Button>
            </FieldWrap>

            {!this.state.deleting && <FormCancel name="BackToReports" ns="Reports" to={ROUTE_REPORTS} />}
          </Form>
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default DeleteReportsLayout;
