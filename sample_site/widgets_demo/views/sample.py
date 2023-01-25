from django.views.generic import TemplateView


class SampleWidgetView(TemplateView):
    template_name = "widgets_demo/sample_view.html"
