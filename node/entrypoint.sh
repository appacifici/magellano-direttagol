#!/bin/bash


init() {				
	cd /home/node/app && npm install		
	npm run watch
	cd /var/www/html/project && ln -s /var/www/html/jsPlugins .
}


case "$1" in	
	
	init)
		init
		;;	
	bash)
		/bin/bash
		;;
	sh)
		/bin/sh
		;;

	*)
		echo "This container accepts the following commands:"		
		echo "- Init"				
		echo "- bash"
		exit 1
esac