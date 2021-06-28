import { types } from 'mobx-state-tree';

const block = types.model('block', {
  click: types.boolean,
  act: types.boolean,
});

export const clicker = types
  .model('clicker', {
    index: types.number,
    list: types.array(block),
    start: types.boolean,
  })
  .actions((self) => {
    function click() {
      if (self.index > 1000) return;
      self.list[self.index].click = true;
      self.list[self.index].act = true;
      self.index += 1;
    }
    return {
      increase() {
        console.log('increase');
        if (!self.start) return;
        if (self.index > 1000) {
          self.start = false;
          return;
        }
        self.list[self.index].act = true;
        self.index += 1;
      },
      click,
      startCount() {
        self.start = true;
      },
      reset() {
        self.start = false;
        self.list.forEach((ele) => (ele.act = ele.click = false));
        self.index = 0;
      },
    };
  });
