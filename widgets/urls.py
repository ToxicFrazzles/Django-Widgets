from django.urls import path
from .views import FileSelectorView


urlpatterns = [
    path("file_selector/", FileSelectorView.as_view()),
]
