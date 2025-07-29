from django.db import models
from django.contrib.auth.models import User
from workhours.models import Shift

class Attendance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    check_in = models.TimeField(null=True, blank=True)
    check_out = models.TimeField(null=True, blank=True)
    status = models.CharField(max_length=20, default='Absent')
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    check_in_photo = models.ImageField(upload_to='attendance_photos/', null=True, blank=True)
    check_out_photo = models.ImageField(upload_to='attendance_photos/', null=True, blank=True)
    shift = models.ForeignKey(Shift, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'{self.user.username} - {self.date}'
