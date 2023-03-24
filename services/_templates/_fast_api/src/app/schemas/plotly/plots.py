from datetime import datetime
from typing import List, Any
from pydantic import BaseModel


# https://plotly.com/javascript/reference/
class Line(BaseModel):
    x: List[int]
    y: List[int]
    type: str
    name: str | None


class Bar(BaseModel):
    x: List[Any]
    y: List[Any]
    type: str
    name: str | None


class Pie(BaseModel):
    values: List[Any]
    labels: List[Any]
    type: str
    name: str | None


class Scatter(BaseModel):
    x: List[Any]
    y: List[Any]
    type: str
    mode: str
    marker: dict | None
