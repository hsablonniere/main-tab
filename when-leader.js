const DEFAULT_NAMESPACE = 'default';
// Firefox seems to throttle setTimeout to 1 sec when the window is inative
const DELAY = 1000;
const DELAY_FACTOR = 2.5;

/**
 * TODO docs
 * @param {String} namespace
 * @returns {Promise}
 */
export function whenLeader (namespace = DEFAULT_NAMESPACE) {

  const storageKey = 'when-leader.' + namespace;

  function getState () {
    return JSON.parse(localStorage[storageKey] ?? '[]');
  }

  function setState (state) {
    localStorage[storageKey] = JSON.stringify(state);
  }

  function clearState () {
    delete localStorage[storageKey];
  }

  return new Promise((resolve) => {

    const currentTabId = Math.random();

    function runLoop () {

      const [leaderId, lastHeartbeat, isElected] = getState();
      const currentTabIsLeader = (leaderId === currentTabId);
      const newHeartbeat = new Date().getTime();
      const heartbeatIsOld = (newHeartbeat - lastHeartbeat) > (DELAY * DELAY_FACTOR);

      if (leaderId == null || heartbeatIsOld) {
        // Vote for current tab
        setState([currentTabId, newHeartbeat, false]);
      }
      else if (currentTabIsLeader) {
        if (!isElected) {
          // Elect current tab as leader
          resolve();
          // Reset state before closing tab
          window.addEventListener('beforeunload', () => {
            clearState();
          });
        }
        // Update leader heartbeat
        setState([currentTabId, newHeartbeat, true]);
      }

      setTimeout(runLoop, DELAY);
    }

    runLoop();
  });
}
