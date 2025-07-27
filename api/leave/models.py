from django.db import models
from django.contrib.auth.models import User

class Leave(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')], default='Pending')

    def __str__(self):
        return f'{self.user.username} - {self.start_date} to {self.end_date}'

class Holiday(models.Model):
    date = models.DateField()
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.date} - {self.name}'
