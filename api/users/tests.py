from django.test import TestCase
from django.contrib.auth.models import User
from .models import Department, Designation, Employee

class UserTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.department = Department.objects.create(name='Test Department')
        self.designation = Designation.objects.create(name='Test Designation')
        self.employee = Employee.objects.create(
            user=self.user,
            department=self.department,
            designation=self.designation,
            role='Employee'
        )

    def test_employee_creation(self):
        self.assertEqual(Employee.objects.count(), 1)
        self.assertEqual(self.employee.user.username, 'testuser')
        self.assertEqual(self.employee.department.name, 'Test Department')
        self.assertEqual(self.employee.designation.name, 'Test Designation')
        self.assertEqual(self.employee.role, 'Employee')
