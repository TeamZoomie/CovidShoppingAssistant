# Covid Shopping Assistant
Team Zoomie has chosen *The Social Distancing Social Club*’s proposal to take through to build. The proposal explores and attempts to provide a solution to  the shopping experience during an ongoing pandemic. The provided solution is a mobile application that aims to assist shoppers in maintaining social distancing rules and regulations, whilst also improving time-efficiency when grocery shopping. This will be achieved by helping shoppers pre-plan their trip to the grocery store. The key features include: (1) social distancing reminders, (2) reminders to use COVIDSafe, and (3) create and modify shopping lists.

## Team Zoomie
Name | Experience
------------ | -------------
Laura Pham | User interface, user experience, and front end programming
Jessica Jenkinson | User interface and user experience
Calum Henman | Cyber Security major with programming experience
Theo Duval | Primarily programming skills, as well as maths and logic
Adrian Cryer | Primarily programming skills, as well as maths and logic
Andy Jie Peng | Programming skills and database experience

## Client Quickstart

0. Download Git (if you haven't ready got it!): https://git-scm.com/
1. Download Node (>= 12): https://nodejs.org/en/download/

2. Install Expo globally:
`npm install -g expo-cli yarn`

3. Clone this repository: `git clone git@github.com:TeamZoomie/CovidShoppingAssistant.git`\
If you get permission denied, you will have to add an ssh key to your account (Might be able to use one of the git tools).\
**Useful link**: https://docs.github.com/en/enterprise/2.15/user/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent 

4. Install packages:
`cd client`
`expo install`

5. Install the Expo app on your phone: https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_AU
6. Start the client: `expo start`
7. Open Expo App on your phone and scan QR code (In terminal / new window that was created)
8. Profit??

## Server Quickstart
### How to connect to the server  
1. Proxy ssh connection
	1. Log into moss
		- `ssh <student number>@moss.labs.eait.uq.edu.au`
	2. Log into web server
		- `ssh <student number>@deco3801-zoomie.zones.eait.uq.edu.au`
2. Using VPN (I haven't testing this working)
	1. Install UQ VPN or EAIT VPN
	2. `ssh <student number>@deco3801-zoomie.zones.eait.uq.edu.au`
  
### Web Server Location
`https://deco3801-zoomie.uqcloud.net/`

### Add a user and obtain token
Please follow the following steps to create a user and obtain a token
1. Use a POST request to http://deco3801-zoomie.uqcloud.net.au/usercreate/
	- Needs to contain the Username and Password of the user
	- {"username": "", "password": ""}
	- `curl -X POST --data "username=[username]&password=[password]" http://deco3801-zoomie.uqcloud.net.au/usercreate/`
2. Organize to grab a token from the API using the username and password
	- `curl -X POST --data "username=[username]&password=[password]" http://deco3801-zoomie.uqcloud.net.au/api-token-auth/`
3. On all following API requests to the list directory. Add the following header to the requests
	- Header: "Authorization: Token [token]"
	- Example: `curl -H "Authorization: Token [token]" http://deco3801-zoomie.uqcloud.net.au/list/`
