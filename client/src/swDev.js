/* eslint-disable no-shadow */
export default function swDev() {
    const swDev = `http://localhost:3030/sw.js`;
    navigator.serviceWorker.register(swDev).then((result) => {
        console.log('result', result);
    }).catch((error) => {
        console.log('error', error);
    });
}