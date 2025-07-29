from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.employee.role == 'Admin'

class IsHR(BasePermission):
    def has_permission(self, request, view):
        return request.user.employee.role == 'HR'

class IsEmployee(BasePermission):
    def has_permission(self, request, view):
        return request.user.employee.role == 'Employee'
