var Utils = {
	/* 窗口大小 */
	setRootSize: function() {
		var handle = function() {
	    	var docWid = window.document.documentElement,
	        width = docWid.getBoundingClientRect().width,
	        fontSize = (width >= 414) ? (414 / 7.5) : width / 750 * 100;
	        docWid.style.fontSize = fontSize + 'px';			
		}
		window.addEventListener('resize', handle, false);	
		handle();
	},

	/* 获取参数 */
	getRequest: function() {
        var url = location.search;
        var theRequest = {};
        url = decodeURIComponent(url);
        if(url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },
};
Utils.setRootSize();

