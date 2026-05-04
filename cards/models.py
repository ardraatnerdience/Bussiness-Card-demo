from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # Basic Info
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100, blank=True)
    org = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)

    # Contact Info
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    website = models.URLField(blank=True)
    location = models.CharField(max_length=100, blank=True)

    # Images
    photo = models.ImageField(upload_to='profiles/', null=True, blank=True)
    backgroundImage = models.ImageField(upload_to='backgrounds/', null=True, blank=True)

    # Extra
    qr_code = models.ImageField(upload_to='qr_codes/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name