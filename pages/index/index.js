//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showTopTips: false,
    client: "",
    phone: "",
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
