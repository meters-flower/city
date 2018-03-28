;(function() {
	var pageCtrl = {
		provObj: {},
		areaObj: {},
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
				html += '<a href="#" data-id="'+ temp.id +'"><span>' + temp.name+ '</span></a>';
			}
			$('#prov').html(html).show();
			$('#tabBar').find('li').eq(0).addClass('on').show()

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
				$('#tabBar').find('li').eq(0).text($this.text())
					.next().click().text('请选择').show().next().hide();
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
				html += '<a href="#" data-id="'+ arr[i].id +'"><span>' + arr[i].name+ '</span></a>';
			}
			$city.html(html);

			$city.off('click', 'a').on('click', 'a', function() {
				var $this = $(this);
				$this.addClass('on').siblings().removeClass('on');
				_self._setArea($this.data('id'));
				_self.pos.city = $this.text();
				_self.pos.area = '';
				$('#tabBar').find('li').eq(1).text($this.text())
					.next().click().text('请选择').show();
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
				html += '<a href="#" data-id="'+ arr[i].id +'"><span>' + arr[i].name+ '</span></a>';
			}
			$area.html(html);
			$area.off('click', 'a').on('click', 'a', function() {
				var $this = $(this);
				$this.addClass('on').siblings().removeClass('on');
				_self.pos.area = $this.text();
				$('#tabBar').find('li').eq(2).text($this.text())
				$('#cityBtn').val(_self.pos.prov + _self.pos.city + _self.pos.area);
				_self._modalState($('#cityModal'));
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
				_self._modalState($modal);
			});
			$modal.click(function() {
				_self._modalState($modal);
			});
			$modal.find('.modal').click(function() {
				return false;
			});
			$modal.find('.icon-close').click(function() {
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