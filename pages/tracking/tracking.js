// pages/tracking/tracking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tracking: '',
    carrier: '',
    statuses: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      tracking: options.tracking,
      carrier: options.carrier
    })
    console.log(options.tracking)
    console.log(options.carrier)
    wx.request({
      url: 'http://127.0.0.1:5000/api/tracking',
      method: 'POST',
      data: {
        tracking_number: options.tracking,
        carrier: options.carrier
      },
      header: {
        'content-type': 'application/json',
        'X-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImplbGZzb255IiwiZXhwIjoxNTI2OTI4OTc2fQ.Mu1Il3zX1nkVPvCyXyGf3Nr9TrhsGWF9yi7nMLsVWow'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          statuses: res.data.data.statuses
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})