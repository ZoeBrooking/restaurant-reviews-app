const CACHE_NAME = 'restaurant-reviews-cache-v1';
const filesToCache = [
	'/',
	'/css/styles.css',
	'/data/restaurants.json',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg',
	'/index.html',
	'/restaurant.html',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js'
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache) {
				return cache.addAll(filesToCache);
			})
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys()
			.then(function(cacheNames) {
				return Promise.all(
					cacheNames.filter(function(cacheName) {
						return cacheName.startsWith('restaurant-') &&
							cacheName != staticCacheName;
				}).map(function(cacheName) {
					return cache.delete(cacheName);
				})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
				if(response) return response;
				return fetch(event.request);
			})
	);
});