// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as reportActions from '../reportActions';
import reportDefault from '../../types/report';
import type { ActionObj } from '../../types/action';
import type { ReportType } from '../../types/report';
import {
  ADD_REPORT,
  DELETE_ALL_REPORTS,
  DELETE_REPORT,
  REPLACE_REPORTS,
  UPDATE_REPORT,
} from '../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions: reportActions:', () => {
  let testReport: ReportType = { ...reportDefault, id: 'c1', label: 'Class' };
  let callback = () => {};
  let store = () => {};

  beforeEach(() => {
    callback = jest.fn();
    store = mockStore({ reports: [] });
  });

  test('replace() dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: REPLACE_REPORTS, payload: [testReport] }];

    expect.assertions(1);
    store.dispatch(reportActions.replace([testReport], callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('update() dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: UPDATE_REPORT, payload: testReport }];

    expect.assertions(1);
    store.dispatch(reportActions.update(testReport, callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('add() dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: ADD_REPORT, payload: testReport }];

    expect.assertions(1);
    store.dispatch(reportActions.add(testReport, callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('deleteOne dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: DELETE_REPORT, payload: { id: 'c1' } }];

    expect.assertions(1);
    store.dispatch(reportActions.deleteOne('c1', callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('deleteAll dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: DELETE_ALL_REPORTS }];

    expect.assertions(1);
    store.dispatch(reportActions.deleteAll(callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });
});
