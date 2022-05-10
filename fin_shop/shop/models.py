from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _


class BaseUnits(models.Model):
    name = models.CharField('Название', max_length=5)
    value = models.PositiveIntegerField('Базовая единица', default=0)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "base_units"
        verbose_name = _("Единица измерения")
        verbose_name_plural = _("Единицы измерения")


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


class TypeNomenclature(models.Model):
    name = models.CharField('Название', max_length=150)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "type_nomenclature"
        verbose_name = _("Тип номенклатуры")
        verbose_name_plural = _("Типы номенклатуры")


class ViewNomenclature(models.Model):
    name = models.CharField('Название', max_length=150)
    type = models.ForeignKey(TypeNomenclature, on_delete=models.CASCADE, related_name='type')

    def __str__(self):
        return self.name

    class Meta:
        db_table = "view_nomenclature"
        verbose_name = _("Вид номенклатуры")
        verbose_name_plural = _("Виды номенклатуры")


class Taxes(models.Model):
    name = models.CharField('Название', max_length=150)
    rate = models.PositiveIntegerField('Значение', default=0)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "taxes"
        verbose_name = _("Налог")
        verbose_name_plural = _("Виды налогов")


class PriceTypes(models.Model):
    name = models.CharField('Название', max_length=150)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "price_types"
        verbose_name = _("Тип цены")
        verbose_name_plural = _("Типы цены")


class Products(models.Model):
    flag_removal = models.BooleanField('Пометка удаления', default=False)
    vendor_code = models.CharField('Артикул', max_length=20, null=True)
    name = models.CharField('Название', max_length=150, unique=True)
    description = models.TextField('Описание', null=True)
    image = models.ImageField("Изображение", upload_to="products/")
    base_unit = models.ForeignKey(BaseUnits, on_delete=models.CASCADE, related_name='unit')
    group = models.ForeignKey(Groups, on_delete=models.CASCADE, related_name='group', null=True)
    weight = models.PositiveIntegerField('Вес', default=0)
    view_nomenclature = models.ForeignKey(ViewNomenclature, on_delete=models.CASCADE, related_name='attributes')
    tax = models.ForeignKey(Taxes, on_delete=models.CASCADE, related_name='product_tax')
    use_price_type = models.ForeignKey(PriceTypes, on_delete=models.DO_NOTHING, default=1)
    quantity = models.IntegerField('Остаток на складах', default=0)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("movie_detail", kwargs={"pk": self.id})

    class Meta:
        db_table = "products"
        verbose_name = _("Товар")
        verbose_name_plural = _("Товары")


class Currency(models.Model):
    name = models.CharField('Название', max_length=20)
    code = models.SmallIntegerField('Код валюты')
    simbol = models.CharField('Символ валюты', max_length=5)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "currency"
        verbose_name = _("Валюта")
        verbose_name_plural = _("Валюты")


class Prices(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    price_type = models.ForeignKey(PriceTypes, on_delete=models.CASCADE)
    price = models.PositiveIntegerField('Цена', default=0)
    currency = models.ForeignKey(Currency, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.product.name

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
    organisation = models.ForeignKey(Organisations, on_delete=models.CASCADE, related_name='organisation')

    def __str__(self):
        return self.name

    class Meta:
        db_table = "stocks"
        verbose_name = _("Склад")
        verbose_name_plural = _("Склады")


class Rests(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='rests')
    stock = models.ForeignKey(Stocks, on_delete=models.CASCADE, related_name='stock')
    quantity = models.PositiveIntegerField('Количество', default=0)

    def __str__(self):
        return self.product.name

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        instance = Products.objects.get(id=self.product.id)
        instance.quantity += self.quantity
        instance.save()

    class Meta:
        db_table = "rests"
        verbose_name = _("Остаток")
        verbose_name_plural = _("Остатки")
