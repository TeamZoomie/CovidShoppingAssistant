# How to install local copy of Web-server  
1. Install python 3 onto your computer. This will vary depending on your operating system. (Just google it please)
	- Please do not install python 3.8.x or later, this will not work. Choose python 3.7.x please.
2. Create a virtual python environment in the directory of your choice. 
	- Linux (and Mac): `python3 -m venv env`
	- Windows: `python -m venv env`
3. Activate virtual environment.
	- Linux: `source env/bin/activate`
	- Windows: `env\Scripts\Activate`
4. Clone the git repository. `git clone https://github.com/TeamZoomie/CovidShoppingAssistant.git`
	- This will probably require you to have signed into git onto your computer. Random link to setting it up: [link](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration)
5. Navigate to the server/ directory
	- Linux: `cd server/`
	- Windows: `cd server/`
6. Install list of required python packages
	- `pip install -r requirements.txt`
7. Create secretkey.txt file in the server/server directory
	- Please ask Calum(Henchman) for secret key
8. Navigate back to the server/ directory
9. Run the following command to start the server
	- `python manage.py runserver`