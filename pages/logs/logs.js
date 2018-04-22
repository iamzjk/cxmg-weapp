//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    let that = this;
    wx.request({
      url: 'http://127.0.0.1:5000/api/order',
      method: 'GET',
      data: {
        search: {
          key: 'client',
          value: '张三'
        },
        page: 1,
        limit: 5,
        showNoTracking: false
      },
      header: {
        'content-type': 'application/json',
        'X-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImplbGZzb255IiwiZXhwIjoxNTI2OTI4OTc2fQ.Mu1Il3zX1nkVPvCyXyGf3Nr9TrhsGWF9yi7nMLsVWow'
      },
      success: function (res) {
        console.log(res.data.data.orders)
        that.setData({
          // logs: (res.data.orders || []).map(
          //   log => {
          //     return log
          //   }
          // )
          logs: res.data.data.orders
        })
      }
    })
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
  }
})
