//orders.js
Page({
  data: {
    hidden: false,
    orders: []
  },
  onLoad: function (options) {
    let that = this
    const query = `{
      allOrders(condition: {client: "${options.client}", phone: "${options.phone}"}, orderBy: CREATED_TIME_DESC) {
        edges {
          node {
            client
            phone
            product
            quantity
            price
            tracking
            carrier
            createdTime
            updatedTime
            forwardCarrier
            forwardTracking
          }
        }
      }
    }`
    wx.request({
      url: 'https://www.nbyujin.com/graphql/graphql',
      method: 'POST',
      data: {
        query: query
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(query)
        // console.log('recieved all order data')
        // console.log(res.data.data.allOrders.edges)
        that.setData({
          orders: res.data.data.allOrders.edges,
          hidden: true,
        })
      }
    })
  }
})