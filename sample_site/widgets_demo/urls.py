from django.urls import path

from . import views

urlpatterns = [
    path('file_selector/', views.FileSelectorView.as_view())
]
