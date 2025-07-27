from django.test import TestCase
from django.contrib.auth.models import User
from .models import Attendance
from datetime import date

class AttendanceTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.attendance = Attendance.objects.create(
            user=self.user,
            date=date.today(),
            status='Present'
        )

    def test_attendance_creation(self):
        self.assertEqual(Attendance.objects.count(), 1)
        self.assertEqual(self.attendance.user.username, 'testuser')
        self.assertEqual(self.attendance.status, 'Present')
