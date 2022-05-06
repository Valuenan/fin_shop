from django.db import models
from django.utils.translation import gettext_lazy as _


class Images(models.Model):
    title = models.CharField('Название', max_length=150)
    url = models.SlugField(max_length=150, unique=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = "images"
        verbose_name = _("Изображение")
        verbose_name_plural = _("Изображения")


class Groups(models.Model):
    flag_removal = models.BooleanField('Пометка удаления', default=False)
    name = models.CharField('Название', max_length=150)
    parent = models.ForeignKey('self', verbose_name="Родитель", on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "groups"
        verbose_name = _("Группа")
        verbose_name_plural = _("Группы")


class ViewNomenclature(models.Model):
    name = models.CharField('Название', max_length=150)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "view_nomenclature"
        verbose_name = _("Вид номенклатуры")
        verbose_name_plural = _("Виды номенклатуры")


class TypeNomenclature(models.Model):
    name = models.CharField('Название', max_length=150)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "type_nomenclature"
        verbose_name = _("Тип номенклатуры")
        verbose_name_plural = _("Типы номенклатуры")


class Attributes(models.Model):
    view_nomenclature = models.ForeignKey(ViewNomenclature, on_delete=models.CASCADE, related_name='view_nomenclature')
    type_nomenclature = models.ForeignKey(TypeNomenclature, on_delete=models.CASCADE, related_name='type_nomenclature')
    name = models.CharField('Название', max_length=150)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "attributes"
        verbose_name = _("Атрибут")
        verbose_name_plural = _("Атрибуты")


class Taxes(models.Model):
    name = models.CharField('Название', max_length=150)
    rate = models.PositiveIntegerField('Значение', default=0)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "taxes"
        verbose_name = _("Налог")
        verbose_name_plural = _("Виды налогов")


class Products(models.Model):
    flag_removal = models.BooleanField('Пометка удаления', default=False)
    vendor_code = models.CharField('Артикул', max_length=20, null=True)
    name = models.CharField('Название', max_length=150)
    description = models.TextField('Описание', null=True)
    image = models.ForeignKey(Images, on_delete=models.DO_NOTHING, related_name='image', null=True)
    base_unit = models.PositiveIntegerField('Базовая единица', default=0)
    group = models.ForeignKey(Groups, on_delete=models.CASCADE, related_name='group', null=True)
    weight = models.PositiveIntegerField('Вес', default=0)
    value_attributes = models.ForeignKey(Attributes, on_delete=models.CASCADE, related_name='attributes')
    tax = models.ForeignKey(Taxes, on_delete=models.CASCADE, related_name='product_tax')

    def __str__(self):
        return self.name

    class Meta:
        db_table = "products"
        verbose_name = _("Товар")
        verbose_name_plural = _("Товары")


class PriceTypes(models.Model):
    name = models.CharField('Название', max_length=150)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "price_types"
        verbose_name = _("Тип цены")
        verbose_name_plural = _("Типы цены")


class Prices(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='price')
    price_type = models.ForeignKey(PriceTypes, on_delete=models.CASCADE, related_name='type')
    price = models.PositiveIntegerField('Цена', default=0)
    currency = models.CharField('Валюта', max_length=10)

    def __str__(self):
        return self.product

    class Meta:
        db_table = "prices"
        verbose_name = _("Цена")
        verbose_name_plural = _("Цены")


class Organisations(models.Model):
    name = models.CharField('Название', max_length=150)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "organisations"
        verbose_name = _("Организация")
        verbose_name_plural = _("Организации")


class Stocks(models.Model):
    name = models.CharField('Название', max_length=150)
    quantity = models.PositiveIntegerField('Количество', default=0)
    organisation = models.ForeignKey(Organisations, on_delete=models.CASCADE, related_name='organisation')

    def __str__(self):
        return self.name

    class Meta:
        db_table = "stocks"
        verbose_name = _("Склад")
        verbose_name_plural = _("Склады")


class Rests(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='rests')
    quantity = models.Count(1)
    stock = models.ForeignKey(Stocks, on_delete=models.CASCADE, related_name='stock')

    def __str__(self):
        return self.product

    class Meta:
        db_table = "rests"
        verbose_name = _("Остаток")
        verbose_name_plural = _("Остатки")
