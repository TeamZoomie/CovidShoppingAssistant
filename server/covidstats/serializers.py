from rest_framework_mongoengine import serializers
from .models import CovidAustralia

class CovidSerializer(serializers.DocumentSerializer):
    class Meta:
        model = CovidAustralia
        fields = ['country', 'cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 'active', 'critical',
                    'casesPerOneMillion', 'deathsPerOneMillion', 'totalTests', 'testsPerOneMillion']
