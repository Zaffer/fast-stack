import pytest


def test_index_app(test_app, captured_templates):
    response = test_app.test_client().get("/")

    assert len(captured_templates) == 1
    template, context = captured_templates[0]
    assert template.name == "basic/at-index.html"
    assert context["message"] == ".info('Welcome to App')"


def test_map(test_app, captured_templates):
    response = test_app.test_client().get("/dash/?email=test@app.io")
    template, context = captured_templates[0]
    assert response.status_code == 200
    assert template.name == "at-dashboard.html"
