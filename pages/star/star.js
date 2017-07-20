var appInstance = getApp();

var getData = function (star, that, isMatch) {
	if (!star || !that) {
		return console.log("getData()参数异常");
	}
	var _data = {
		key: appInstance.globalData.apiKey,
		me: star
	};
	if (isMatch) {
		_data.all = 1;
	}
	wx.showToast({
		title: '正在加载',
		icon: 'loading',
		duration: 2000
	});
	wx.request({
		url: 'https://api.tianapi.com/txapi/xingzuo/',
		data: _data,
		success: function (res) {
			if (res.data.msg === 'success') {
				if (isMatch) {
					//星座匹配
					that.setData({
						matchResult: res.data.newslist
					});
				} else {
					//星座分析
					that.setData({
						analyzeResult: res.data.newslist[0]
					});
				}
			}
		},
		complete: function () {
			wx.hideToast();
		}
	});
};

Page({
	data: {
		array: ["白羊", "金牛", "双子", "巨蟹", "狮子", "处女", "天秤", "天蝎", "射手", "摩羯", "水瓶", "双鱼"],
		currentPick: "请选择",
		analyzeResult: {},
		currentMatch: "",
		matchResult: []
	},
	pickerChange: function (e) {
		var that = this;
		var result = that.data.array[e.detail.value];
		if (result && (result !== that.data.currentPick)) {
			that.setData({
				currentPick: result
			});

			getData(result, that);
		}
	},
	mathch: function () {
		this.setData({
			currentMatch: this.data.currentPick
		});
		getData(this.data.currentPick, this, true);
	}
});