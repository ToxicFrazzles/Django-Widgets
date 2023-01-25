from django.shortcuts import render
from django.views.generic import TemplateView
from django import forms
from .widgets import FileSelectorWidget


class SampleWidgetView(TemplateView):
    template_name = "widgets_demo/sample_view.html"


class FileSelectorView(SampleWidgetView):
    class SampleForm(forms.Form):
        files = forms.FileField(widget=FileSelectorWidget())

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = self.SampleForm()
        return context
