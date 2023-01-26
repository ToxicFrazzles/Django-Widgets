from django.forms import Widget


class SegementationMarkupWidget(Widget):
    template_name = "widgets/widgets/SegmentationMarkupWidget.html"
    needs_multipart_form = True

    class Media:
        js = ['widgets/SegmentationMarkup.js']
        css = {"all": ('widgets/SegmentationMarkup.css',)}

    def __init__(self, attrs=None):
        super().__init__(attrs)

    def format_value(self, value):
        """File input never renders a value."""
        return

    def value_from_datadict(self, data, files, name):
        """File widgets take data from FILES, not POST"""
        return files.get(name)

    def value_omitted_from_data(self, data, files, name):
        return name not in files

    def use_required_attribute(self, initial):
        return super().use_required_attribute(initial) and not initial
