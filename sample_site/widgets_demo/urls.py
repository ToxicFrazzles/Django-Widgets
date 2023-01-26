from django.urls import path

from . import views

urlpatterns = [
    path('lazy_image/', views.LazyImageView.as_view()),
    path('segmentation/', views.SegementationMarkupView.as_view()),
    path('file_selector/', views.FileSelectorView.as_view()),
]
