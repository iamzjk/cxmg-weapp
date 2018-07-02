//orders.js
Page({
  data: {
    hidden: false,
    client: '',
    phone: '',
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

        if (res.data.data.allOrders.edges.length > 0) {
          that.setData({
            client: options.client,
            phone: options.phone,
            orders: res.data.data.allOrders.edges,
            hidden: true,
          })
        } else {
          that.setData({
            hidden: true,
          })
          wx.showModal({
            title: '没有找到订单',
            content: `${options.client} ${options.phone}`,
            success: function (res) {
              wx.navigateBack()
            }
          })
        }
      }
    })
  }
})