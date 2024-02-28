from django.db import models


class Customer(models.Model):
    name = models.CharField(max_length=255, unique=True)
    mobile = models.CharField(max_length=15)
    mobile2 = models.CharField(max_length=15)
    company = models.CharField(max_length=255)
    rating = models.CharField(
        choices=(
            ("OK", "ok"),
            ("WARNING", "warning"),
            ("DANGER", "danger"),
        ),
        max_length=50,
    )
    comment = models.CharField(max_length=255, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated", "-created"]

    def __str__(self):
        return self.name
