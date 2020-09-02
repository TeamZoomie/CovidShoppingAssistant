from rest_framework import serializers
from .models import CovidAustralia

class CovidSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CovidAustralia
        fields = ('country', 'cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 'active', 'critical',
                'casesPerOneMillion', 'deathsPerOneMillion', 'totalTests', 'testsPerOneMillion')
