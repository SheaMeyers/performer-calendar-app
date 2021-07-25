from datetime import datetime

from rest_framework import serializers

from .utils import get_hex_color, get_border_width


class SeatGeekPerformerSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    hex_color = serializers.CharField(required=False)


class SeatGeekEventsSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    url = serializers.URLField()

    date_format = '%Y-%m-%dT%H:%M:%S'

    def to_representation(self, instance):
        # Note: Instance is the original dict
        data = super().to_representation(instance)

        data['start'] = instance['datetime_utc']
        end_date = datetime.strptime(instance['datetime_utc'], self.date_format).replace(hour=23, minute=59, second=59)
        data['end'] = datetime.strftime(end_date, self.date_format)

        data['tooltip'] = instance['venue']['name'] + ', ' + \
                          instance['venue']['city'] + ', ' + \
                          instance['venue']['country']

        data['geo_location'] = instance['venue']['location']

        performer = self.context['performer']
        data['title'] = performer.name
        data['hex_color'] = performer.hex_color
        border_width = get_border_width(self.context['user_lat_lon'][0],
                                        self.context['user_lat_lon'][1],
                                        instance['venue']['location']['lat'],
                                        instance['venue']['location']['lon'])
        data['border'] = f'{border_width}px solid {get_hex_color()}'

        query_param_symbol = '&' if '?' in data['url'] else '?'
        data['url'] += f"{query_param_symbol}seatgeekcalendardotcom=true"

        return data
