import './styles/index.scss';
import { loadHandler, popStateHandler } from 'utils';

import { useReducer } from 'hooks';

function checkIE() {
  const browse = navigator.userAgent.toLowerCase();

  if (browse.indexOf('msie') !== -1) {
    if (
      navigator.appName !== 'Netscape' ||
      !browse.includes('trident') ||
      browse.includes('trident/4.0')
    )
      alert('IE 8 버전 이하는 지원하지 않습니다.');
    else {
      (function () {
        if (typeof window.CustomEvent === 'function') return false;

        function CustomEvent<T = any>(typeArg: string, eventInitDict?: CustomEventInit<T>) {
          // eslint-disable-next-line no-param-reassign
          eventInitDict = eventInitDict || { bubbles: false, cancelable: false, detail: undefined };
          const evt: CustomEvent<any> = document.createEvent('CustomEvent');
          evt.initCustomEvent(
            typeArg,
            eventInitDict.bubbles,
            eventInitDict.cancelable,
            eventInitDict.detail
          );
          return evt;
        }

        CustomEvent.prototype = window.Event.prototype;

        window.CustomEvent = CustomEvent;
      })();
    }
  }
}

const { endGame, init } = useReducer();

loadHandler(() => {
  init();
  checkIE();
});

popStateHandler({ onRootPath: init, onResultPath: endGame });
