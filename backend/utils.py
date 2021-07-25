import random
from math import sin, cos, sqrt, atan2, radians

from django.contrib.gis.geoip2 import GeoIP2

from rest_framework.request import Request


geo_ip2 = GeoIP2()


def get_hex_color():
    return f'#{random.randint(1, 255):02X}{random.randint(1, 255):02X}{random.randint(1, 255):02X}'


def get_lat_lon_of_request(request: Request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip_address = x_forwarded_for.split(',')[0]
    else:
        ip_address = request.META.get('REMOTE_ADDR')

    return geo_ip2.lat_lon(ip_address)


def get_distance_between_lat_lons(lat1, lon1, lat2, lon2):
    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    earth_radius = 6373.0
    return earth_radius * c


def get_border_width(lat1, lon1, lat2, lon2):
    distance_in_kilometers = get_distance_between_lat_lons(lat1, lon1, lat2, lon2)

    if distance_in_kilometers < 5:
        width = 10
    elif distance_in_kilometers < 10:
        width = 8
    elif distance_in_kilometers < 40:
        width = 6
    elif distance_in_kilometers < 100:
        width = 3
    else:
        width = 0

    return width
