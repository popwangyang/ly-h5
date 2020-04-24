export const provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门','台湾', '全国'];
const province = require.context('./map/province', false, /\.js/);
const path = require('path')
const modules = {}
province.keys().forEach(key => {
	const name = path.basename(key, '.js')
	console.log(name)
	modules[name] = province(key).default || province(key)
})

export default modules;

export const visualMapPieces = [{
		min: 60,
		label: '> 60'
	},
		{
			min: 40,
			max: 59,
			label: '40 ~ 59'
		},
		{
			min: 20,
			max: 39,
			label: '20 ~ 39'
		},
		{
			min: 1,
			max: 19,
			label: '1 ~ 19'
		},
		{
			value: 0,
			label: '0'
		},
	]

export const tooltip =  {
		trigger: 'item',
		showDelay: 0,
		transitionDuration: 0.4,
		padding: 0,
		show: true,
		backgroundColor: 'transparent',
		formatter: (params) => {
			if (params.data) {
				let name = params.name;
				let data = params.data;
				let cityNumber = data.city;
				let ktvNumber = data.ktv;
				let boxNumber = data.count;
				let go = provincesText.indexOf(name) > -1 ? `<img src='src/images/goto.png'/>` : '';
				let cityElement =provincesText.indexOf(name) > -1 ?`<span>
								<span>城市开通数</span>
								<span>${cityNumber}</span>
						</span>`:'';

				let htmlEments =
						`<div class="tooltip">
						<span>
							<span>${name}</span>
							<span class="tooltipGo">${go}</span>
						</span>
						${cityElement}
						<span>
							<span>KTV数</span>
							<span>${ktvNumber}</span>
						</span>
						<span>
							<span>包厢数</span>
							<span>${boxNumber}</span>
						</span>
					</div>`;
				return htmlEments;
			} else {
				return ''
			}
		}
	};

