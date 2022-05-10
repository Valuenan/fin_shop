from django.contrib import admin
from modeltranslation.admin import TranslationAdmin

from . import models


@admin.register(models.BaseUnits)
class BaseUnitsAdmin(TranslationAdmin):
    list_display = ("name", "value")


@admin.register(models.Groups)
class GroupsAdmin(TranslationAdmin):
    list_display = ("id", "flag_removal", "name", "parent")


@admin.register(models.ViewNomenclature)
class ViewNomenclatureAdmin(TranslationAdmin):
    list_display = ("id", "name", "type")


@admin.register(models.TypeNomenclature)
class TypeNomenclatureAdmin(TranslationAdmin):
    list_display = ("id", "name")


@admin.register(models.Taxes)
class TaxesAdmin(TranslationAdmin):
    list_display = ("id", "name", "rate")


@admin.register(models.Products)
class ProductsAdmin(TranslationAdmin):
    list_display = (
        "id", "name", "vendor_code", "description", "image", "base_unit", "group", "weight", "view_nomenclature", "tax",
        "flag_removal")
    readonly_fields = ('quantity',)


@admin.register(models.PriceTypes)
class PriceTypesAdmin(TranslationAdmin):
    list_display = ("id", "name")


@admin.register(models.Prices)
class PricesAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "price_type", "price", "currency")


@admin.register(models.Organisations)
class OrganisationsAdmin(TranslationAdmin):
    list_display = ("id", "name")


@admin.register(models.Stocks)
class StocksAdmin(TranslationAdmin):
    list_display = ("id", "name", "organisation")


@admin.register(models.Currency)
class CurrencyAdmin(TranslationAdmin):
    list_display = ("id", "name", "code", "simbol")


@admin.register(models.Rests)
class RestsAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "stock", "quantity")
