from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import OperationSerializer, OperationCreateSerializer
from .models import Operation


class OperationListCreateView(ListCreateAPIView):
    queryset = Operation.objects.all()

    def get(self, request, *args, **kwargs):
        operations = self.list(request, *args, **kwargs)
        for operation in operations.data:
            operation["user"] = operation["user"]["username"]
            if operation["customer"] == None:
                operation["customer"] = "Deleted"
            else:
                operation["customer"] = operation["customer"]["name"]
        return operations

    def get_serializer_class(self):
        if self.request.method == "GET":
            return OperationSerializer
        return OperationCreateSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OperationRetriveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Operation.objects.all()
    serializer_class = OperationCreateSerializer


operation_list_create = OperationListCreateView.as_view()
operation_retrive_update_destroy = OperationRetriveUpdateDestroyView.as_view()
