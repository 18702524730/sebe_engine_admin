var rootConfig = {
  rootUrl: 'https://www.cnsebe.com/sebe_engine'
};
//localhost和ip的简单正则匹配
if (location.host.indexOf('localhost') === 0 || /^\d{1,3}\.[^]*/.test(location.host)) {
	rootConfig = {
	  rootUrl: '//' + location.host + '/sebe_engine',
	};
}
if (location.host.indexOf('test') === 0) {
	rootConfig = {
	  rootUrl: 'http://testwww.cnsebe.com/sebe_engine',
	};
}

export default rootConfig;
