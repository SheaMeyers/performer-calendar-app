from rest_framework import serializers


class SeatGeekPerformerSerializer(serializers.Serializer):
    name = serializers.CharField()
    id = serializers.IntegerField()
