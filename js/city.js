;(function() {
	var pageCtrl = {
		provObj: {}, 
		areaObj: {},

		/* 选中的省市县 */
		pos: { 
			prov: '',
			city: '',
			area: ''
		},

		/* 初始化省市县数据 */
		_getData: function() {
			var _self = this,
				html = '',
				temp = {};
			for (var i = 0; i < province.length; i++) {
				temp = province[i];
				_self.provObj[temp.id] = temp;
			}
			for (var i = 0; i < area.length; i++) {
				temp = area[i];
				if(!_self.areaObj[temp.pid]) {
					_self.areaObj[temp.pid] = [];
				}
				_self.areaObj[temp.pid].push(temp);
			}	
			_self._cityModal();
			_self._tabHandle();
			_self._setProvince();
		},

		/* 设置省份 */
		_setProvince: function() {
			var _self = this;
			$('#prov').on('click', 'a', function() {
				var $this = $(this);
				$this.addClass('on').siblings().removeClass('on');
				_self._setCity($this.data('id'));
				_self.pos = {
					prov: $this.text()
				};
				$('#tabBar').find('li').eq(1).click();
				$('#selectCity').removeClass('active');
				return false;
			});
		},

		/* 设置城市 */
		_setCity: function(id) {
			var _self = this,
			html = '',
			$city = $('#city');
			arr = _self.provObj[id].city;
			for (var i = 0; i < arr.length; i++) {
				html += '<a href="#" data-id="'+ arr[i].id +'">' + arr[i].name+ '</a>';
			}
			$city.html(html).next().empty();

			$city.on('click', 'a', function() {
				var $this = $(this);
				$this.addClass('on').siblings().removeClass('on');
				_self._setArea($this.data('id'));
				_self.pos.city = $this.text();
				_self.pos.area = '';
				$('#tabBar').find('li').eq(2).click();
				$('#selectCity').removeClass('active');
				return false;
			});
		},
		
		/* 设置区域 */
		_setArea: function(id) {
			var _self = this,
			html = '',
			$area = $('#area');
			arr = _self.areaObj[id];
			for (var i = 0; i < arr.length; i++) {
				html += '<a href="#" data-id="'+ arr[i].id +'">' + arr[i].name+ '</a>';
			}
			$area.html(html);
			$area.on('click', 'a', function() {
				var $this = $(this);
				$this.addClass('on').siblings().removeClass('on');
				_self.pos.area = $this.text();
				$('#selectCity').addClass('active');
				return false;
			});					
		},

		/* 省市县导航栏切换 */
		_tabHandle: function(){
			$('#tabBar').on('click', 'li', function() {
				var $this = $(this);
				$this.addClass('on').siblings().removeClass('on');
				$this.parent().next().find('>div').eq($this.index()).show().siblings().hide();
			});
		},

		/* 地区选择模态框 */
		_cityModal: function() {
			var _self = this,
			$modal = $("#cityModal");
			$("#cityBtn").click(function () {
				var html = '';
				for (var i = 0 in _self.provObj) {
					html += '<a href="#" data-id="'+ i +'">' + _self.provObj[i].name+ '</a>';
				}
				$('#prov').html(html).siblings().empty();
				$('#tabBar').find('li').eq(0).click();
				$('#selectCity').removeClass('active');
				_self._modalState($modal);
			});
			$modal.click(function() {
				_self._modalState($modal);
			});
			$modal.find('.modal').click(function() {
				return false;
			});
			$('#selectCity').click(function() {
				var pos = _self.pos;
				$('#cityBtn').val(pos.prov + pos.city + pos.area);
				_self._modalState($modal);
			});
		},	

		/* 弹框状态显示 */
		_modalState: function(el) {
			el.toggleClass('in');
			$('body').toggleClass('hidden');
		},			
		init: function() {
			this._getData();
		}
	};
	$(function() {
		pageCtrl.init();
	});			
})();