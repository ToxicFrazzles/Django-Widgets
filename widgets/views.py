from django.shortcuts import render
from django.views.generic import TemplateView
from django import forms


class SampleWidgetView(TemplateView):
    template_name = "widgets/sample_view.html"


class FileSelectorView(SampleWidgetView):
    class SampleForm(forms.Form):
        files = forms.FileField()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = self.SampleForm()
        return context
