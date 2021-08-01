export function useTimer({
  onEnd,
  onTime,
}: {
  onEnd: (diff: number) => void;
  onTime: (diff: number) => void;
}) {
  let id: NodeJS.Timer;
  let diff = 0;

  function stop() {
    clearInterval(id);
    onEnd(diff / 1000);
    diff = 0;
  }

  function start(second: number) {
    const endDate = new Date();
    endDate.setSeconds(endDate.getSeconds() + second);
    id = setInterval(() => {
      diff = endDate.getTime() - new Date().getTime();
      if (diff < 0) {
        stop();
      }
      onTime(Math.ceil(diff / 1000));
    }, 100);
  }
  return {
    start,
    stop,
  };
}
