from django.contrib import admin
from modeltranslation.admin import TranslationAdmin

from . import models


@admin.register(models.Images)
class ImagesAdmin(TranslationAdmin):
    list_display = ("title", "url")


@admin.register(models.Groups)
class GroupsAdmin(TranslationAdmin):
    list_display = ("id", "flag_removal", "name", "parent")


@admin.register(models.ViewNomenclature)
class ViewNomenclatureAdmin(TranslationAdmin):
    list_display = ("id", "name")


@admin.register(models.TypeNomenclature)
class TypeNomenclatureAdmin(TranslationAdmin):
    list_display = ("id", "name")


@admin.register(models.Attributes)
class AttributesAdmin(TranslationAdmin):
    list_display = ("id", "name", "view_nomenclature", "type_nomenclature")


@admin.register(models.Taxes)
class TaxesAdmin(TranslationAdmin):
    list_display = ("id", "name", "rate")


@admin.register(models.Products)
class ProductsAdmin(TranslationAdmin):
    list_display = (
        "id", "name", "vendor_code", "description", "image", "base_unit", "group", "weight", "value_attributes", "tax",
        "flag_removal")


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
    list_display = ("id", "name", "quantity", "organisation")


@admin.register(models.Rests)
class RestsAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "quantity", "stock")
    readonly_fields = ("quantity",)
