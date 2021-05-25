from datetime import datetime, timedelta

from rest_framework import serializers


class SeatGeekPerformerSerializer(serializers.Serializer):
    name = serializers.CharField()
    id = serializers.IntegerField()


class SeatGeekEventsSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    url = serializers.URLField()

    date_format = '%Y-%m-%dT%H:%M:%S'

    def to_representation(self, instance):
        # Note: Instance is the original dict
        data = super().to_representation(instance)

        data['start'] = instance['datetime_utc']
        end_date = datetime.strptime(instance['datetime_utc'], self.date_format) + timedelta(hours=3)
        data['end'] = datetime.strftime(end_date, self.date_format)

        data['tooltip'] = instance['venue']['name'] + ', ' + \
                          instance['venue']['city'] + ', ' + \
                          instance['venue']['country']

        data['geo_location'] = instance['venue']['location']

        performer = self.context['performer']
        data['title'] = performer.name
        data['hexColor'] = performer.hex_color

        return data
