from django import template

register = template.Library()


@register.simple_tag
def filter_url(value, field_name, urlencode=None):
    ''' Решает проблемму с добавлением фильтров на фильтры '''

    url = f'?{field_name}={value}'

    if urlencode:
        querystring = urlencode.split('&')
        filtered_querystring = filter(lambda p: p.split('=')[0] != field_name, querystring)
        encode_querystring = '&'.join(filtered_querystring)
        url = f'{url}&{encode_querystring}'
    return url