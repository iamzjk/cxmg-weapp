//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showTopTips: false,
    client: "",
    phone: "",
  },
  onShow: function(){
    this.setData({
      searches: wx.getStorageSync('searches')
    })
    console.log(wx.getStorageSync('searches'))
  },
  //提交表单函数
  showTopTips: function(e){
    const client = e.detail.value.client.trim()
    const phone = e.detail.value.phone.trim()

    //手机号验证
    const phoneReg = /^1[0-9]{10}$/
    const isPhoneValid = phoneReg.test(phone)

    var that = this;
    if (!client || !phone) {
      //验证输入
      this.setData({
        showTopTips: true,
        topTipMsg: '收件人或手机号不能为空'
      });
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000);
    } else if (!isPhoneValid) {
      //手机号验证
      this.setData({
        showTopTips: true,
        topTipMsg: '手机号不对'
      });
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000);
    } else {
      //验证通过后保存查询记录
      const newSearch = {
        client: client,
        phone: phone,
      }
      wx.getStorage({
        key: 'searches',
        success: function(res) {
          var searches = res.data
          if (!(searches.some((obj) => obj.client == client && obj.phone == phone))) {
            searches.unshift(newSearch)
            wx.setStorage({
              key: 'searches',
              data: searches.slice(0, 3)
            })
          }
        },
        fail: function() {
          wx.setStorage({
            key: 'searches',
            data: [newSearch]
          })
        }
      })

      const url = `../orders/orders?client=${e.detail.value.client.trim()}&phone=${e.detail.value.phone.trim()}`
      wx.navigateTo({
        url: url
      })
    }
  },
  //重置表单数据函数
  resetForm: function () {
    this.setData({
      client: '',
      phone: '',
    })
  },
  bindClientChange: function (e) {
    // console.log('setting client value:', e.detail.value)
    this.setData({
      client: e.detail.value.trim()
    })
  },
  bindPhoneChange: function (e) {
    // console.log('setting phone value:', e.detail.value)
    this.setData({
        phone: e.detail.value.trim()
    })
  },
})
