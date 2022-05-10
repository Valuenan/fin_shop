from django.shortcuts import render
from django.views import generic, View

from .models import Products, Groups


def get_breadcrumbs(model, model_id):
    groups = [model.objects.get(id=model_id).group]

    parent = model.objects.get(id=model_id).group.parent
    while parent is not None:
        groups.insert(0, parent)
        parent = parent.parent
    return groups


def groups_dict(main_groups):
    collector = {}

    for groups in main_groups:
        collector[groups] = []
        for group in groups.groups_set.all():
            collector[groups].append(group)
    return collector


class ProductsList(generic.ListView):
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
    model = Products
    template_name = 'shop/product_details.html'
    context_object_name = 'product'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['breadcrumbs'] = get_breadcrumbs(self.model, self.kwargs['pk'])

        main_groups = Groups.objects.filter(parent=None)
        context['groups_catalog'] = groups_dict(main_groups)

        return context


class Catalog(View):

    def get(self, request):
        main_groups = Groups.objects.filter(parent=None)
        groups_catalog = groups_dict(main_groups)

        return render(request, 'shop/catalog.html', context={'groups_catalog': groups_catalog})
