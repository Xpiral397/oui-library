from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class CustomAdminManager(BaseUserManager):
    def create_admin(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        admin = self.model(email=email, **extra_fields)
        admin.set_password(password)
        admin.save(using=self._db)
        return admin


class AdminAccount(AbstractBaseUser):
    full_name = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    gender = models.CharField(max_length=100)
    number = models.CharField(max_length=20)
    is_staff = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    date = models.DateField(auto_now_add=True)
    is_supper_admin = models.BooleanField(default=True)
    otp = models.IntegerField(default=0)
    objects = CustomAdminManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "gender", "number"]

    def __str__(self):
        return self.full_name

    def has_perm(self, perm, obj=None):
        return self.is_staff

    def has_module_perms(self, app_label):
        return self.is_staff


class Book(models.Model):
    rate = models.IntegerField(default=0)
    number_of_people_rated = models.IntegerField(default=0)
    subtitle = models.CharField(default="No subtitle", max_length=200)
    publisher = models.CharField(default="Unknow", max_length=200)
    summary = models.CharField(default="No summary", max_length=1024)
    publication_date = models.CharField(default="Unkown", max_length=6)
    subtitle = models.CharField(default="Defualt to English", max_length=200)
    subtitle = models.CharField(default="This book has no subtitle", max_length=200)
    likes = models.IntegerField(default=0)
    unlike = models.IntegerField(default=0)
    loved = models.IntegerField(default=0)
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    total_pages = models.IntegerField()
    ISBN = models.CharField(max_length=100)
    edition = models.CharField(default="Not specify", max_length=200)
    series = models.CharField(default="Not specify", max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(default=1)
    date_added = models.DateTimeField(auto_created=True, auto_now_add=True)
    reserve = models.IntegerField(default=0)
    lent = models.IntegerField(default=0)
    image = models.ImageField(upload_to="books/")
    group = models.CharField(max_length=100)
    user = models.ForeignKey(
        AdminAccount,
        on_delete=models.CASCADE,
        related_name="books",
        null=True,
        blank=True,
    )
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Balance(models.Model):
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_lent_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_locked = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_reserved_amount = models.DecimalField(
        max_digits=10, decimal_places=2, default=0
    )
    number_of_facucet = models.IntegerField(default=0)

    def __str__(self):
        return f"Balance for {self.total_amount}"

    def facucetAccount(self):
        self.total_amount += 100
        self.number_of_facucet += 1

    def __str__(self):
        return f"Lend book"


class CustomUserManager(BaseUserManager):
    def create_user(
        self,
        matric_number,
        full_name,
        department,
        expected_year_of_graduation,
        password=None,
        **extra_fields,
    ):
        if not matric_number:
            raise ValueError("The Matric Number field must be set")
        user = self.model(
            matric_number=matric_number,
            full_name=full_name,
            department=department,
            expected_year_of_graduation=expected_year_of_graduation,
            **extra_fields,
        )
        user.set_password(password)
        balance = Balance.objects.create(
            total_amount=0, total_lent_amount=0, total_locked=0, total_reserved_amount=0
        )
        user.balance = balance
        user.save(using=self._db)
        return user

    def create_superuser(
        self,
        matric_number,
        full_name,
        department,
        expected_year_of_graduation,
        password=None,
        **extra_fields,
    ):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(
            full_name=full_name,
            password=password,
            matric_number="N/A",
            department="Administrator",
            expected_year_of_graduation="N/A",
            **extra_fields,
        )


class UserPreferance(models.Model):
    category_selection = models.CharField(max_length=100, default="Science")

    def add_new_selection(self, new_selection):
        self.category_selection = f"{self.category_selection},{new_selection}"

    def remove_selection(self, selection):
        self.category_selection = self.category_selection.replace("," + selection, "")


class Notification(models.Model):
    class Type(models.TextChoices):
        LEND = "LEND", "LEND"
        RESERVED = "RESERVED", "RESERVED"
        RECHARGE = "RECHARGE", "RECHARGE"
        CHECKIN = "CHECKIN", "CHECKIN"
        CHECKOUT = "CHECKOUT", "CHECKOUT"
        DEBIT = "DEBIT", "DEBIT"
        DUE = "DUE", "DUE"

    date = models.DateTimeField(auto_now=True)
    message = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=Type.choices)
    user = models.ForeignKey(
        "UserAccount", on_delete=models.CASCADE, related_name="notifications"
    )

    @classmethod
    def create(cls, user, type, message):
        notification = cls(user=user, type=type, message=message)
        notification.save()
        return notification


class UserAccount(AbstractBaseUser):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    department = models.CharField(max_length=100)
    faculty = models.CharField(max_length=100)
    gender = models.CharField(max_length=100)
    number = models.CharField(max_length=20)
    expected_year_of_graduation = models.IntegerField()
    password = models.CharField(max_length=100)
    matric_number = models.CharField(max_length=50, unique=True)
    full_name = models.CharField(max_length=100)
    otp = models.IntegerField(default=0)
    has_confirm_otp = models.BooleanField(default=False)
    otp_expiration_time = models.IntegerField(default=0)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    locked_amount = models.IntegerField(default=0)
    balance = models.OneToOneField(Balance, on_delete=models.CASCADE)
    # preferance = models.OneToOneField(UserPreferance, on_delete=models.CASCADE)
    reservedBook = models.IntegerField(default=0)
    lentReserved = models.IntegerField(default=0)
    objects = CustomUserManager()
    USERNAME_FIELD = "matric_number"
    REQUIRED_FIELDS = ["full_name", "department", "expected_year_of_graduation"]

    def __str__(self):
        return self.matric_number

    def lent_book(self, book, start_date, end_date, range_in_days: int):
        price_range = range_in_days * 50
        if self.balance.total_amount > price_range:
            reserve_instance = Reserved.objects.create(
                book=book,
                borrow_date=timezone.now(),
                start_date=start_date,
                end_date=end_date,
            )
            self.reserved.add(reserve_instance)
            self.save()
        else:
            return False
        return True

    def reserve_book(self, book, start_date, end_date, range_in_days: int):
        price_range = range_in_days * 50
        if self.balance.total_amount > price_range:
            reserve_instance = Reserved.objects.create(
                book=book,
                borrow_date=timezone.now(),
                start_date=start_date,
                end_date=end_date,
            )
            self.reserved.add(reserve_instance)
            self.save()
        else:
            return False
        return True

    def get_reserved_book(self):
        return self.reserved

    def get_len_book(self):
        return self.lent

    def notify(self, type, message):
        Notification.create(user=self, type=type, message=message)


class Reserved(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    reserve_date = models.DateField(default=timezone.now)
    start_date = models.DateField(null=True, blank=True)
    due_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"Reserved book"


class Lend(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrow_date = models.DateField(default=timezone.now)
    start_date = models.DateField(null=True, blank=True)
    due_date = models.DateField(null=True, blank=True)
