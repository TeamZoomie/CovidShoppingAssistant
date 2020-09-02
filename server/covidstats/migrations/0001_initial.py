# Generated by Django 3.1 on 2020-09-01 23:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CovidAustralia',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country', models.CharField(max_length=60)),
                ('cases', models.IntegerField()),
                ('todayCases', models.IntegerField()),
                ('deaths', models.IntegerField()),
                ('todayDeaths', models.IntegerField()),
                ('recovered', models.IntegerField()),
                ('active', models.IntegerField()),
                ('critical', models.IntegerField()),
                ('casesPerOneMillion', models.IntegerField()),
                ('deathsPerOneMillion', models.IntegerField()),
                ('totalTests', models.IntegerField()),
                ('testsPerOneMillion', models.IntegerField()),
            ],
        ),
    ]
