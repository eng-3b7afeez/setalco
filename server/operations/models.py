from django.db import models
from django.contrib.auth.models import User
from customers.models import Customer


class Operation(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    customer = models.ForeignKey(Customer, null=True, on_delete=models.SET_NULL)

    material = models.CharField(
        choices=(
            ("ST", "steel"),
            ("GLV", "galvenized"),
            ("SUS", "stainless"),
            ("AL", "aluminum"),
            ("BR", "brass"),
        ),
        max_length=50,
    )
    material_from_storage = models.BooleanField(default=True)
    height = models.DecimalField(max_digits=10, decimal_places=2)
    width = models.DecimalField(max_digits=10, decimal_places=2)
    thickness = models.DecimalField(max_digits=10, decimal_places=2)
    work_duration = models.DecimalField(max_digits=10, decimal_places=2)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    laser_cut = models.BooleanField(default=True)
    completed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated", "created"]

    def __str__(self):
        return f"{self.user} - {self.customer}"
