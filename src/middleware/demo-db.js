export default {
  'token': {
    'access_token': 'fake-token-12345789-abcdefgh',
    'user': {'firstName': 'Иван', 'lastName': 'Иванович', 'email': 'admin@test.com', 'password': 'password'}
  },
  'customers': [{
    closedDeals: 1,
    dealSumm: 9.99,
    dataSumm: '2019-05-12T08:05:19.933Z',
    customerCompanyName: 'order-6-6-1-2',

    'membership': false,
    'mobile': '555-555-555',
    'rewards': 21,
    group: 0,
    'id': 2,
    kpiWeight: 0,
    clientProblems: 100,
    allClientProblems: 200,
    clientProblemsTime: 50,
    'firstName': 'Елена',
    'lastName': 'Кузнецова',
    'email': 'abc@test.com',
    summary: 100,
    payment: 25000,
    factKpi: 85,
    totalKpi: 18,

    kpiWeight1: 30,
    kpiWeight2: 20,
    kpiWeight3: 20,

    Vzak: 80,
    Nzak: 100,
    CP: 6,
    CPplan: 10,
    CustomerGoods: 40,
    CompanyGoods: 40,


    allClientCalls: 100,
    'avatar': '/assets/img/avatar3.png',
    worktime: [
      {
        title: 'Рабочее время 1',
        start_time: '2019-05-12T08:05:19.933Z',
        end_time: '2019-05-12T12:05:19.933Z',
      },
      {
        title: 'Рабочее время 2',
        start_time: '2019-05-12T13:05:19.933Z',
        end_time: '2019-05-12T17:05:19.933Z',
      }
    ]
  }, {

    closedDeals: 12,
    dealSumm: 19.99,
    dataSumm: '2019-05-14T08:05:19.933Z',
    customerCompanyName: 'order-6-6-12-3',



    'membership': false,
    'mobile': '555-555-555',
    'rewards': 89,
    clientProblemsTime: 50,
    allClientCalls: 100,
    group: 1,
    'id': 4,
    kpiWeight: 1,
    clientProblems: 100,
    allClientProblems: 200,
    payment: 25000,
    totalKpi: 16,

    kpiWeight1: 20,
    kpiWeight2: 20,
    kpiWeight3: 20,

    Vzak: 80,
    Nzak: 100,
    CP: 6,
    CPplan: 10,
    CustomerGoods: 40,
    CompanyGoods: 40,
    'firstName': 'Юлия',
    'lastName': 'Бобылёва',
    'email': 'test@test.com',
    'avatar': '/assets/img/avatar3.png',
    worktime: [
      {
        title: 'Рабочее время 1',
        start_time: '2019-05-12T08:05:19.933Z',
        end_time: '2019-05-12T12:05:19.933Z',
      },
      {
        title: 'Рабочее время 2',
        start_time: '2019-05-12T13:05:19.933Z',
        end_time: '2019-05-12T17:05:19.933Z',
      }
    ]
  }, {
    closedDeals: 4,
    dealSumm: 5.49,
    dataSumm: '2019-05-13T08:05:19.933Z',
    customerCompanyName: 'order-6-4-12-3',

    'membership': false,
    'mobile': '555-555-555',
    'rewards': 38,
    group: 2,
    clientProblemsTime: 50,
    'id': 5,
    allClientProblems: 200,
    clientProblems: 100,
    allClientCalls: 100,
    payment: 25000,
    totalKpi: 26,

    kpiWeight1: 20,
    kpiWeight2: 20,
    kpiWeight3: 50,

    Vzak: 80,
    Nzak: 100,
    CP: 6,
    CPplan: 10,
    CustomerGoods: 40,
    CompanyGoods: 40,
    'firstName': 'Тимофей',
    'lastName': 'Уваров',
    'email': 'test@test.com',
    'avatar': '/assets/img/avatar1.png',
    worktime: [
      {
        title: 'Рабочее время 1',
        start_time: '2019-05-12T08:05:19.933Z',
        end_time: '2019-05-12T12:05:19.933Z',
      },
      {
        title: 'Рабочее время 2',
        start_time: '2019-05-12T13:05:19.933Z',
        end_time: '2019-05-12T17:05:19.933Z',
      }
    ]
  }],
  'orders': [{
    'id': 2,

    closedDeals: 1,
    customerName: '',
    rewards: 2,

    'reference': 'order-2-2-1-2',
    'customerId': 2,
    'products': [{
      'id': 1,
      'productName': 'Product HHYDP',
      'categoryId': 1,
      'unitInStock': null,
      'unitPrice': 18
    }, {'id': 2, 'productName': 'Product RECZE', 'categoryId': 1, 'unitInStock': null, 'unitPrice': 19}],
    'amount': 9.99,
    'orderDate': '2017-01-01',
    'shippedDate': '2017-01-01',
    'shipAddress': {'address': 'Gran Vía, 0123', 'city': 'Madrid', 'zipcode': '10298', 'country': 'Spain'}
  }, {
    'id': 3,
    'reference': 'order-4-3-1-2',
    'customerId': 4,
    closedDeals: 5,
    customerName: '',
    rewards: 1.99,
    'products': [{
      'id': 1,
      'productName': 'Product HHYDP',
      'categoryId': 1,
      'unitInStock': null,
      'unitPrice': 18
    }, {'id': 2, 'productName': 'Product RECZE', 'categoryId': 1, 'unitInStock': null, 'unitPrice': 19}],
    'amount': 5.99,
    'orderDate': '2017-01-01',
    'shippedDate': '2017-01-01',
    'shipAddress': {'address': 'Gran Vía, 0123', 'city': 'Madrid', 'zipcode': '10298', 'country': 'Spain'}
  }, {
    'id': 4,
    customerName: '',
    closedDeals: 3,
    rewards: 59.99,
    'reference': 'order-4-4-1-2',
    'customerId': 4,
    'products': [{
      'id': 3,
      'productName': 'Product IMEHJ',
      'categoryId': 2,
      'unitInStock': null,
      'unitPrice': 10
    }, {'id': 4, 'productName': 'Product KSBRM', 'categoryId': 2, 'unitInStock': null, 'unitPrice': 22}],
    'amount': 499.99,
    'orderDate': '2017-01-01',
    'shippedDate': '2017-01-01',
    'shipAddress': {'address': 'Gran Vía, 0123', 'city': 'Madrid', 'zipcode': '10298', 'country': 'Spain'}
  }, {
    'id': 5,
    customerName: '',
    closedDeals: 15,
    rewards: 99.99,
    'reference': 'order-5-5-1-2',
    'customerId': 5,
    'products': [{'id': 5, 'productName': 'Product EPEIM', 'categoryId': 2, 'unitInStock': null, 'unitPrice': 21.5}],
    'amount': 399.99,
    'orderDate': '2017-01-01',
    'shippedDate': '2017-01-01',
    'shipAddress': {'address': 'Gran Vía, 0123', 'city': 'Madrid', 'zipcode': '10298', 'country': 'Spain'}
  }],
  'products': [{'id': 1, 'productName': 'Product HHYDP', 'categoryId': 1, 'unitInStock': 23, 'unitPrice': 18}, {
    'id': 2,
    'productName': 'Product RECZE',
    'categoryId': 1,
    'unitInStock': 10,
    'unitPrice': 19
  }, {'id': 3, 'productName': 'Product IMEHJ', 'categoryId': 2, 'unitInStock': null, 'unitPrice': 10}, {
    'id': 4,
    'productName': 'Product KSBRM',
    'categoryId': 2,
    'unitInStock': 2,
    'unitPrice': 22
  }, {'id': 5, 'productName': 'Product EPEIM', 'categoryId': 2, 'unitInStock': 333, 'unitPrice': 21.5}, {
    'id': 6,
    'productName': 'Product VAIIV',
    'categoryId': 2,
    'unitInStock': null,
    'unitPrice': 25
  }, {'id': 7, 'productName': 'Product HMLNI', 'categoryId': 7, 'unitInStock': null, 'unitPrice': 30}, {
    'id': 8,
    'productName': 'Product WVJFP',
    'categoryId': 2,
    'unitInStock': null,
    'unitPrice': 40
  }, {'id': 9, 'productName': 'Product AOZBW', 'categoryId': 6, 'unitInStock': null, 'unitPrice': 97}, {
    'id': 10,
    'productName': 'Product YHXGE',
    'categoryId': 8,
    'unitInStock': null,
    'unitPrice': 31
  }, {'id': 11, 'productName': 'Product QMVUN', 'categoryId': 4, 'unitInStock': null, 'unitPrice': 21}, {
    'id': 12,
    'productName': 'Product OSFNS',
    'categoryId': 4,
    'unitInStock': null,
    'unitPrice': 38
  }, {'id': 13, 'productName': 'Product POXFU', 'categoryId': 8, 'unitInStock': null, 'unitPrice': 6}, {
    'id': 14,
    'productName': 'Product PWCJB',
    'categoryId': 7,
    'unitInStock': null,
    'unitPrice': 23.5
  }, {'id': 15, 'productName': 'Product KSZOI', 'categoryId': 2, 'unitInStock': 33, 'unitPrice': 15.5}, {
    'id': 16,
    'productName': 'Product PAFRH',
    'categoryId': 3,
    'unitInStock': null,
    'unitPrice': 17.5
  }, {'id': 17, 'productName': 'Product BLCAX', 'categoryId': 6, 'unitInStock': null, 'unitPrice': 39}, {
    'id': 18,
    'productName': 'Product CKEDC',
    'categoryId': 8,
    'unitInStock': null,
    'unitPrice': 62.5
  }, {'id': 19, 'productName': 'Product XKXDO', 'categoryId': 3, 'unitInStock': null, 'unitPrice': 9.2}, {
    'id': 20,
    'productName': 'Product QHFFP',
    'categoryId': 3,
    'unitInStock': 23,
    'unitPrice': 81
  }, {'id': 21, 'productName': 'Product VJZZH', 'categoryId': 3, 'unitInStock': null, 'unitPrice': 18}, {
    'id': 22,
    'productName': 'Product CPHFY',
    'categoryId': 5,
    'unitInStock': null,
    'unitPrice': 21
  }, {'id': 23, 'productName': 'Product JLUDZ', 'categoryId': 5, 'unitInStock': null, 'unitPrice': 9.5}, {
    'id': 24,
    'productName': 'Product QOGNU',
    'categoryId': 2,
    'unitInStock': null,
    'unitPrice': 4.5
  }, {'categoryId': 3, 'productName': 'Product ABCD', 'unitPrice': 222, 'unitInStock': 23, 'id': 26}, {
    'id': 27,
    'productName': 'asdasd',
    'categoryId': 3,
    'unitInStock': '22',
    'unitPrice': '234'
  }],
  'categories': [{
    'id': 1,
    'categoryName': 'Beverages',
    'description': 'Soft drinks, coffees, teas, beers, and ales',
    'picture': null
  }, {
    'id': 2,
    'categoryName': 'Condiments',
    'description': 'Sweet and savory sauces, relishes, spreads, and seasonings',
    'picture': null
  }, {
    'id': 3,
    'categoryName': 'Confections',
    'description': 'Desserts, candies, and sweet breads',
    'picture': null
  }, {'id': 4, 'categoryName': 'Dairy Products', 'description': 'Cheeses', 'picture': null}, {
    'id': 5,
    'categoryName': 'Grains/Cereals',
    'description': 'Breads, crackers, pasta, and cereal',
    'picture': null
  }, {'id': 6, 'categoryName': 'Meat/Poultry', 'description': 'Prepared meats', 'picture': null}, {
    'id': 7,
    'categoryName': 'Produce',
    'description': 'Dried fruit and bean curd',
    'picture': null
  }, {'id': 8, 'categoryName': 'Seafood', 'description': 'Seaweed and fish', 'picture': null}]
}
