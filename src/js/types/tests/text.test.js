// @flow

import textDefault, { TextFactory, getTextIdStr } from '../text';
import type { TextType } from '../text';
import { ICON_TEXTS } from '../../constants/icons';
import { ROUTE_DEL_TEXT, ROUTE_EDIT_TEXT } from '../../constants/routes';
import { generateId } from '../../utils/ids';

describe('Types: Text', () => {
  const langCode: string = 'EN';
  const textObj: TextType = {
    ...textDefault,
    bodytext: 'A text',
    charCount: 6,
    created: -1,
    updated: -2,
  };
  const ts: number = Date.now();
  const idStr: string = getTextIdStr(textObj);
  const id: string = generateId(idStr, ts);
  const testText: TextType = {
    ...textDefault,
    bodytext: 'A text',
    charCount: 6,
    created: ts,
    id: id,
    lang: langCode,
    updated: ts,
  };

  test('TextFactory() correctly returns a new pupil object', () => {
    const newTextObj: TextType = TextFactory(textObj, ts, langCode);
    expect(JSON.stringify(newTextObj)).toEqual(JSON.stringify(testText));
    expect(newTextObj.created).toBe(newTextObj.updated);
  });

  test('getTextIdStr() returns the same string given the same object', () => {
    const idStrCompare: string = getTextIdStr(textObj);
    expect(idStr).toEqual(idStrCompare);
  });

  describe('Getters:', () => {
    const newTextObj: TextType = TextFactory(textObj, ts, langCode);

    test('getDescription() correctly returns the description', () => {
      expect(newTextObj.getDescription()).toEqual('');
    });

    test('getIcon() correctly returns the icon', () => {
      expect(newTextObj.getIcon()).toEqual(ICON_TEXTS);
    });

    test('getLabel() correctly returns the label', () => {
      expect(newTextObj.getLabel()).toEqual(newTextObj.bodytext);
    });

    test('getLabel() correctly crops the label', () => {
      expect(newTextObj.getLabel(3)).toEqual(newTextObj.bodytext.substr(0, 3) + '…');
    });

    test('getTooltip() correctly returns the tooltip', () => {
      expect(newTextObj.getTooltip()).toEqual(newTextObj.bodytext);
    });

    describe('contains()', () => {
      test('Returns false if no search term', () => {
        const result = newTextObj.contains();
        expect(result).toBe(false);
      });

      test('Returns false if the text object does not begin with the search term.', () => {
        const term: string = 'text';
        const result: boolean = newTextObj.contains(term);
        expect(result).toBe(false);
      });

      test('Returns true if the text object begins with the search term.', () => {
        const term: string = 'A t';
        const result: boolean = newTextObj.contains(term);
        expect(result).toBe(true);
      });

      test('Returns true if the text object contains the search term.', () => {
        const term: string = 'text';
        const result: boolean = newTextObj.contains(term, true);
        expect(result).toBe(true);
      });
    });

    describe('getUrl()', () => {
      test('Returns ROUTE_DEL_TEXT if linkType is delete', () => {
        expect(newTextObj.getUrl('delete')).toBe(ROUTE_DEL_TEXT.replace(':textId', newTextObj.id));
      });

      test('Returns ROUTE_EDIT_TEXT for any other linkType', () => {
        const expects: string = ROUTE_EDIT_TEXT.replace(':textId', newTextObj.id);
        expect(newTextObj.getUrl()).toBe(expects);
        expect(newTextObj.getUrl('something')).toBe(expects);
      });
    });
  });
});
