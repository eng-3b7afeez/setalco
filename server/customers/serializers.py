from rest_framework.serializers import ModelSerializer
from .models import Customer


class CustomerSerializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"


class NamedCustomerSerializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = ["name"]
