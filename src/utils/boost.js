/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/3/20
  * Time: 16:22
  * describe:
  */
/* eslint-disable */
Array.prototype.pushWithoutDuplicate = function () {
  if (arguments.length < 1) {
    return;
  }
  // 第一个参数接受数组,是添加的对象集合
  // 第二个参数接受,判断唯一值的依据, 可以是对象的某个属性例如 id, 如果为空则直接判断对象或者元素本身
  const items = arguments[ 0 ];
  const soleBasis = arguments[ 1 ];
  for (let i = 0; i < items.length; i++) {
    const arg = items[ i ];
    // 如果依据存在, 则根据依据判断是否存在
    if (soleBasis) {
      if (!this.find(v => v[ soleBasis ] === arg[ soleBasis ])) {
        this.push(arg);
      }
    } else {
      if (this.indexOf(arg) === -1) {
        this.push(arg);
      }
    }
  }
};
