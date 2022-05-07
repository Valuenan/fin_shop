from modeltranslation.translator import register, TranslationOptions
from .models import Images, Groups, ViewNomenclature, TypeNomenclature, Taxes, Products, PriceTypes, \
    Organisations, Stocks, BaseUnits, Currency


@register(Images)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('title',)


@register(BaseUnits)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('name',)


@register(Groups)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('name',)


@register(ViewNomenclature)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('name',)


@register(TypeNomenclature)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('name',)


@register(Taxes)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('name',)


@register(Products)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('name', 'description')


@register(Organisations)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('name',)


@register(Stocks)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('name',)


@register(PriceTypes)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('name',)


@register(Currency)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('name',)
