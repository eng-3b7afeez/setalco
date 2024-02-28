from rest_framework.serializers import ModelSerializer
from .models import Operation
from customers.serializers import NamedCustomerSerializer
from users.serializers import MyUserSerializer


class OperationSerializer(ModelSerializer):
    customer = NamedCustomerSerializer()
    user = MyUserSerializer()

    class Meta:
        model = Operation
        fields = "__all__"


class OperationCreateSerializer(ModelSerializer):
    class Meta:
        model = Operation
        fields = "__all__"
