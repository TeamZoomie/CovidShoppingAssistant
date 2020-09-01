from rest_framework import serializers

from .models import CovidStatsAustralia


class CovidSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CovidStatsAustralia
        fields = ('cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 'active', 'critical',
                  'casesPerOneMillions', 'deathsPerOneMillions', 'totalTests', 'testsPerOneMillion')
