import Mock from 'mockjs';

const NameList = [];
const count = 100;

for (let i = 0; i < count; i++) {
  NameList.push(Mock.mock({
    name: '@first'
  }));
}
NameList.push({ name: 'mock-Pan' });

function mockOrderData() {
  return Mock.mock({
    'items|20': [ {
      order_no: Mock.Random.guid('@guid()'),
      timestamp: Mock.Random.date('T'),
      username: Mock.Random.name('@name()'),
      price: Mock.Random.float(1000, 15000, 0, 2),
      'status|1': [ 'success', 'pending' ]
    } ]
  });
}

export default [
  // username search
  {
    url: '/search/user',
    type: 'get',
    response: config => {
      const { name } = config.query;
      const mockNameList = NameList.filter(item => {
        const lowerCaseName = item.name.toLowerCase();
        return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0);
      });
      return {
        code: 20000,
        data: { items: mockNameList }
      };
    }
  },

  // transaction list
  {
    url: '/transaction/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: 20,
          items: mockOrderData().items
        }
      };
    }
  }
];
