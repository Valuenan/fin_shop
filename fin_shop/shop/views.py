from django.views import generic

from .models import Products


class ProductsList(generic.ListView):
    model = Products
    template_name = 'shop/main.html'
    context_object_name = 'products'
    queryset = Products.objects.filter(flag_removal=False)
    ordering = ['id']


class ProductDetails(generic.DetailView):
    model = Products
    template_name = 'shop/product_details.html'
    context_object_name = 'product'
