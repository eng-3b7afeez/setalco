from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Customer
from .serializers import CustomerSerializer


class CustomerListCreateView(ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    # def get_queryset(self, *args, **kwargs):
    #     print(
    #         self.request.headers,
    #         self.request.user.username,
    #         self.request.user.id,
    #     )
    #     return super().get_queryset()


class CustomerRetriveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


customer_list_create = CustomerListCreateView.as_view()
customer_retrive_update_destroy = CustomerRetriveUpdateDestroyView.as_view()
