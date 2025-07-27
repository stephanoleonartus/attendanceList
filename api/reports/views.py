from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from attendance.models import Attendance
from users.models import Employee, Department
from django.contrib.auth.models import User
from reportlab.pdfgen import canvas
from openpyxl import Workbook
from datetime import date

class IndividualAttendanceReport(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, user_id, start_date, end_date, format):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return HttpResponse("User not found", status=404)

        attendances = Attendance.objects.filter(user=user, date__range=[start_date, end_date])

        total_days = attendances.count()
        present_days = attendances.filter(status='Present').count()
        absent_days = attendances.filter(status='Absent').count()
        late_arrivals = 0
        early_departures = 0

        for attendance in attendances:
            if attendance.check_in and attendance.shift and attendance.check_in > attendance.shift.start_time:
                late_arrivals += 1
            if attendance.check_out and attendance.shift and attendance.check_out < attendance.shift.end_time:
                early_departures += 1

        if format == 'pdf':
            response = HttpResponse(content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{user.username}_attendance.pdf"'

            p = canvas.Canvas(response)
            p.drawString(100, 800, f"Attendance Report for {user.username}")
            p.drawString(100, 780, f"From {start_date} to {end_date}")

            p.drawString(100, 760, f"Total Days: {total_days}")
            p.drawString(100, 740, f"Present Days: {present_days}")
            p.drawString(100, 720, f"Absent Days: {absent_days}")
            p.drawString(100, 700, f"Late Arrivals: {late_arrivals}")
            p.drawString(100, 680, f"Early Departures: {early_departures}")

            y = 640
            for attendance in attendances:
                p.drawString(100, y, f"{attendance.date}: {attendance.status}")
                y -= 20

            p.showPage()
            p.save()

            return response

        elif format == 'excel':
            response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = f'attachment; filename="{user.username}_attendance.xlsx"'

            wb = Workbook()
            ws = wb.active
            ws.title = "Attendance"

            ws.append(["Summary"])
            ws.append(["Total Days", total_days])
            ws.append(["Present Days", present_days])
            ws.append(["Absent Days", absent_days])
            ws.append(["Late Arrivals", late_arrivals])
            ws.append(["Early Departures", early_departures])
            ws.append([])
            ws.append(["Date", "Status", "Check In", "Check Out"])

            for attendance in attendances:
                ws.append([attendance.date, attendance.status, attendance.check_in, attendance.check_out])

            wb.save(response)

            return response

        else:
            return HttpResponse("Invalid format", status=400)


class DepartmentAttendanceReport(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, department_id, start_date, end_date, format):
        try:
            department = Department.objects.get(id=department_id)
        except Department.DoesNotExist:
            return HttpResponse("Department not found", status=404)

        employees = Employee.objects.filter(department=department)
        users = [employee.user for employee in employees]
        attendances = Attendance.objects.filter(user__in=users, date__range=[start_date, end_date])

        total_days = attendances.count()
        present_days = attendances.filter(status='Present').count()
        absent_days = attendances.filter(status='Absent').count()
        late_arrivals = 0
        early_departures = 0

        for attendance in attendances:
            if attendance.check_in and attendance.shift and attendance.check_in > attendance.shift.start_time:
                late_arrivals += 1
            if attendance.check_out and attendance.shift and attendance.check_out < attendance.shift.end_time:
                early_departures += 1

        if format == 'pdf':
            response = HttpResponse(content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{department.name}_attendance.pdf"'

            p = canvas.Canvas(response)
            p.drawString(100, 800, f"Attendance Report for {department.name} Department")
            p.drawString(100, 780, f"From {start_date} to {end_date}")

            p.drawString(100, 760, f"Total Days: {total_days}")
            p.drawString(100, 740, f"Present Days: {present_days}")
            p.drawString(100, 720, f"Absent Days: {absent_days}")
            p.drawString(100, 700, f"Late Arrivals: {late_arrivals}")
            p.drawString(100, 680, f"Early Departures: {early_departures}")

            y = 640
            for attendance in attendances:
                p.drawString(100, y, f"{attendance.user.username} - {attendance.date}: {attendance.status}")
                y -= 20

            p.showPage()
            p.save()

            return response

        elif format == 'excel':
            response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = f'attachment; filename="{department.name}_attendance.xlsx"'

            wb = Workbook()
            ws = wb.active
            ws.title = "Attendance"

            ws.append(["Summary"])
            ws.append(["Total Days", total_days])
            ws.append(["Present Days", present_days])
            ws.append(["Absent Days", absent_days])
            ws.append(["Late Arrivals", late_arrivals])
            ws.append(["Early Departures", early_departures])
            ws.append([])
            ws.append(["Employee", "Date", "Status", "Check In", "Check Out"])

            for attendance in attendances:
                ws.append([attendance.user.username, attendance.date, attendance.status, attendance.check_in, attendance.check_out])

            wb.save(response)

            return response

        else:
            return HttpResponse("Invalid format", status=400)
