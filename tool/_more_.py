from tool._logo_ import infinity, more_
import os, time, sys

ip = "https://github.com/cyberexit/Ip-Tracker.git"
in_ip = "https://github.com/cyberexit/infinity_ip.git"
nag = "https://github.com/infinitynetwork13/Nagad-info.git"
cam = "https://github.com/techchipnet/CamPhish"
ip_pa="Ip-Tracker"
in_ip_pa="infinity_ip"
nag_pa="Nagad-info"
cam_pa="CamPhish"
def mo_solo(w):
	for c in w:
		sys.stdout.write(c)
		sys.stdout.flush()
		time.sleep(5. /100)
	time.sleep(1)
def cc():
	os.system('clear')
def logo_f():
	cc()
	infinity()
	more_()
	
def path_(aa):
	logo_f()
	ii = os.path.dirname(aa).replace("/infinity_rat", "")
	mo_solo("\n\n\033[1;32m Download Successful\n")
	print("\033[1;35m Please wite")
	time.sleep(10. /100)
	mo_solo("\033[1;33m Tool Path \033[1;31m[\033[1;30m "+str(ii)+" \033[1;31m]\033[0m\n\n")
	time.sleep(20. /100)

def git_(a,e):
	o="cd ../ && rm -rf "+str(e)+"git clone "+str(a)
	os.system(o)
	path_(e)
def mo_tool():
	print("\n\n\r \033[1;33m[\033[1;31m1\033[1;33m] \033[1;32mIp-Tracker")
	print(" \033[1;33m[\033[1;31m2\033[1;33m] \033[1;32minfinity_ip \033[1;30mʷᶤᶰᵈᵒʷ")
	print(" \033[1;33m[\033[1;31m3\033[1;33m] \033[1;32mNagad-info")
	print(" \033[1;33m[\033[1;31m4\033[1;33m] \033[1;32mCamPhish")
	print(" \033[1;33m[\033[1;31m0\033[1;33m]\033[1;31m Back")
	mo_ = input("\n\n\033[1;30m     Select Options\033[1;31m>\033[1;32m>\033[1;33m>\033[1;34m> \033[1;32m")
	if mo_ in ['1','01']:
		os.system('xdg-open '+str(ip))
		git_(ip,ip_pa)
		return mo_tool()
	elif mo_ in ['2','02']:
		os.system('xdg-open '+str(in_ip))
		git_(in_ip,in_ip_pa)
		return mo_tool()
	elif mo_ in ['3','03']:
		os.system('xdg-open '+str(nag))
		git_(nag,nag_pa)
		return mo_tool()
	elif mo_ in ['4','04']:
		os.system('xdg-open '+str(cam))
		git_(cam,cam_pa)
		return mo_tool()
	elif mo_ in ['0']:
		print('back on')
	elif mo_ in ['']:
		mo_solo('\n\n\033[1;31m  Please Select Options.  \033[0m')
		return cc(),logo_f(),mo_tool()
	else:
		mo_solo('\n\n\033[1;31m  Please Select \033[1;32mcorrect \033[1;31mOptions.  \033[0m')
		return cc(),logo_f(),mo_tool()
