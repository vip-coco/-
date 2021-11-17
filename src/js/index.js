import print from './print';

print();

const add = (x, y) => x + y;
// 下面语法不检查👇
// eslint-disable-next-line
console.log(add(8, 1));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    // eslint-disable-next-line
    console.log('定时器执行完了~');
    resolve();
  }, 1000);
});
// eslint-disable-next-line
console.log(promise); 
// if (module.hot) {
//   module.hot.accept('./print.js', () => {
//     print();
//   });
// }
// eslint-disable-next-line
console.log(b());
