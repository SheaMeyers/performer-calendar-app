import random


def get_hex_color():
    return f'#{random.randint(1, 255):02X}{random.randint(1, 255):02X}{random.randint(1, 255):02X}'
