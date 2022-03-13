class WebSockets {
	users = [];
	connection(client) {
		// EVENT FIRED WHEN THE CHAT ROOM IS DISCONNECTED
		client.on("disconnect", () => {
			this.users = this.users.filter((user) => user.socketId !== client.id);
		});
		// ADD IDENTITY OF USER MAPPED TO THE SOCKET ID
		client.on("identity", (userId) => {
			this.users.push({
				socketId: client.id,
				userId: userId,
			});
		});
		// SUBSCRIBE PERSON TO CHAT & OTHER USER AS WELL
		client.on("subscribe", (room, otherUserId = "") => {
			this.subscribeOtherUser(room, otherUserId);
			client.join(room);
		});
		// MUTE A CHAT ROOM
		client.on("unsubscribe", (room) => {
			client.leave(room);
		});
	}

	subscribeOtherUser(room, otherUserId) {
		const userSockets = this.users.filter(
			(user) => user.userId === otherUserId
		);
		userSockets.map((userInfo) => {
			const socketConn = global.io.sockets.connected(userInfo.socketId);
			if (socketConn) {
				socketConn.join(room);
			}
		});
	}
}

module.exports = WebSockets;