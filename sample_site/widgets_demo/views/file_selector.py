from django.forms import forms

from widgets.widgets import FileSelectorWidget
from .sample import SampleWidgetView


class FileSelectorView(SampleWidgetView):
    class SampleForm(forms.Form):
        files = forms.FileField(widget=FileSelectorWidget())

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = self.SampleForm()
        return context
