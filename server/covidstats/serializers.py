from rest_framework import serializers
from .models import CovidAustralia, NewsModel

class CovidSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CovidAustralia
        fields = ('country', 'cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 'active', 'critical',
                'casesPerOneMillion', 'deathsPerOneMillion', 'totalTests', 'testsPerOneMillion')

class NewsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = NewsModel
        fields = ('number', 'json')
