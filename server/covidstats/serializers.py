from rest_framework_mongoengine import serializers
from .models import CovidInformation

class CovidSerializer(serializers.DocumentSerializer):
    class Meta:
        model = CovidInformation
        fields = ['country', 'cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 'active', 'critical',
                    'casesPerOneMillion', 'deathsPerOneMillion', 'totalTests', 'testsPerOneMillion']
