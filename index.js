console.log('PWA Test Start');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(register => console.log('Service Woker Register Success.'));
}
