import {
	socketInfomation
}
from "@/api/information";
import {
	wsk
} from "@/libs/api.request.js";
import Centrifuge from "centrifuge";
import {
	getToken,
} from '@/libs/util'

class WebSocket extends Centrifuge {

	constructor(data) {
		console.log(data);
		super(data);
		this.subscribeKeys = [];
		this.init();
	}

	init() {
		window.onbeforeunload = () => {
			this.disconnect();
		};

		this.on("connect", context => {
			console.log("连接成功", context);
		});

		this.on("disconnect", context => {
			console.log("断开连接", context);
		});

		this.on("error", error => {
			console.log("错误连接", error);
		});

		this.connect();
	}

	addListeners(key, callback) {
		if (!this.hasKey(key)) {
			this.subscribeKeys.push(key);
		};
		this.subscribe(key, callback);
	}

	removeListeners(key, callback) {
		if (!this.hasKey(key)) return;
		this.unsubscribe(key);
		this.subscribeKeys.splice(this.subscribeKeys.indexOf(key), 1);
	}

	hasKey(key) {
		return this.subscribeKeys.indexOf(key) > -1 ? true : false;
	}

}

let WEBSOCKET = null;

export const websocket = () => {
	return new Promise((resolve, reject) => {
		console.log(WEBSOCKET)
		if (WEBSOCKET == null) {
			socketInfomation().then(res => {

				const sign = res.data.data.access_token; // 签名： 后端根据secret、user、timestamp等，通过hashmap、二进制流、sha256换算得到
				const timestamp = res.data.data.timestamp; // 时间戳
				const user = res.data.data.user; // 当前登录用户id
				WEBSOCKET = new WebSocket({
					url: wsk,
					user: user,
					timestamp: timestamp,
					token: sign
				})
				resolve(WEBSOCKET);
			})
		} else {
			if (WEBSOCKET._status == 'disconnected') {
				WEBSOCKET.connect();
			}
			resolve(WEBSOCKET);
		}
	})
}
