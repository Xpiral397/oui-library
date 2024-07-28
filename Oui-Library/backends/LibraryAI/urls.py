from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("user/", include("users.urls")),
    path("admin/", include("admins.urls")),
    path("routes/", include("share.urls")),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # urlpatterns += static("_next/static/", document_root=settings.MEDIA_ROOT)
# print(urlpatterns)
