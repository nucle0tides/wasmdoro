wasmdoro	: 
	wasm-pack build
	cd www/ && npm install
	cd pkg/ && npm link
	cd www/ && npm link wasmdoro
	cd www/ && npm run start
web:
	cd www/ && npm run start
clean:
	rm -rf www/node_modules/
	rm -rf pkg/
	rm -rf target/
