from django.http import HttpRequest
from django.views import View
from django.shortcuts import render


class LazyImageView(View):
    def get(self, request: HttpRequest):
        return render(request, 'widgets_demo/lazy_image.html')
