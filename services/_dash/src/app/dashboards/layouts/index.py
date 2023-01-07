"""Plotly Dash HTML index layout override."""

html_layout = """
<!DOCTYPE html>
    <html>
        <head>
            {%metas%}
            <title>{%title%}</title>
            {%favicon%}
            {%css%}
            <script src="https://kit.fontawesome.com/251291a83b.js" crossorigin="anonymous"></script>
        </head>

        <body class="dash-template">
            {%app_entry%}
        </body>
        
        <footer>
            {%config%}
            {%scripts%}
            {%renderer%}
        </footer>

    </html>
"""
