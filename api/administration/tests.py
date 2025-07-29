from django.test import TestCase
from django.contrib.auth.models import User
from .models import AttendancePolicy, Notification

class AdministrationTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.policy = AttendancePolicy.objects.create(name='Test Policy')
        self.notification = Notification.objects.create(
            user=self.user,
            message='Test Notification'
        )

    def test_policy_creation(self):
        self.assertEqual(AttendancePolicy.objects.count(), 1)
        self.assertEqual(self.policy.name, 'Test Policy')

    def test_notification_creation(self):
        self.assertEqual(Notification.objects.count(), 1)
        self.assertEqual(self.notification.message, 'Test Notification')
