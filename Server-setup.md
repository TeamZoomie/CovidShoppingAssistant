### Ways to connect to the web server
1. proxy ssh connection
	1. Log into moss
		- `ssh <student number>@moss.labs.eait.uq.edu.au`
	2. Log into web server
		- `ssh <student number>@deco3801-zoomie.zones.eait.uq.edu.au`
2. Using VPN (I haven't testing this working)
	1. Install UQ VPN or EAIT VPN
	2. `ssh <student number>@deco3801-zoomie.zones.eait.uq.edu.au`


### Web server
Our web server is located at https://deco3801-zoomie.uqcloud.net/
When we go to the server, the API automatically loads. Currently there is not much there

Every time we change the python code, we need to run the command.  
`systemctl restart uwsgi`


### Setup Django
All of this is done from the following document provided to us from the UQ tutors. [link](https://stluc.manta.uqcloud.net/xlex/public/zones-guide.html#pythonuwsgi_django_flask_etc)

	cd /var/www/uwsgi
	virtualenv -p $(which python3.6) .
	. ./bin/activate
Now your command line should have (uwsgi) at the front of it.

	pip install django
	
Initialise project

	django-admin startproject server

Now you can see the project folder has been initialised
Need to change the settings in the uwsgi.ini file
Original file has been moved to `/etc/uwsgi/uwsgi.ini.bak`

	vim /etc/uwsgi/uwsgi.ini
```ini	
[uwsgi]
module = server.wsgi:application
chdir = /var/www/uwsgi/app
virtualenv = /var/www/uwsgi
env = DJANGO_SETTINGS_MODULE=server.settings
workers = 4
```

Need to change the `ALLOWED_HOSTS` in the `/var/www/uwsgi/server/server/settings.py`

```python
ALLOWED_HOSTS = ['deco3801-zoomie.uqcloud.net']
```

Last step is to go to `/var/www/uwsgi/server` and run `python manage.py migrate`

Setup is done.

## Good introduction to django
https://docs.djangoproject.com/en/3.1/intro/tutorial01/
