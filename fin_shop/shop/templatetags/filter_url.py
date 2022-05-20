from django import template

register = template.Library()


@register.simple_tag
def filter_url(value, field_name, urlencode=None):
    ''' Решает проблемму с добавлением фильтров на фильтры для ссылок '''
    url = f'?{field_name}={value}'

    if urlencode:
        querystring = urlencode.split('&')
        filtered_querystring = filter(lambda p: p.split('=')[0] != field_name, querystring)
        encode_querystring = '&'.join(filtered_querystring)
        url = f'{url}&{encode_querystring}'
    return url


@register.simple_tag
def filter_value(field_name, urlencode=None):
    ''' Возвращает значение в поле фильтра '''

    if urlencode:
        querystring = urlencode.split('&')
        for filter_ in querystring:
            if field_name in filter_:
                value = filter_.split('=')[1]
                return str(value)
        return ''
