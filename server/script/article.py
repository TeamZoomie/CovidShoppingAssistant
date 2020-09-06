import feedparser
from bs4 import BeautifulSoup
import json


topic = 'covid-19'
hl = 'en-AU'
sort = 'date'
region = 'AU'
num = 5
output = 'rss'

url = f"http://news.google.com/news?q={topic}&hl={hl}&sort={sort}&gl={region}&num={num}&output={output}"
print(url)


class ParseFeed:

    def __init__(self, link):
        self.feed_url = link

    def clean(self, html):
        '''
        Get the text from html and do some cleaning
        '''
        soup = BeautifulSoup(html)
        text = soup.get_text()
        text = text.replace('\xa0', ' ')
        return text

    def parse(self):
        '''
        Parse the URL, and print all the details of the news
        '''
        feeds = feedparser.parse(self.feed_url).entries
        result = []
        for f in feeds:
            info = {}
            info['Description'] = self.clean(f.get("description", ""))
            info['Published Date'] = f.get("published", ""),
            info['Title'] = f.get("title", ""),
            info['Url'] = f.get("link", "")
            result.append(info)
        return result

    def image(self, url):
        # TODO: get the image of each article
        return 0

def articleToJson(data, filename):
    with open(filename, "w") as f:
        f.write(''.join([
            # '<html>',
            # '<head><meta charset="utf-8" /></head>',
            # '<body>',
            #
            # "<div id='draw'>",
            # "<svg></svg>",
            # "</div>"
            # "<p>",
            # "{};".format(data),
            # "</p>"
            data
        ]))


feed = ParseFeed(url)
article = feed.parse()
data = json.dumps(article)
# Parse the Json data into news.json
articleToJson(data, 'news.json')