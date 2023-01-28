from django.forms import forms
from django.templatetags.static import static

from widgets.widgets import SegementationMarkupWidget
from .sample import SampleWidgetView


class SegementationMarkupView(SampleWidgetView):
    def get_context_data(self, **kwargs):
        image = static("widgets_demo/pexels-nina-15114796.jpg")

        class SampleForm(forms.Form):
            files = forms.FileField(widget=SegementationMarkupWidget(attrs={"image": image}))

        context = super().get_context_data(**kwargs)
        context["form"] = SampleForm()
        return context
