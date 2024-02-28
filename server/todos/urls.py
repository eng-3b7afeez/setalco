from django.urls import path
from . import views

urlpatterns = [
    path("", views.todo_list_create),
    path("<int:pk>/", views.todo_retrive_update_destroy),
]
