import { Input } from 'components';
import { useState } from 'hooks/useState';
import { createStyles, div, input, p, _ } from 'utils';

const styles = createStyles({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizWrap: {
    padding: '0 20px',
    width: '400px',
  },
  statusBar: {
    height: '30px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  title: {
    marginTop: '30px',
    marginBottom: '20px',
    fontSize: '40px',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  input: {
    border: '1px solid black',
    height: '30px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  button: {
    cursor: 'pointer',
    height: '50px',
    width: '150px',
    background: 'rgb(70,161,248)',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    margin: 'auto',
  },
});

export function Game() {
  const { render, state, setState } = useState('');
  return render(
    div(
      { style: styles.container },
      div({ style: styles.quizWrap }, [
        div({ style: styles.statusBar }, [p(_, '남은시간: 10초'), p(_, '점수: 9점')]),
        div({ style: styles.title }, state || '테스트'),
        Input({ id: 'input', style: styles.input, onChangeText: (e) => console.log(e) }),
        div({ style: styles.button, onclick: () => {} }, '시작'),
      ])
    )
  );
}
