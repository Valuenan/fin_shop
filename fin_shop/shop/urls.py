from django.urls import path

from . import views

urlpatterns = [
    path('', views.ProductsList.as_view(), name='main'),
    path('product/<int:pk>/', views.ProductDetails.as_view(), name='product_detail'),
    path('catalog/', views.Catalog.as_view(), name='catalog')
]

