import feedparser
from bs4 import BeautifulSoup


class ParseFeed:

    def __init__(self, link):
        self.feed_url = link

    def clean(self, html):
        '''
        Get the text from html and do some cleaning
        '''
        soup = BeautifulSoup(html, features="html.parser")
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
