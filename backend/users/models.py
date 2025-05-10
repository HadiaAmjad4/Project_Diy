# users/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    bio = models.TextField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)

    # Adding related_name to resolve the conflict
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',  # This avoids the clash
        blank=True,
        help_text='The groups this user belongs to.',
        related_query_name='customuser'
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',  # This avoids the clash
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='customuser'
    )

