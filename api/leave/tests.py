from django.test import TestCase
from django.contrib.auth.models import User
from .models import Leave, Holiday
from datetime import date, timedelta

class LeaveTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.leave = Leave.objects.create(
            user=self.user,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=1),
            reason='Vacation'
        )
        self.holiday = Holiday.objects.create(
            date=date.today(),
            name='Test Holiday'
        )

    def test_leave_creation(self):
        self.assertEqual(Leave.objects.count(), 1)
        self.assertEqual(self.leave.user.username, 'testuser')
        self.assertEqual(self.leave.reason, 'Vacation')

    def test_holiday_creation(self):
        self.assertEqual(Holiday.objects.count(), 1)
        self.assertEqual(self.holiday.name, 'Test Holiday')
