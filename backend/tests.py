from unittest.mock import patch

from django.test import TestCase
from django.urls import reverse
from rest_framework.authtoken.models import Token

from backend.models import User, Performer


class MockedSeatGeekResponse:
    def json(self):
        return {
            "events": [
                {
                    "type": "concert",
                    "id": 5405028,
                    "datetime_utc": "2021-08-14T22:30:00",
                    "venue": {
                        "state": "PA",
                        "name_v2": "The Pavilion at Montage Mountain",
                        "postal_code": "18505",
                        "name": "The Pavilion at Montage Mountain",
                        "links": [],
                        "timezone": "America/New_York",
                        "url": "https://seatgeek.com/venues/the-pavilion-at-montage-mountain/tickets",
                        "score": 0.666632,
                        "location": {
                            "lat": 41.3506,
                            "lon": -75.6622
                        },
                        "address": "1000 Montage Mountain Rd",
                        "country": "US",
                        "has_upcoming_events": True,
                        "num_upcoming_events": 9,
                        "city": "Scranton",
                        "slug": "the-pavilion-at-montage-mountain",
                        "extended_address": "Scranton, PA 18505",
                        "id": 80,
                        "popularity": 0,
                        "access_method": None,
                        "metro_code": 577,
                        "capacity": 18000,
                        "display_location": "Scranton, PA"
                    },
                    "datetime_tbd": False,
                    "performers": [
                        {
                            "type": "band",
                            "name": "Korn",
                            "image": "https://seatgeek.com/images/performers-landscape/korn-f2a3f2/1069/23946/huge.jpg",
                            "id": 1069,
                            "images": {
                                "huge": "https://seatgeek.com/images/performers-landscape/korn-f2a3f2/1069/23946/huge.jpg"
                            },
                            "divisions": None,
                            "has_upcoming_events": True,
                            "primary": True,
                            "stats": {
                                "event_count": 37
                            },
                            "taxonomies": [
                                {
                                    "id": 2000000,
                                    "name": "concerts",
                                    "parent_id": None,
                                    "document_source": {
                                        "source_type": "ELASTIC",
                                        "generation_type": "FULL"
                                    },
                                    "rank": 0
                                }
                            ],
                            "image_attribution": "NurPhoto / NurPhoto / Getty Images",
                            "url": "https://seatgeek.com/korn-tickets",
                            "score": 0.58,
                            "slug": "korn",
                            "home_venue_id": None,
                            "short_name": "Korn",
                            "num_upcoming_events": 37,
                            "colors": None,
                            "image_license": "rightsmanaged",
                            "genres": [
                                {
                                    "id": 456,
                                    "name": "Rock",
                                    "slug": "rock",
                                    "primary": True,
                                    "images": {
                                        "1200x525": "https://seatgeek.com/images/performers-landscape/jenny-lewis-0b661f/70/1200x525.jpg",
                                        "1200x627": "https://seatgeek.com/images/performers-landscape/jenny-lewis-09b9f3/70/1200x627.jpg",
                                        "136x136": "https://seatgeek.com/images/performers-landscape/jenny-lewis-90f791/70/136x136.jpg",
                                        "500_700": "https://seatgeek.com/images/performers-landscape/jenny-lewis-73ebf2/70/500_700.jpg",
                                        "800x320": "https://seatgeek.com/images/performers-landscape/jenny-lewis-d2e5d4/70/800x320.jpg",
                                        "banner": "https://seatgeek.com/images/performers-landscape/jenny-lewis-2234da/70/banner.jpg",
                                        "block": "https://seatgeek.com/images/performers-landscape/jenny-lewis-fd64fb/70/block.jpg",
                                        "criteo_130_160": "https://seatgeek.com/images/performers-landscape/jenny-lewis-514d1b/70/criteo_130_160.jpg",
                                        "criteo_170_235": "https://seatgeek.com/images/performers-landscape/jenny-lewis-4c4d78/70/criteo_170_235.jpg",
                                        "criteo_205_100": "https://seatgeek.com/images/performers-landscape/jenny-lewis-c07401/70/criteo_205_100.jpg",
                                        "criteo_400_300": "https://seatgeek.com/images/performers-landscape/jenny-lewis-1b62b1/70/criteo_400_300.jpg",
                                        "fb_100x72": "https://seatgeek.com/images/performers-landscape/jenny-lewis-a8d4c7/70/fb_100x72.jpg",
                                        "fb_600_315": "https://seatgeek.com/images/performers-landscape/jenny-lewis-ea04da/70/fb_600_315.jpg",
                                        "huge": "https://seatgeek.com/images/performers-landscape/jenny-lewis-a22ac5/70/huge.jpg",
                                        "ipad_event_modal": "https://seatgeek.com/images/performers-landscape/jenny-lewis-b2cfe9/70/ipad_event_modal.jpg",
                                        "ipad_header": "https://seatgeek.com/images/performers-landscape/jenny-lewis-868f2f/70/ipad_header.jpg",
                                        "ipad_mini_explore": "https://seatgeek.com/images/performers-landscape/jenny-lewis-429093/70/ipad_mini_explore.jpg",
                                        "mongo": "https://seatgeek.com/images/performers-landscape/jenny-lewis-ca05bf/70/mongo.jpg",
                                        "square_mid": "https://seatgeek.com/images/performers-landscape/jenny-lewis-d4f86f/70/square_mid.jpg",
                                        "triggit_fb_ad": "https://seatgeek.com/images/performers-landscape/jenny-lewis-75f6e5/70/triggit_fb_ad.jpg"
                                    },
                                    "image": "https://seatgeek.com/images/performers-landscape/jenny-lewis-a22ac5/70/huge.jpg",
                                    "document_source": {
                                        "source_type": "ELASTIC",
                                        "generation_type": "FULL"
                                    }
                                },
                                {
                                    "id": 457,
                                    "name": "Alternative",
                                    "slug": "alternative",
                                    "primary": False,
                                    "images": {
                                        "1200x525": "https://seatgeek.com/images/performers-landscape/weezer-fa337b/89/1200x525.jpg",
                                        "1200x627": "https://seatgeek.com/images/performers-landscape/weezer-19fdab/89/1200x627.jpg",
                                        "136x136": "https://seatgeek.com/images/performers-landscape/weezer-778760/89/136x136.jpg",
                                        "500_700": "https://seatgeek.com/images/performers-landscape/weezer-3edd85/89/500_700.jpg",
                                        "800x320": "https://seatgeek.com/images/performers-landscape/weezer-2da6f2/89/800x320.jpg",
                                        "banner": "https://seatgeek.com/images/performers-landscape/weezer-934f46/89/banner.jpg",
                                        "block": "https://seatgeek.com/images/performers-landscape/weezer-04f42d/89/block.jpg",
                                        "criteo_130_160": "https://seatgeek.com/images/performers-landscape/weezer-1f49f2/89/criteo_130_160.jpg",
                                        "criteo_170_235": "https://seatgeek.com/images/performers-landscape/weezer-285a1f/89/criteo_170_235.jpg",
                                        "criteo_205_100": "https://seatgeek.com/images/performers-landscape/weezer-329e14/89/criteo_205_100.jpg",
                                        "criteo_400_300": "https://seatgeek.com/images/performers-landscape/weezer-bdaf64/89/criteo_400_300.jpg",
                                        "fb_100x72": "https://seatgeek.com/images/performers-landscape/weezer-30a65a/89/fb_100x72.jpg",
                                        "fb_600_315": "https://seatgeek.com/images/performers-landscape/weezer-232aa5/89/fb_600_315.jpg",
                                        "huge": "https://seatgeek.com/images/performers-landscape/weezer-815d23/89/huge.jpg",
                                        "ipad_event_modal": "https://seatgeek.com/images/performers-landscape/weezer-8e1b7e/89/ipad_event_modal.jpg",
                                        "ipad_header": "https://seatgeek.com/images/performers-landscape/weezer-a4f509/89/ipad_header.jpg",
                                        "ipad_mini_explore": "https://seatgeek.com/images/performers-landscape/weezer-e9fe61/89/ipad_mini_explore.jpg",
                                        "mongo": "https://seatgeek.com/images/performers-landscape/weezer-557c17/89/mongo.jpg",
                                        "square_mid": "https://seatgeek.com/images/performers-landscape/weezer-25a60f/89/square_mid.jpg",
                                        "triggit_fb_ad": "https://seatgeek.com/images/performers-landscape/weezer-c37b19/89/triggit_fb_ad.jpg"
                                    },
                                    "image": "https://seatgeek.com/images/performers-landscape/weezer-815d23/89/huge.jpg",
                                    "document_source": {
                                        "source_type": "ELASTIC",
                                        "generation_type": "FULL"
                                    }
                                },
                                {
                                    "id": 452,
                                    "name": "Pop",
                                    "slug": "pop",
                                    "primary": False,
                                    "images": {
                                        "1200x525": "https://seatgeek.com/images/performers-landscape/justin-bieber-f77fc9/2446/1200x525.jpg",
                                        "1200x627": "https://seatgeek.com/images/performers-landscape/justin-bieber-e9c276/2446/1200x627.jpg",
                                        "136x136": "https://seatgeek.com/images/performers-landscape/justin-bieber-d3542f/2446/136x136.jpg",
                                        "500_700": "https://seatgeek.com/images/performers-landscape/justin-bieber-91f53a/2446/500_700.jpg",
                                        "800x320": "https://seatgeek.com/images/performers-landscape/justin-bieber-441798/2446/800x320.jpg",
                                        "banner": "https://seatgeek.com/images/performers-landscape/justin-bieber-fdb110/2446/banner.jpg",
                                        "block": "https://seatgeek.com/images/performers-landscape/justin-bieber-3a5bca/2446/block.jpg",
                                        "criteo_130_160": "https://seatgeek.com/images/performers-landscape/justin-bieber-d6d547/2446/criteo_130_160.jpg",
                                        "criteo_170_235": "https://seatgeek.com/images/performers-landscape/justin-bieber-5ac351/2446/criteo_170_235.jpg",
                                        "criteo_205_100": "https://seatgeek.com/images/performers-landscape/justin-bieber-fa1c93/2446/criteo_205_100.jpg",
                                        "criteo_400_300": "https://seatgeek.com/images/performers-landscape/justin-bieber-725946/2446/criteo_400_300.jpg",
                                        "fb_100x72": "https://seatgeek.com/images/performers-landscape/justin-bieber-bdf72d/2446/fb_100x72.jpg",
                                        "fb_600_315": "https://seatgeek.com/images/performers-landscape/justin-bieber-444868/2446/fb_600_315.jpg",
                                        "huge": "https://seatgeek.com/images/performers-landscape/justin-bieber-787108/2446/huge.jpg",
                                        "ipad_event_modal": "https://seatgeek.com/images/performers-landscape/justin-bieber-99f1d2/2446/ipad_event_modal.jpg",
                                        "ipad_header": "https://seatgeek.com/images/performers-landscape/justin-bieber-ac9305/2446/ipad_header.jpg",
                                        "ipad_mini_explore": "https://seatgeek.com/images/performers-landscape/justin-bieber-6c8bb1/2446/ipad_mini_explore.jpg",
                                        "mongo": "https://seatgeek.com/images/performers-landscape/justin-bieber-1a7876/2446/mongo.jpg",
                                        "square_mid": "https://seatgeek.com/images/performers-landscape/justin-bieber-e60f26/2446/square_mid.jpg",
                                        "triggit_fb_ad": "https://seatgeek.com/images/performers-landscape/justin-bieber-f3cbc8/2446/triggit_fb_ad.jpg"
                                    },
                                    "image": "https://seatgeek.com/images/performers-landscape/justin-bieber-787108/2446/huge.jpg",
                                    "document_source": {
                                        "source_type": "ELASTIC",
                                        "generation_type": "FULL"
                                    }
                                }
                            ],
                            "popularity": 0,
                            "location": None
                        },
                        {
                            "type": "band",
                            "name": "Staind",
                            "image": "https://seatgeek.com/images/performers-landscape/staind-c793e4/1675/huge.jpg",
                            "id": 1675,
                            "images": {
                                "huge": "https://seatgeek.com/images/performers-landscape/staind-c793e4/1675/huge.jpg"
                            },
                            "divisions": None,
                            "has_upcoming_events": True,
                            "stats": {
                                "event_count": 40
                            },
                            "taxonomies": [
                                {
                                    "id": 2000000,
                                    "name": "concerts",
                                    "parent_id": None,
                                    "document_source": {
                                        "source_type": "ELASTIC",
                                        "generation_type": "FULL"
                                    },
                                    "rank": 0
                                }
                            ],
                            "image_attribution": "Rebecca Sapp / WireImage / Getty Images",
                            "url": "https://seatgeek.com/staind-tickets",
                            "score": 0.58,
                            "slug": "staind",
                            "home_venue_id": None,
                            "short_name": "Staind",
                            "num_upcoming_events": 40,
                            "colors": None,
                            "image_license": "rightsmanaged",
                            "genres": [
                                {
                                    "id": 456,
                                    "name": "Rock",
                                    "slug": "rock",
                                    "primary": False,
                                    "images": {
                                        "1200x525": "https://seatgeek.com/images/performers-landscape/jenny-lewis-0b661f/70/1200x525.jpg",
                                        "1200x627": "https://seatgeek.com/images/performers-landscape/jenny-lewis-09b9f3/70/1200x627.jpg",
                                        "136x136": "https://seatgeek.com/images/performers-landscape/jenny-lewis-90f791/70/136x136.jpg",
                                        "500_700": "https://seatgeek.com/images/performers-landscape/jenny-lewis-73ebf2/70/500_700.jpg",
                                        "800x320": "https://seatgeek.com/images/performers-landscape/jenny-lewis-d2e5d4/70/800x320.jpg",
                                        "banner": "https://seatgeek.com/images/performers-landscape/jenny-lewis-2234da/70/banner.jpg",
                                        "block": "https://seatgeek.com/images/performers-landscape/jenny-lewis-fd64fb/70/block.jpg",
                                        "criteo_130_160": "https://seatgeek.com/images/performers-landscape/jenny-lewis-514d1b/70/criteo_130_160.jpg",
                                        "criteo_170_235": "https://seatgeek.com/images/performers-landscape/jenny-lewis-4c4d78/70/criteo_170_235.jpg",
                                        "criteo_205_100": "https://seatgeek.com/images/performers-landscape/jenny-lewis-c07401/70/criteo_205_100.jpg",
                                        "criteo_400_300": "https://seatgeek.com/images/performers-landscape/jenny-lewis-1b62b1/70/criteo_400_300.jpg",
                                        "fb_100x72": "https://seatgeek.com/images/performers-landscape/jenny-lewis-a8d4c7/70/fb_100x72.jpg",
                                        "fb_600_315": "https://seatgeek.com/images/performers-landscape/jenny-lewis-ea04da/70/fb_600_315.jpg",
                                        "huge": "https://seatgeek.com/images/performers-landscape/jenny-lewis-a22ac5/70/huge.jpg",
                                        "ipad_event_modal": "https://seatgeek.com/images/performers-landscape/jenny-lewis-b2cfe9/70/ipad_event_modal.jpg",
                                        "ipad_header": "https://seatgeek.com/images/performers-landscape/jenny-lewis-868f2f/70/ipad_header.jpg",
                                        "ipad_mini_explore": "https://seatgeek.com/images/performers-landscape/jenny-lewis-429093/70/ipad_mini_explore.jpg",
                                        "mongo": "https://seatgeek.com/images/performers-landscape/jenny-lewis-ca05bf/70/mongo.jpg",
                                        "square_mid": "https://seatgeek.com/images/performers-landscape/jenny-lewis-d4f86f/70/square_mid.jpg",
                                        "triggit_fb_ad": "https://seatgeek.com/images/performers-landscape/jenny-lewis-75f6e5/70/triggit_fb_ad.jpg"
                                    },
                                    "image": "https://seatgeek.com/images/performers-landscape/jenny-lewis-a22ac5/70/huge.jpg",
                                    "document_source": {
                                        "source_type": "ELASTIC",
                                        "generation_type": "FULL"
                                    }
                                },
                                {
                                    "id": 457,
                                    "name": "Alternative",
                                    "slug": "alternative",
                                    "primary": False,
                                    "images": {
                                        "1200x525": "https://seatgeek.com/images/performers-landscape/weezer-fa337b/89/1200x525.jpg",
                                        "1200x627": "https://seatgeek.com/images/performers-landscape/weezer-19fdab/89/1200x627.jpg",
                                        "136x136": "https://seatgeek.com/images/performers-landscape/weezer-778760/89/136x136.jpg",
                                        "500_700": "https://seatgeek.com/images/performers-landscape/weezer-3edd85/89/500_700.jpg",
                                        "800x320": "https://seatgeek.com/images/performers-landscape/weezer-2da6f2/89/800x320.jpg",
                                        "banner": "https://seatgeek.com/images/performers-landscape/weezer-934f46/89/banner.jpg",
                                        "block": "https://seatgeek.com/images/performers-landscape/weezer-04f42d/89/block.jpg",
                                        "criteo_130_160": "https://seatgeek.com/images/performers-landscape/weezer-1f49f2/89/criteo_130_160.jpg",
                                        "criteo_170_235": "https://seatgeek.com/images/performers-landscape/weezer-285a1f/89/criteo_170_235.jpg",
                                        "criteo_205_100": "https://seatgeek.com/images/performers-landscape/weezer-329e14/89/criteo_205_100.jpg",
                                        "criteo_400_300": "https://seatgeek.com/images/performers-landscape/weezer-bdaf64/89/criteo_400_300.jpg",
                                        "fb_100x72": "https://seatgeek.com/images/performers-landscape/weezer-30a65a/89/fb_100x72.jpg",
                                        "fb_600_315": "https://seatgeek.com/images/performers-landscape/weezer-232aa5/89/fb_600_315.jpg",
                                        "huge": "https://seatgeek.com/images/performers-landscape/weezer-815d23/89/huge.jpg",
                                        "ipad_event_modal": "https://seatgeek.com/images/performers-landscape/weezer-8e1b7e/89/ipad_event_modal.jpg",
                                        "ipad_header": "https://seatgeek.com/images/performers-landscape/weezer-a4f509/89/ipad_header.jpg",
                                        "ipad_mini_explore": "https://seatgeek.com/images/performers-landscape/weezer-e9fe61/89/ipad_mini_explore.jpg",
                                        "mongo": "https://seatgeek.com/images/performers-landscape/weezer-557c17/89/mongo.jpg",
                                        "square_mid": "https://seatgeek.com/images/performers-landscape/weezer-25a60f/89/square_mid.jpg",
                                        "triggit_fb_ad": "https://seatgeek.com/images/performers-landscape/weezer-c37b19/89/triggit_fb_ad.jpg"
                                    },
                                    "image": "https://seatgeek.com/images/performers-landscape/weezer-815d23/89/huge.jpg",
                                    "document_source": {
                                        "source_type": "ELASTIC",
                                        "generation_type": "FULL"
                                    }
                                },
                                {
                                    "id": 452,
                                    "name": "Pop",
                                    "slug": "pop",
                                    "primary": False,
                                    "images": {
                                        "1200x525": "https://seatgeek.com/images/performers-landscape/justin-bieber-f77fc9/2446/1200x525.jpg",
                                        "1200x627": "https://seatgeek.com/images/performers-landscape/justin-bieber-e9c276/2446/1200x627.jpg",
                                        "136x136": "https://seatgeek.com/images/performers-landscape/justin-bieber-d3542f/2446/136x136.jpg",
                                        "500_700": "https://seatgeek.com/images/performers-landscape/justin-bieber-91f53a/2446/500_700.jpg",
                                        "800x320": "https://seatgeek.com/images/performers-landscape/justin-bieber-441798/2446/800x320.jpg",
                                        "banner": "https://seatgeek.com/images/performers-landscape/justin-bieber-fdb110/2446/banner.jpg",
                                        "block": "https://seatgeek.com/images/performers-landscape/justin-bieber-3a5bca/2446/block.jpg",
                                        "criteo_130_160": "https://seatgeek.com/images/performers-landscape/justin-bieber-d6d547/2446/criteo_130_160.jpg",
                                        "criteo_170_235": "https://seatgeek.com/images/performers-landscape/justin-bieber-5ac351/2446/criteo_170_235.jpg",
                                        "criteo_205_100": "https://seatgeek.com/images/performers-landscape/justin-bieber-fa1c93/2446/criteo_205_100.jpg",
                                        "criteo_400_300": "https://seatgeek.com/images/performers-landscape/justin-bieber-725946/2446/criteo_400_300.jpg",
                                        "fb_100x72": "https://seatgeek.com/images/performers-landscape/justin-bieber-bdf72d/2446/fb_100x72.jpg",
                                        "fb_600_315": "https://seatgeek.com/images/performers-landscape/justin-bieber-444868/2446/fb_600_315.jpg",
                                        "huge": "https://seatgeek.com/images/performers-landscape/justin-bieber-787108/2446/huge.jpg",
                                        "ipad_event_modal": "https://seatgeek.com/images/performers-landscape/justin-bieber-99f1d2/2446/ipad_event_modal.jpg",
                                        "ipad_header": "https://seatgeek.com/images/performers-landscape/justin-bieber-ac9305/2446/ipad_header.jpg",
                                        "ipad_mini_explore": "https://seatgeek.com/images/performers-landscape/justin-bieber-6c8bb1/2446/ipad_mini_explore.jpg",
                                        "mongo": "https://seatgeek.com/images/performers-landscape/justin-bieber-1a7876/2446/mongo.jpg",
                                        "square_mid": "https://seatgeek.com/images/performers-landscape/justin-bieber-e60f26/2446/square_mid.jpg",
                                        "triggit_fb_ad": "https://seatgeek.com/images/performers-landscape/justin-bieber-f3cbc8/2446/triggit_fb_ad.jpg"
                                    },
                                    "image": "https://seatgeek.com/images/performers-landscape/justin-bieber-787108/2446/huge.jpg",
                                    "document_source": {
                                        "source_type": "ELASTIC",
                                        "generation_type": "FULL"
                                    }
                                },
                                {
                                    "id": 472,
                                    "name": "Classic Rock",
                                    "slug": "classic-rock",
                                    "primary": True,
                                    "images": {
                                        "1200x525": "https://seatgeek.com/images/performers-landscape/billy-joel-02d456/303/1200x525.jpg",
                                        "1200x627": "https://seatgeek.com/images/performers-landscape/billy-joel-f78612/303/1200x627.jpg",
                                        "136x136": "https://seatgeek.com/images/performers-landscape/billy-joel-d362c8/303/136x136.jpg",
                                        "500_700": "https://seatgeek.com/images/performers-landscape/billy-joel-9015cc/303/500_700.jpg",
                                        "800x320": "https://seatgeek.com/images/performers-landscape/billy-joel-48c508/303/800x320.jpg",
                                        "banner": "https://seatgeek.com/images/performers-landscape/billy-joel-45a217/303/banner.jpg",
                                        "block": "https://seatgeek.com/images/performers-landscape/billy-joel-df52f7/303/block.jpg",
                                        "criteo_130_160": "https://seatgeek.com/images/performers-landscape/billy-joel-c7543a/303/criteo_130_160.jpg",
                                        "criteo_170_235": "https://seatgeek.com/images/performers-landscape/billy-joel-a2e269/303/criteo_170_235.jpg",
                                        "criteo_205_100": "https://seatgeek.com/images/performers-landscape/billy-joel-54704f/303/criteo_205_100.jpg",
                                        "criteo_400_300": "https://seatgeek.com/images/performers-landscape/billy-joel-6543bb/303/criteo_400_300.jpg",
                                        "fb_100x72": "https://seatgeek.com/images/performers-landscape/billy-joel-a9b0ad/303/fb_100x72.jpg",
                                        "fb_600_315": "https://seatgeek.com/images/performers-landscape/billy-joel-dcfcf7/303/fb_600_315.jpg",
                                        "huge": "https://seatgeek.com/images/performers-landscape/billy-joel-82da62/303/huge.jpg",
                                        "ipad_event_modal": "https://seatgeek.com/images/performers-landscape/billy-joel-109888/303/ipad_event_modal.jpg",
                                        "ipad_header": "https://seatgeek.com/images/performers-landscape/billy-joel-170446/303/ipad_header.jpg",
                                        "ipad_mini_explore": "https://seatgeek.com/images/performers-landscape/billy-joel-a7738f/303/ipad_mini_explore.jpg",
                                        "mongo": "https://seatgeek.com/images/performers-landscape/billy-joel-a27a33/303/mongo.jpg",
                                        "square_mid": "https://seatgeek.com/images/performers-landscape/billy-joel-8643df/303/square_mid.jpg",
                                        "triggit_fb_ad": "https://seatgeek.com/images/performers-landscape/billy-joel-66da30/303/triggit_fb_ad.jpg"
                                    },
                                    "image": "https://seatgeek.com/images/performers-landscape/billy-joel-82da62/303/huge.jpg",
                                    "document_source": {
                                        "source_type": "ELASTIC",
                                        "generation_type": "FULL"
                                    }
                                }
                            ],
                            "popularity": 0,
                            "location": None
                        }
                    ],
                    "is_open": False,
                    "links": [],
                    "datetime_local": "2021-08-14T18:30:00",
                    "time_tbd": False,
                    "short_title": "Korn with Staind",
                    "visible_until_utc": "2021-08-15T02:30:00",
                    "stats": {
                        "listing_count": 268,
                        "average_price": 229,
                        "lowest_price_good_deals": 68,
                        "lowest_price": 64,
                        "highest_price": 766,
                        "visible_listing_count": 158,
                        "dq_bucket_counts": [
                            33,
                            75,
                            36,
                            9,
                            6,
                            36,
                            37,
                            0
                        ],
                        "median_price": 179,
                        "lowest_sg_base_price": 44,
                        "lowest_sg_base_price_good_deals": 49
                    },
                    "taxonomies": [
                        {
                            "id": 2000000,
                            "name": "concert",
                            "parent_id": None,
                            "rank": 0
                        }
                    ],
                    "url": "https://seatgeek.com/korn-with-staind-tickets/scranton-pennsylvania-the-pavilion-at-montage-mountain-2021-08-14-6-30-pm/concert/5405028",
                    "score": 0,
                    "announce_date": "2021-05-15T00:00:00",
                    "created_at": "2021-05-15T16:04:14",
                    "date_tbd": False,
                    "title": "Korn with Staind",
                    "popularity": 0,
                    "description": "",
                    "status": "normal",
                    "access_method": None,
                    "event_promotion": None,
                    "announcements": {},
                    "conditional": False,
                    "enddatetime_utc": None,
                    "themes": [],
                    "domain_information": []
                }
            ],
            "meta": {
                "total": 1,
                "took": 6,
                "page": 1,
                "per_page": 10,
                "geolocation": None
            },
            "in_hand": {}
        }


class LoginTests(TestCase):

    def setUp(self) -> None:
        user = User.objects.create(email='email@email.com')
        user.set_password('password')
        user.save()

    def test_successful_login_creates_token_and_returns_it_in_response(self):
        login_url = reverse('rest_login')
        data = {
            'email': 'email@email.com',
            'password': 'password'
        }
        response = self.client.post(login_url, data=data)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(Token.objects.filter(key=response.json()['key']).exists())

    def test_unsuccessful_login_does_not_create_token(self):
        login_url = reverse('rest_login')
        data = {
            'email': 'email@email.com',
            'password': 'wrongpassword'
        }
        response = self.client.post(login_url, data=data)

        self.assertEqual(response.status_code, 400)
        self.assertFalse(Token.objects.exists())


class LogoutTests(TestCase):

    def setUp(self) -> None:
        self.user = User.objects.create(email='email@email.com')
        self.token = Token.objects.create(user=self.user)

    def test_logout_deletes_token(self):
        logout_url = reverse('rest_logout')
        response = self.client.post(logout_url, HTTP_AUTHORIZATION=f"Token {self.token.key}")

        self.assertEqual(response.status_code, 200)
        self.assertFalse(Token.objects.exists())


class PasswordResetTests(TestCase):

    def setUp(self) -> None:
        self.user = User.objects.create(email='email@email.com')
        self.user.set_password('password')
        self.user.save()

    def test_password_reset_send_email_to_reset_password(self):
        rest_password_url = reverse('rest_password_reset')
        data = {
            'email': self.user.email
        }
        response = self.client.post(rest_password_url, data=data)

        self.assertEqual(response.status_code, 200)


class PasswordChangeTests(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create(email='email@email.com')
        self.user.set_password('password')
        self.user.save()
        self.token = Token.objects.create(user=self.user)

    def test_change_password_changes_password(self):
        rest_password_url = reverse('rest_password_change')
        data = {
            'new_password1': 'newPassword1',
            'new_password2': 'newPassword1',
        }
        response = self.client.post(rest_password_url, data=data, HTTP_AUTHORIZATION=f"Token {self.token.key}")

        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('newPassword1'))
        self.assertFalse(self.user.check_password('password'))


class RegistrationTests(TestCase):

    def test_registration_creates_account(self):
        data = {
            'email': 'email@email.com',
            'password1': 'P@ssword123',
            'password2': 'P@ssword123'
        }
        register_url = reverse('rest_register')
        response = self.client.post(register_url, data=data)

        self.assertEqual(response.status_code, 201)
        self.assertTrue(Token.objects.filter(key=response.json()['key']).exists())
        user = User.objects.get()
        self.assertEqual(user.email, 'email@email.com')
        self.assertTrue(user.check_password('P@ssword123'))

    def test_registration_fails_with_too_common_password(self):
        data = {
            'email': 'email@email.com',
            'password1': 'password',
            'password2': 'password'
        }
        register_url = reverse('rest_register')
        response = self.client.post(register_url, data=data)

        self.assertEqual(response.status_code, 400)

    def test_registration_fails_with_mismatching_password(self):
        data = {
            'email': 'email@email.com',
            'password1': 'P@ssword123',
            'password2': 'P@ssword456'
        }
        register_url = reverse('rest_register')
        response = self.client.post(register_url, data=data)

        self.assertEqual(response.status_code, 400)


class AddPerformerTests(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create(email='email@email.com')
        self.user.set_password('password')
        self.user.save()
        self.token = Token.objects.create(user=self.user)

    @patch('requests.get', return_value=MockedSeatGeekResponse())
    def test_add_performer_adds_performer(self, _mock):
        add_performer_url = reverse('add_performer')
        data = {
            'id': 1069,
            'name': 'Korn',
        }
        response = self.client.post(add_performer_url, data=data, HTTP_AUTHORIZATION=f"Token {self.token.key}")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.user.performers.count(), 1)
        performer = self.user.performers.first()
        self.assertDictEqual(response.json()['performer'], {'id': performer.id,
                                                            'name': performer.name,
                                                            'hex_color': performer.hex_color})
        self.assertDictEqual(response.json()['events'][0], {'end': '2021-08-14T23:59:59',
                                                            'geo_location': {'lat': 41.3506, 'lon': -75.6622},
                                                            'hex_color': performer.hex_color,
                                                            'id': 5405028,
                                                            'start': '2021-08-14T22:30:00',
                                                            'title': 'Korn',
                                                            'tooltip': 'The Pavilion at Montage Mountain, Scranton, US',
                                                            'url': 'https://seatgeek.com/korn-with-staind-tickets/scranton-pennsylvania-the-pavilion-at-montage-mountain-2021-08-14-6-30-pm/concert/5405028?seatgeekcalendardotcom=true'})


class RemovePerformerTests(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create(email='email@email.com')
        self.other_user = User.objects.create(email='other_email@email.com')
        self.performer = Performer.objects.create(id=1069, name='Korn')
        self.user.performers.add(self.performer)
        self.other_user.performers.add(self.performer)
        self.token = Token.objects.create(user=self.user)

    def test_remove_performer_removes_performer(self):
        remove_performer_url = reverse('remove_performer')
        data = {
            'name': 'Korn'
        }
        response = self.client.post(remove_performer_url, data=data, HTTP_AUTHORIZATION=f"Token {self.token.key}")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.user.performers.count(), 0)
        self.assertEqual(self.other_user.performers.count(), 1)


class GetInfoTests(TestCase):

    def setUp(self) -> None:
        self.user = User.objects.create(email='email@email.com')
        self.performer = Performer.objects.create(id=1069, name='Korn', hex_color='#B98702')
        self.performer_2 = Performer.objects.create(id=1070, name='Slipknot', hex_color='#B98703')
        self.user.performers.add(self.performer)
        self.user.performers.add(self.performer_2)
        self.token = Token.objects.create(user=self.user)

    @patch('requests.get', return_value=MockedSeatGeekResponse())
    def test_get_info_returns_correct_performers_and_events(self, _mock):
        get_events_url = reverse('get_info')
        response = self.client.get(get_events_url, HTTP_AUTHORIZATION=f"Token {self.token.key}")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['performers'], [{'id': 1069, 'name': 'Korn', 'hex_color': '#B98702'},
                                                         {'id': 1070, 'name': 'Slipknot', 'hex_color': '#B98703'}])
        self.assertDictEqual(response.json()['events'][0], {'end': '2021-08-14T23:59:59',
                                                            'geo_location': {'lat': 41.3506, 'lon': -75.6622},
                                                            'hex_color': '#B98702',
                                                            'id': 5405028,
                                                            'start': '2021-08-14T22:30:00',
                                                            'title': 'Korn',
                                                            'tooltip': 'The Pavilion at Montage Mountain, Scranton, US',
                                                            'url': 'https://seatgeek.com/korn-with-staind-tickets/scranton-pennsylvania-the-pavilion-at-montage-mountain-2021-08-14-6-30-pm/concert/5405028?seatgeekcalendardotcom=true'})
