from app import main  # noqa


def test_ping(test_app):
    """
    GIVEN   default settings
    WHEN    ping "/ping"
    THEN    get response and some details
    """
    response = test_app.get("/ping")
    assert response.status_code == 200
    assert response.json() == "pong"
