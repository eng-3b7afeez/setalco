from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from .views import endpoints

urlpatterns = [
    path("", endpoints, name="endpoints"),
    path("users/", include("users.urls")),
    path("auth/", include("rest_framework.urls")),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("customers/", include("customers.urls")),
    path("operations/", include("operations.urls")),
    path("todos/", include("todos.urls")),
]
