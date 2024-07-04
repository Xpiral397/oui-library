from share.models import UserAccount, Book
from django.db import models

class UserPaymentAlert(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    alert_date = models.DateField()
    amount_due = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Payment alert for {self.user.matric_number} for book {self.book.title} due on {self.alert_date}"
