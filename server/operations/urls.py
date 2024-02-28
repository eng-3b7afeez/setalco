from django.urls import path
from . import views

urlpatterns = [
    path("", views.operation_list_create),
    path("<int:pk>/", views.operation_retrive_update_destroy),
]
