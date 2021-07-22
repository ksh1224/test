import { Game } from 'pages';
import { a, Api, div, _ } from 'utils';
import './styles/index.scss';

document.body.appendChild(div({ id: 'root' }));

document.getElementById('root').appendChild(Game());
