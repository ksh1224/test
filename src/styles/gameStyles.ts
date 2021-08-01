import { colors, createStyles } from 'utils';

export const gameStyles = createStyles({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizWrap: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    alignSelf: 'center',
    display: 'inline',
    fontSize: '20px',
    top: '20%',
  },
  quizTextWrap: {
    display: 'flex',
    width: '100%',
    height: '150px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formWrap: {
    maxWidth: '300px',
    width: '80%',
    height: '100px',
  },
  infoWrap: {
    display: 'flex',
    maxWidth: '300px',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrongText: {
    position: 'absolute',
    color: colors.red,
    fontSize: '100px',
  },
  correctText: {
    position: 'absolute',
    color: colors.main,
    fontSize: '100px',
  },
  scoreText: {
    color: colors.main,
    position: 'absolute',
    left: '5px',
    width: '100px',
  },
  byeByePoint: {
    color: colors.red,
    width: '100px',
    position: 'absolute',
    opacity: 0,
    animation: '0.8s byeByePoint',
  },
  button: {
    cursor: 'pointer',
    height: '50px',
    width: '150px',
    background: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    margin: 'auto',
  },
  input: {
    border: `1px solid ${colors.main}`,
    borderRadius: '5px',
    height: '40px',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '20px',
  },
});
