from modeltranslation.translator import register, TranslationOptions
from .models import Images, Groups, ViewNomenclature, TypeNomenclature, Attributes, Taxes, Products, PriceTypes, \
    Organisations, Stocks


@register(Images)
class CategoryTranslationOptions(TranslationOptions):
    field = 'title'


@register(Groups)
class CategoryTranslationOptions(TranslationOptions):
    field = 'name'


@register(ViewNomenclature)
class CategoryTranslationOptions(TranslationOptions):
    field = 'name'


@register(TypeNomenclature)
class CategoryTranslationOptions(TranslationOptions):
    field = 'name'


@register(Attributes)
class CategoryTranslationOptions(TranslationOptions):
    field = 'name'


@register(Taxes)
class CategoryTranslationOptions(TranslationOptions):
    field = 'name'


@register(Products)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('name', 'description')


@register(PriceTypes)
class CategoryTranslationOptions(TranslationOptions):
    field = 'name'


@register(Organisations)
class CategoryTranslationOptions(TranslationOptions):
    field = 'name'


@register(Stocks)
class CategoryTranslationOptions(TranslationOptions):
    field = 'name'
