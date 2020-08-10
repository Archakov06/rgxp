import { compose, withState, withHandlers, mapProps } from 'recompose';
import copy from 'copy-to-clipboard';

import Pattern from '../components/Pattern';
import language from '../../../language';

const isValidState = withState('isValid', 'setIsValid', null);
const valueState = withState('fieldValue', 'setValue', null);
const patternState = withState('pattern', 'setPattern', null);
const matchesState = withState('matches', 'setMatches', []);

const handlers = withHandlers({
  search: ({ history }) => tag =>
    history.push({ pathname: '', search: 'search=' + tag }),
  handleTestChange: ({ setIsValid, setMatches, setValue, obj }) => event => {
    let { pattern } = obj;
    let flag = pattern.match('/([gimy]{1,4})$');
    const value = event.target.value;

    if (flag) {
      pattern = pattern.slice(1, pattern.indexOf(flag[0]));
      flag = flag[1];
    }

    const exp = new RegExp(pattern, flag ? flag : '');
    const matches = value.match(exp);

    setValue(value);
    setIsValid(exp.test(value));
    setMatches(matches ? matches.filter(e => e) : []);
  },
  copyToClipboard: () => e => {
    e.target.select();
    copy(e.target.value);
  },
  patternChange: ({ setPattern }) => event => setPattern(event.target.value),
});

export default compose(
  isValidState,
  valueState,
  patternState,
  matchesState,
  handlers,
  mapProps(props => ({
    ...props,
    dict: language[props.language],
  })),
)(Pattern);
