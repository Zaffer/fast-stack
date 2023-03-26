import pytest
from flask import template_rendered
# from app.web.main import app
from ..main import server


# @pytest.fixture(scope="module")
# def test_client():
#     with app.test_client() as testing_client:
#         with app.app_context():
#             yield testing_client


# @pytest.fixture()
# def captured_templates_client(test_client):
#     recorded = []
#     def record(sender, template, context, **extra):
#         recorded.append((template, context))
#     template_rendered.connect(record, test_client)
#     try:
#         yield recorded
#     finally:
#         template_rendered.disconnect(record, test_client)


@pytest.fixture(scope="module")
def test_app():
    with server.app_context():
        yield server


@pytest.fixture()
def captured_templates(test_app):
    recorded = []
    def record(sender, template, context, **extra):
        recorded.append((template, context))
    template_rendered.connect(record, test_app)
    try:
        yield recorded
    finally:
        template_rendered.disconnect(record, test_app)
