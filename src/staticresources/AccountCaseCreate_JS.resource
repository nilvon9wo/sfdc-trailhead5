function refreshFeed() {
	Sfdc.canvas.publisher.publish({
		name: 'publisher.refresh',
		payload: {feed: true}
	});
}