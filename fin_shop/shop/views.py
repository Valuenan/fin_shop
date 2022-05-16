from django.db.models import Q
from django.shortcuts import render, get_object_or_404
from django.views import generic, View

from .models import Products, Groups


def get_breadcrumbs(model, model_id):
    ''' Вывод групп для хлебных крошек '''
    groups = [model.objects.get(id=model_id).group]

    parent = model.objects.get(id=model_id).group.parent
    while parent is not None:
        groups.insert(0, parent)
        parent = parent.parent
    return groups


def groups_dict(main_groups):
    ''' Выовод списка гурпп и подгрупп'''
    collector = {}

    for groups in main_groups:
        collector[groups] = []
        for group in groups.groups_set.all():
            collector[groups].append(group)
    return collector


class ProductsData():
    '''Данные товаров для фильтрации'''

    def get_groups(self):
        return Groups.objects.all()

    def get_products(self):
        return Products.objects.filter(flag_removal=False)


class ProductsList(generic.ListView):
    '''Главная страница'''
    model = Products
    template_name = 'shop/main.html'
    context_object_name = 'products'
    queryset = Products.objects.filter(flag_removal=False)
    ordering = ['id']

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        main_groups = Groups.objects.filter(parent=None)
        context['groups_catalog'] = groups_dict(main_groups)
        return context


class ProductDetails(generic.DetailView):
    '''Описание товара'''
    model = Products
    template_name = 'shop/product_details.html'
    context_object_name = 'product'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['breadcrumbs'] = get_breadcrumbs(self.model, self.kwargs['pk'])

        main_groups = Groups.objects.filter(parent=None)
        context['groups_catalog'] = groups_dict(main_groups)

        return context


class Catalog(ProductsData, View):
    '''Каталог товаров'''

    def get(self, request):
        main_groups = Groups.objects.filter(parent=None)
        groups_catalog = groups_dict(main_groups)

        products = Products.objects.filter(flag_removal=False)

        for key in self.request.GET:
            if key == 'group':
                groups = self.get_groups().filter(parent__name=self.request.GET.get('group'))
                groups_list = []
                if groups.exists():
                    for group in groups:
                        groups_list.append(group.name)
                else:
                    groups_list.append(self.request.GET.get('group'))
                products = products.filter(group__name__in=groups_list)
            elif key == 'order':
                products = products.order_by(self.request.GET.get('order'))
            elif key == 'price_min' or 'price_max':
                filter_price = int(self.request.GET.get(key))
                for product in products:
                    price_set = product.prices_set.filter(price_type=product.use_price_type)
                    try:
                        price = price_set[0].price
                        if key == 'price_min' and price < filter_price:
                            products = products.exclude(id=product.id)
                        if key == 'price_max' and price > filter_price:
                            products = products.exclude(id=product.id)
                    except IndexError:
                        products = products.exclude(id=product.id)

            else:
                pass

        return render(request, 'shop/catalog.html', context={'groups_catalog': groups_catalog, 'products': products})
