from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        try:
            return hasattr(request.user, 'employee') and request.user.employee.role == 'Admin'
        except AttributeError:
            return False

class IsHR(BasePermission):
    def has_permission(self, request, view):
        try:
            return hasattr(request.user, 'employee') and request.user.employee.role == 'HR'
        except AttributeError:
            return False

class IsEmployee(BasePermission):
    def has_permission(self, request, view):
        try:
            return hasattr(request.user, 'employee') and request.user.employee.role == 'Employee'
        except AttributeError:
            return False

class IsAdminOrHR(BasePermission):
    def has_permission(self, request, view):
        try:
            return hasattr(request.user, 'employee') and request.user.employee.role in ['Admin', 'HR']
        except AttributeError:
            return False