if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js', { scope: '/' })
		.then(function(registration) {
			// Registration was successful
			console.log('SW registration OK:', registration);
		})
		.catch(function(err) {
			// registration failed :(
			console.log('SW registration FAIL:', err);
		});
}
