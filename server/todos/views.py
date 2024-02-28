from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Todo
from .serializers import TodoSerializer


class TodoListCreateView(ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TodoRetriveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


todo_list_create = TodoListCreateView.as_view()
todo_retrive_update_destroy = TodoRetriveUpdateDestroyView.as_view()
