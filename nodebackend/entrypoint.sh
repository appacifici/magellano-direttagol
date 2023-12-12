#!/bin/bash


init() {		
	echo "avvio"
	npm cache clean -f			
	#npm install
	cd /home/node/app 
	npx ts-node src/liveScoreApi/api/matches/ImportLiveMacth.ts
	#cd test &&	npx ts-node testImportLiveMacth.ts
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